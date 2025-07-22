/**
 * Enhanced Blockchain Connector Utility v2.0
 * Author: robinsamuelkutty
 * Last Updated: 2025-07-22
 * 
 * Extended functionality for blockchain interactions including:
 * - Multiple network support
 * - Enhanced error handling
 * - Transaction monitoring
 * - Gas estimation
 * - Smart contract interactions
 * - Event listeners
 * - Batch transaction processing
 */

const Web3 = require('web3');
const EventEmitter = require('events');

// Network configurations
const NETWORKS = {
    MAINNET: 'https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID',
    TESTNET: 'https://goerli.infura.io/v3/YOUR_INFURA_PROJECT_ID',
    LOCAL: 'http://localhost:8545'
};

class BlockchainConnector extends EventEmitter {
    constructor(network = NETWORKS.MAINNET) {
        super();
        this.web3 = null;
        this.network = network;
        this.isConnected = false;
        this.pendingTransactions = new Map();
        this.transactionTimeout = 300000; // 5 minutes
        this.maxRetries = 3;
        this.gasMultiplier = 1.1; // 10% buffer for gas estimation
    }

    /**
     * Initialize the blockchain connection
     * @returns {Promise<boolean>}
     */
    async initialize() {
        try {
            this.web3 = new Web3(new Web3.providers.HttpProvider(this.network));
            this.isConnected = await this.web3.eth.net.isListening();
            
            if (this.isConnected) {
                this.networkId = await this.web3.eth.net.getId();
                this.networkType = await this.web3.eth.net.getNetworkType();
                
                console.log(`Connected to ${this.networkType} network (ID: ${this.networkId})`);
                this.setupEventListeners();
                return true;
            }
            return false;
        } catch (error) {
            console.error('Initialization failed:', error);
            throw new Error('Blockchain connection failed');
        }
    }

    /**
     * Set up blockchain event listeners
     */
    setupEventListeners() {
        const subscription = this.web3.eth.subscribe('newBlockHeaders');
        
        subscription.on('data', blockHeader => {
            this.emit('newBlock', blockHeader);
            this.processPendingTransactions(blockHeader.number);
        });

        subscription.on('error', error => {
            console.error('Subscription error:', error);
            this.emit('error', error);
        });
    }

    /**
     * Process pending transactions on new blocks
     * @param {number} blockNumber 
     */
    async processPendingTransactions(blockNumber) {
        for (const [txHash, txData] of this.pendingTransactions.entries()) {
            const receipt = await this.web3.eth.getTransactionReceipt(txHash);
            if (receipt) {
                this.emit('transactionConfirmed', { txHash, receipt });
                this.pendingTransactions.delete(txHash);
            } else if (Date.now() - txData.timestamp > this.transactionTimeout) {
                this.emit('transactionTimeout', txHash);
                this.pendingTransactions.delete(txHash);
            }
        }
    }

    /**
     * Enhanced transaction sender with retry mechanism
     * @param {Object} txParams - Transaction parameters
     * @param {string} privateKey - Sender's private key
     * @returns {Promise<string>} Transaction hash
     */
    async sendTransaction(txParams, privateKey) {
        let attempt = 0;
        while (attempt < this.maxRetries) {
            try {
                const nonce = await this.web3.eth.getTransactionCount(txParams.from, 'latest');
                const gasPrice = await this.web3.eth.getGasPrice();
                const gasEstimate = await this.estimateGas(txParams);

                const tx = {
                    ...txParams,
                    nonce: nonce,
                    gasPrice: gasPrice,
                    gas: Math.floor(gasEstimate * this.gasMultiplier),
                };

                const signedTx = await this.web3.eth.accounts.signTransaction(tx, privateKey);
                const receipt = await this.web3.eth.sendSignedTransaction(signedTx.rawTransaction);

                this.pendingTransactions.set(receipt.transactionHash, {
                    timestamp: Date.now(),
                    params: txParams
                });

                this.emit('transactionSent', receipt.transactionHash);
                return receipt.transactionHash;
            } catch (error) {
                attempt++;
                if (attempt === this.maxRetries) {
                    throw new Error(`Transaction failed after ${this.maxRetries} attempts: ${error.message}`);
                }
                await this.delay(1000 * attempt); // Exponential backoff
            }
        }
    }

