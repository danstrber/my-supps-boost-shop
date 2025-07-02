
// Enhanced Bitcoin verification service that checks both transaction validity AND amount
export class EnhancedBitcoinVerificationService {
  private static readonly BLOCKCYPHER_API_BASE = 'https://api.blockcypher.com/v1/btc/main';
  private static readonly BLOCKSTREAM_API_BASE = 'https://blockstream.info/api';

  /**
   * Verifies a Bitcoin transaction with comprehensive checks
   * @param txId - Transaction ID to verify
   * @param expectedAddress - Expected recipient address
   * @param expectedAmountBTC - Expected amount in BTC
   * @param toleranceBTC - Tolerance for amount verification (default 0.00001 BTC)
   */
  static async verifyTransactionEnhanced(
    txId: string,
    expectedAddress: string,
    expectedAmountBTC: number,
    toleranceBTC: number = 0.00001
  ) {
    console.log('🔍 Enhanced Bitcoin verification starting...', {
      txId,
      expectedAddress,
      expectedAmountBTC,
      toleranceBTC
    });

    try {
      // First try BlockCypher API
      const blockCypherResult = await this.verifyWithBlockCypher(txId, expectedAddress, expectedAmountBTC, toleranceBTC);
      if (blockCypherResult.isValid) {
        return blockCypherResult;
      }

      // Fallback to Blockstream API
      console.log('🔄 Trying Blockstream API as fallback...');
      const blockstreamResult = await this.verifyWithBlockstream(txId, expectedAddress, expectedAmountBTC, toleranceBTC);
      return blockstreamResult;

    } catch (error: any) {
      console.error('❌ Enhanced verification failed:', error);
      return {
        isValid: false,
        error: `Verification failed: ${error.message}`,
        details: {
          transactionExists: false,
          addressMatch: false,
          amountMatch: false,
          confirmations: 0,
          actualAmount: 0,
          expectedAmount: expectedAmountBTC
        }
      };
    }
  }

  private static async verifyWithBlockCypher(
    txId: string,
    expectedAddress: string,
    expectedAmountBTC: number,
    toleranceBTC: number
  ) {
    try {
      const response = await fetch(`${this.BLOCKCYPHER_API_BASE}/txs/${txId}`);
      
      if (!response.ok) {
        throw new Error(`BlockCypher API error: ${response.status}`);
      }

      const txData = await response.json();
      
      // Check if transaction exists and has outputs
      if (!txData.outputs || txData.outputs.length === 0) {
        return {
          isValid: false,
          error: 'Transaction has no outputs',
          details: {
            transactionExists: true,
            addressMatch: false,
            amountMatch: false,
            confirmations: txData.confirmations || 0,
            actualAmount: 0,
            expectedAmount: expectedAmountBTC
          }
        };
      }

      // Find output that matches our address
      const matchingOutput = txData.outputs.find((output: any) => 
        output.addresses && output.addresses.includes(expectedAddress)
      );

      if (!matchingOutput) {
        return {
          isValid: false,
          error: `No output found for address ${expectedAddress}`,
          details: {
            transactionExists: true,
            addressMatch: false,
            amountMatch: false,
            confirmations: txData.confirmations || 0,
            actualAmount: 0,
            expectedAmount: expectedAmountBTC
          }
        };
      }

      // Convert satoshis to BTC
      const actualAmountBTC = matchingOutput.value / 100000000;
      const amountDifference = Math.abs(actualAmountBTC - expectedAmountBTC);
      const amountMatch = amountDifference <= toleranceBTC;

      return {
        isValid: amountMatch,
        error: amountMatch ? null : `Amount mismatch: expected ${expectedAmountBTC} BTC, got ${actualAmountBTC} BTC`,
        details: {
          transactionExists: true,
          addressMatch: true,
          amountMatch,
          confirmations: txData.confirmations || 0,
          actualAmount: actualAmountBTC,
          expectedAmount: expectedAmountBTC,
          amountDifference,
          tolerance: toleranceBTC,
          apiUsed: 'BlockCypher'
        }
      };

    } catch (error: any) {
      console.error('❌ BlockCypher verification failed:', error);
      throw error;
    }
  }

  private static async verifyWithBlockstream(
    txId: string,
    expectedAddress: string,
    expectedAmountBTC: number,
    toleranceBTC: number
  ) {
    try {
      const response = await fetch(`${this.BLOCKSTREAM_API_BASE}/tx/${txId}`);
      
      if (!response.ok) {
        throw new Error(`Blockstream API error: ${response.status}`);
      }

      const txData = await response.json();
      
      // Check if transaction has outputs
      if (!txData.vout || txData.vout.length === 0) {
        return {
          isValid: false,
          error: 'Transaction has no outputs',
          details: {
            transactionExists: true,
            addressMatch: false,
            amountMatch: false,
            confirmations: txData.status?.confirmed ? 1 : 0,
            actualAmount: 0,
            expectedAmount: expectedAmountBTC
          }
        };
      }

      // Find output that matches our address
      const matchingOutput = txData.vout.find((output: any) => 
        output.scriptpubkey_address === expectedAddress
      );

      if (!matchingOutput) {
        return {
          isValid: false,
          error: `No output found for address ${expectedAddress}`,
          details: {
            transactionExists: true,
            addressMatch: false,
            amountMatch: false,
            confirmations: txData.status?.confirmed ? 1 : 0,
            actualAmount: 0,
            expectedAmount: expectedAmountBTC
          }
        };
      }

      // Convert satoshis to BTC
      const actualAmountBTC = matchingOutput.value / 100000000;
      const amountDifference = Math.abs(actualAmountBTC - expectedAmountBTC);
      const amountMatch = amountDifference <= toleranceBTC;

      return {
        isValid: amountMatch,
        error: amountMatch ? null : `Amount mismatch: expected ${expectedAmountBTC} BTC, got ${actualAmountBTC} BTC`,
        details: {
          transactionExists: true,
          addressMatch: true,
          amountMatch,
          confirmations: txData.status?.confirmed ? 1 : 0,
          actualAmount: actualAmountBTC,
          expectedAmount: expectedAmountBTC,
          amountDifference,
          tolerance: toleranceBTC,
          apiUsed: 'Blockstream'
        }
      };

    } catch (error: any) {
      console.error('❌ Blockstream verification failed:', error);
      throw error;
    }
  }
}
