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

export enum VerificationError {
  INVALID_FORMAT = 'invalid_format',
  TX_NOT_FOUND = 'tx_not_found',
  WRONG_ADDRESS = 'wrong_address',
  WRONG_AMOUNT = 'wrong_amount',
  INSUFFICIENT_CONFIRMATIONS = 'insufficient_confirmations',
  NETWORK_ERROR = 'network_error',
  TIMEOUT_ERROR = 'timeout_error',
  API_ERROR = 'api_error'
}

export class BitcoinVerificationService {
  private static readonly BLOCKCHAIN_INFO_API = 'https://blockchain.info/rawtx/';
  private static readonly BLOCKSTREAM_API = 'https://blockstream.info/api/tx/';
  private static readonly MIN_CONFIRMATIONS = 1;
  private static readonly TOLERANCE_SATOSHIS = 1000; // 0.00001 BTC tolerance
  private static readonly API_TIMEOUT = 30000; // 30 seconds
  private static readonly MAX_RETRIES = 3;
  private static readonly RETRY_DELAY = 2000; // 2 seconds

  static async verifyTransaction(
    txHash: string,
    expectedAddress: string,
    expectedAmountBTC: number
  ): Promise<{
    isValid: boolean;
    confirmations: number;
    actualAmount: number;
    error?: VerificationError;
    errorMessage?: string;
    details: any;
  }> {
    console.log('🔍 Starting Bitcoin transaction verification:', {
      txHash,
      expectedAddress,
      expectedAmountBTC
    });

    try {
      // Clean up the transaction hash
      const cleanTxHash = txHash.trim().toLowerCase();
      
      if (!this.isValidTxHash(cleanTxHash)) {
        return {
          isValid: false,
          confirmations: 0,
          actualAmount: 0,
          error: VerificationError.INVALID_FORMAT,
          errorMessage: 'Invalid transaction ID format. Bitcoin transaction IDs must be exactly 64 hexadecimal characters.',
          details: null
        };
      }

      // Try fetching with retry logic
      const transactionData = await this.fetchTransactionWithRetry(cleanTxHash);
      
      if (!transactionData) {
        return {
          isValid: false,
          confirmations: 0,
          actualAmount: 0,
          error: VerificationError.TX_NOT_FOUND,
          errorMessage: 'Transaction not found on the blockchain. This could mean: 1) The transaction ID does not exist, 2) The transaction is too new and not yet confirmed, or 3) You entered an incorrect transaction ID. Please double-check your transaction ID and try again.',
          details: null
        };
      }

      console.log('✅ Transaction data retrieved:', transactionData);

      // Verify the transaction details
      const verification = this.verifyTransactionData(
        transactionData.data,
        expectedAddress,
        expectedAmountBTC
      );

      return {
        ...verification,
        details: {
          apiUsed: transactionData.apiUsed,
          transactionData: transactionData.data,
          timestamp: transactionData.data.time
        }
      };

    } catch (error) {
      console.error('❌ Bitcoin verification error:', error);
      
      if (error.name === 'TimeoutError') {
        return {
          isValid: false,
          confirmations: 0,
          actualAmount: 0,
          error: VerificationError.TIMEOUT_ERROR,
          errorMessage: 'Verification timed out. Please try again in a few moments.',
          details: null
        };
      }

      return {
        isValid: false,
        confirmations: 0,
        actualAmount: 0,
        error: VerificationError.NETWORK_ERROR,
        errorMessage: 'Network error occurred during verification. Please check your internet connection and try again.',
        details: { originalError: error.message }
      };
    }
  }

  private static async fetchTransactionWithRetry(txHash: string, attempt = 1): Promise<{ data: any; apiUsed: string } | null> {
    const apis = [
      { name: 'blockchain.info', fetcher: this.fetchFromBlockchainInfo.bind(this) },
      { name: 'blockstream.info', fetcher: this.fetchFromBlockstream.bind(this) }
    ];

    for (const api of apis) {
      try {
        console.log(`📡 Attempt ${attempt}: Fetching from ${api.name}...`);
        const data = await this.timeoutPromise(
          api.fetcher(txHash),
          this.API_TIMEOUT,
          `${api.name} API timeout`
        );
        return { data, apiUsed: api.name };
      } catch (error) {
        console.log(`❌ ${api.name} failed:`, error.message);
        continue;
      }
    }

    if (attempt < this.MAX_RETRIES) {
      console.log(`🔄 Retrying in ${this.RETRY_DELAY}ms... (Attempt ${attempt + 1}/${this.MAX_RETRIES})`);
      await this.delay(this.RETRY_DELAY * attempt);
      return this.fetchTransactionWithRetry(txHash, attempt + 1);
    }

    return null;
  }