    /**
     * Estimate gas for a transaction
     * @param {Object} txParams 
     * @returns {Promise<number>}
     */
    async estimateGas(txParams) {
        try {
            return await this.web3.eth.estimateGas(txParams);
        } catch (error) {
            console.error('Gas estimation failed:', error);
            throw new Error('Gas estimation failed');
        }
    }

    /**
     * Get transaction details with enhanced information
     * @param {string} txHash 
     * @returns {Promise<Object>}
     */
    async getEnhancedTransaction(txHash) {
        try {
            const [tx, receipt, block] = await Promise.all([
                this.web3.eth.getTransaction(txHash),
                this.web3.eth.getTransactionReceipt(txHash),
                this.web3.eth.getBlock('latest')
            ]);

            if (!tx) return null;

            const confirmations = receipt ? block.number - receipt.blockNumber : 0;

            return {
                ...tx,
                receipt,
                confirmations,
                status: receipt ? (receipt.status ? 'Success' : 'Failed') : 'Pending',
                gasUsed: receipt ? receipt.gasUsed : null,
                effectiveGasPrice: receipt ? receipt.effectiveGasPrice : null,
                timestamp: receipt ? (await this.web3.eth.getBlock(receipt.blockNumber)).timestamp : null
            };
        } catch (error) {
            console.error('Error fetching transaction details:', error);
            throw error;
        }
    }

    /**
     * Batch process multiple transactions
     * @param {Array<Object>} transactions 
     * @param {string} privateKey 
     * @returns {Promise<Array<string>>}
     */
    async batchProcessTransactions(transactions, privateKey) {
        const results = [];
        for (const tx of transactions) {
            try {
                const txHash = await this.sendTransaction(tx, privateKey);
                results.push({ success: true, txHash });
            } catch (error) {
                results.push({ success: false, error: error.message });
            }
        }
        return results;
    }

    /**
     * Get account balance and transaction history
     * @param {string} address 
     * @returns {Promise<Object>}
     */
    async getAccountInfo(address) {
        try {
            const [balance, code, transactionCount] = await Promise.all([
                this.web3.eth.getBalance(address),
                this.web3.eth.getCode(address),
                this.web3.eth.getTransactionCount(address)
            ]);

            return {
                address,
                balance: this.web3.utils.fromWei(balance, 'ether'),
                isContract: code !== '0x',
                transactionCount,
                timestamp: new Date().toISOString()
            };
        } catch (error) {
            console.error('Error fetching account info:', error);
            throw error;
        }
    }

    /**
     * Utility function for delay
     * @param {number} ms 
     * @returns {Promise<void>}
     */
    async delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Convert various units
     */
    convertUnits = {
        toWei: (amount, unit = 'ether') => this.web3.utils.toWei(amount.toString(), unit),
        fromWei: (amount, unit = 'ether') => this.web3.utils.fromWei(amount.toString(), unit),
        toHex: value => this.web3.utils.toHex(value),
        fromHex: hex => this.web3.utils.hexToNumber(hex)
    };

    /**
     * Validate Ethereum address
     * @param {string} address 
     * @returns {boolean}
     */
    isValidAddress(address) {
        return this.web3.utils.isAddress(address);
    }
}

// Export the enhanced blockchain connector
module.exports = BlockchainConnector;

// Usage example:
/*
const connector = new BlockchainConnector(NETWORKS.MAINNET);

async function example() {
    await connector.initialize();
    
    // Listen for events
    connector.on('newBlock', block => {
        console.log('New block:', block.number);
    });

    connector.on('transactionConfirmed', ({ txHash, receipt }) => {
        console.log('Transaction confirmed:', txHash);
    });

    // Send transaction
    const txHash = await connector.sendTransaction({
        from: '0xYourAddress',
        to: '0xRecipientAddress',
        value: connector.convertUnits.toWei('0.1')
    }, 'YourPrivateKey');

    // Get enhanced transaction details
    const txDetails = await connector.getEnhancedTransaction(txHash);
    console.log('Transaction details:', txDetails);
}
*/
