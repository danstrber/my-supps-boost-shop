
interface BitcoinTransaction {
  hash: string;
  confirmed: boolean;
  confirmations: number;
  value: number;
  fee: number;
  inputs: Array<{
    prev_out: {
      addr: string;
      value: number;
    };
  }>;
  out: Array<{
    addr: string;
    value: number;
  }>;
  time: number;
}

interface BlockchainInfoResponse {
  hash: string;
  ver: number;
  vin_sz: number;
  vout_sz: number;
  size: number;
  weight: number;
  fee: number;
  relayed_by: string;
  lock_time: number;
  tx_index: number;
  double_spend: boolean;
  time: number;
  block_index: number;
  block_height: number;
  inputs: Array<{
    sequence: number;
    witness: string;
    script: string;
    index: number;
    prev_out: {
      addr: string;
      value: number;
      n: number;
      script: string;
    };
  }>;
  out: Array<{
    type: number;
    spent: boolean;
    value: number;
    spending_outpoints: Array<any>;
    n: number;
    tx_index: number;
    script: string;
    addr: string;
  }>;
}

export class BitcoinVerificationService {
  private static readonly BLOCKCHAIN_INFO_API = 'https://blockchain.info/rawtx/';
  private static readonly BLOCKSTREAM_API = 'https://blockstream.info/api/tx/';
  private static readonly MIN_CONFIRMATIONS = 1;
  private static readonly TOLERANCE_SATOSHIS = 1000; // 0.00001 BTC tolerance

  static async verifyTransaction(
    txHash: string,
    expectedAddress: string,
    expectedAmountBTC: number
  ): Promise<{
    isValid: boolean;
    confirmations: number;
    actualAmount: number;
    error?: string;
    details: any;
  }> {
    console.log('🔍 Verifying Bitcoin transaction:', {
      txHash,
      expectedAddress,
      expectedAmountBTC
    });

    try {
      // Clean up the transaction hash (remove any spaces/newlines)
      const cleanTxHash = txHash.trim().toLowerCase();
      
      if (!this.isValidTxHash(cleanTxHash)) {
        return {
          isValid: false,
          confirmations: 0,
          actualAmount: 0,
          error: 'Invalid transaction hash format',
          details: null
        };
      }

      // Try multiple APIs for redundancy
      let transactionData = null;
      let apiUsed = '';

      try {
        console.log('📡 Fetching from Blockchain.info API...');
        transactionData = await this.fetchFromBlockchainInfo(cleanTxHash);
        apiUsed = 'blockchain.info';
      } catch (error) {
        console.log('❌ Blockchain.info failed, trying Blockstream...');
        try {
          transactionData = await this.fetchFromBlockstream(cleanTxHash);
          apiUsed = 'blockstream.info';
        } catch (error2) {
          console.error('❌ Both APIs failed:', error, error2);
          return {
            isValid: false,
            confirmations: 0,
            actualAmount: 0,
            error: 'Unable to fetch transaction data from any API',
            details: { originalError: error.message }
          };
        }
      }

      console.log('✅ Transaction data received from', apiUsed, ':', transactionData);

      // Verify the transaction
      const verification = this.verifyTransactionData(
        transactionData,
        expectedAddress,
        expectedAmountBTC
      );

      return {
        ...verification,
        details: {
          apiUsed,
          transactionData,
          timestamp: transactionData.time
        }
      };

    } catch (error) {
      console.error('❌ Bitcoin verification error:', error);
      return {
        isValid: false,
        confirmations: 0,
        actualAmount: 0,
        error: error.message,
        details: null
      };
    }
  }

  private static async fetchFromBlockchainInfo(txHash: string): Promise<any> {
    const response = await fetch(`${this.BLOCKCHAIN_INFO_API}${txHash}?format=json`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Bitcoin Transaction Verifier)',
      }
    });

    if (!response.ok) {
      throw new Error(`Blockchain.info API error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  }

  private static async fetchFromBlockstream(txHash: string): Promise<any> {
    const response = await fetch(`${this.BLOCKSTREAM_API}${txHash}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Bitcoin Transaction Verifier)',
      }
    });

    if (!response.ok) {
      throw new Error(`Blockstream API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    // Transform Blockstream format to match our expected format
    return {
      hash: data.txid,
      time: data.status?.block_time || Math.floor(Date.now() / 1000),
      block_height: data.status?.block_height || 0,
      out: data.vout?.map((vout: any) => ({
        addr: vout.scriptpubkey_address,
        value: vout.value
      })) || [],
      inputs: data.vin?.map((vin: any) => ({
        prev_out: {
          addr: vin.prevout?.scriptpubkey_address,
          value: vin.prevout?.value || 0
        }
      })) || []
    };
  }

  private static verifyTransactionData(
    transaction: any,
    expectedAddress: string,
    expectedAmountBTC: number
  ): { isValid: boolean; confirmations: number; actualAmount: number; error?: string } {
    const expectedSatoshis = Math.round(expectedAmountBTC * 100000000);
    
    console.log('🔍 Verifying transaction details:', {
      expectedAddress,
      expectedSatoshis,
      expectedAmountBTC,
      outputs: transaction.out
    });

    // Find payment to our address
    const paymentOutput = transaction.out.find((output: any) => 
      output.addr === expectedAddress
    );

    if (!paymentOutput) {
      return {
        isValid: false,
        confirmations: 0,
        actualAmount: 0,
        error: `No payment found to address ${expectedAddress}`
      };
    }

    const actualSatoshis = paymentOutput.value;
    const actualAmountBTC = actualSatoshis / 100000000;
    
    console.log('💰 Payment verification:', {
      actualSatoshis,
      expectedSatoshis,
      difference: Math.abs(actualSatoshis - expectedSatoshis),
      tolerance: this.TOLERANCE_SATOSHIS
    });

    // Check if the amount is within tolerance
    const amountDifference = Math.abs(actualSatoshis - expectedSatoshis);
    if (amountDifference > this.TOLERANCE_SATOSHIS) {
      return {
        isValid: false,
        confirmations: 0,
        actualAmount: actualAmountBTC,
        error: `Payment amount mismatch. Expected: ${expectedAmountBTC} BTC, Received: ${actualAmountBTC} BTC`
      };
    }

    // Calculate confirmations (simplified - in production you'd need current block height)
    const confirmations = transaction.block_height ? 1 : 0;

    return {
      isValid: true,
      confirmations,
      actualAmount: actualAmountBTC
    };
  }

  private static isValidTxHash(hash: string): boolean {
    // Bitcoin transaction hashes are 64 character hex strings
    return /^[a-f0-9]{64}$/i.test(hash);
  }

  static formatBitcoinAmount(satoshis: number): string {
    return (satoshis / 100000000).toFixed(8);
  }

  static satoshisToBTC(satoshis: number): number {
    return satoshis / 100000000;
  }

  static BTCToSatoshis(btc: number): number {
    return Math.round(btc * 100000000);
  }
}