  private static async timeoutPromise<T>(promise: Promise<T>, timeout: number, errorMessage: string): Promise<T> {
    return Promise.race([
      promise,
      new Promise<never>((_, reject) => {
        setTimeout(() => {
          const error = new Error(errorMessage);
          error.name = 'TimeoutError';
          reject(error);
        }, timeout);
      })
    ]);
  }

  private static delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private static async fetchFromBlockchainInfo(txHash: string): Promise<any> {
    const response = await fetch(`${this.BLOCKCHAIN_INFO_API}${txHash}?format=json`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Bitcoin Transaction Verifier)',
      }
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Transaction not found');
      }
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
      if (response.status === 404) {
        throw new Error('Transaction not found');
      }
      throw new Error(`Blockstream API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
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
  ): { 
    isValid: boolean; 
    confirmations: number; 
    actualAmount: number; 
    error?: VerificationError;
    errorMessage?: string;
  } {
    const expectedSatoshis = Math.round(expectedAmountBTC * 100000000);
    
    console.log('🔍 Verifying transaction details:', {
      expectedAddress,
      expectedSatoshis,
      expectedAmountBTC,
      outputs: transaction.out
    });

    const paymentOutput = transaction.out.find((output: any) => 
      output.addr === expectedAddress
    );

    if (!paymentOutput) {
      return {
        isValid: false,
        confirmations: 0,
        actualAmount: 0,
        error: VerificationError.WRONG_ADDRESS,
        errorMessage: `No payment found to the expected address. Please ensure you sent Bitcoin to the correct address: ${expectedAddress}`
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

    const amountDifference = Math.abs(actualSatoshis - expectedSatoshis);
    if (amountDifference > this.TOLERANCE_SATOSHIS) {
      return {
        isValid: false,
        confirmations: 0,
        actualAmount: actualAmountBTC,
        error: VerificationError.WRONG_AMOUNT,
        errorMessage: `Payment amount mismatch. Expected: ${expectedAmountBTC.toFixed(8)} BTC, but received: ${actualAmountBTC.toFixed(8)} BTC. Please send the exact amount.`
      };
    }

    const confirmations = transaction.block_height ? 1 : 0;

    if (confirmations < this.MIN_CONFIRMATIONS) {
      return {
        isValid: false,
        confirmations,
        actualAmount: actualAmountBTC,
        error: VerificationError.INSUFFICIENT_CONFIRMATIONS,
        errorMessage: `Transaction needs ${this.MIN_CONFIRMATIONS} confirmation(s) but only has ${confirmations}. Please wait for the transaction to be confirmed on the blockchain.`
      };
    }

    return {
      isValid: true,
      confirmations,
      actualAmount: actualAmountBTC
    };
  }

  private static isValidTxHash(hash: string): boolean {
    return /^[a-f0-9]{64}$/i.test(hash);
  }

  static getErrorMessage(error: VerificationError): string {
    switch (error) {
      case VerificationError.INVALID_FORMAT:
        return 'Invalid transaction ID format';
      case VerificationError.TX_NOT_FOUND:
        return 'Transaction not found on blockchain';
      case VerificationError.WRONG_ADDRESS:
        return 'Payment sent to wrong address';
      case VerificationError.WRONG_AMOUNT:
        return 'Incorrect payment amount';
      case VerificationError.INSUFFICIENT_CONFIRMATIONS:
        return 'Waiting for blockchain confirmation';
      case VerificationError.NETWORK_ERROR:
        return 'Network connection error';
      case VerificationError.TIMEOUT_ERROR:
        return 'Verification timed out';
      case VerificationError.API_ERROR:
        return 'Blockchain API error';
      default:
        return 'Unknown verification error';
    }
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
