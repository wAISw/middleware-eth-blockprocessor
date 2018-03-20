/**
 * Chronobank/eth-blockprocessor configuration
 * @module config
 * @returns {Object} Configuration
 */

require('dotenv').config();
const parseEnvProviders = require('../utils').parseEnvProviders;

const config = {
  mongo: {
    accounts: {
      uri: process.env.MONGO_ACCOUNTS_URI || process.env.MONGO_URI || 'mongodb://localhost:27017/data',
      collectionPrefix: process.env.MONGO_ACCOUNTS_COLLECTION_PREFIX || process.env.MONGO_COLLECTION_PREFIX || 'eth'
    },
    data: {
      uri: process.env.MONGO_DATA_URI || process.env.MONGO_URI || 'mongodb://localhost:27017/data',
      collectionPrefix: process.env.MONGO_DATA_COLLECTION_PREFIX || process.env.MONGO_COLLECTION_PREFIX || 'eth'
    }
  },
  consensus: {
    lastBlocksValidateAmount: parseInt(process.env.CONSENSUS_BLOCK_VALIDATE_AMOUNT) || 12
  },
  rabbit: {
    url: process.env.RABBIT_URI || 'amqp://localhost:5672',
    serviceName: process.env.RABBIT_SERVICE_NAME || 'app_eth'
  },
  dev: {
    web3: {
      uri:  `${/^win/.test(process.platform) ? '\\\\.\\pipe\\' : ''}${`/tmp/${(process.env.NETWORK || 'development')}/geth.ipc`}`,
      httpUri: 'http://localhost:8545',
      network: process.env.NETWORK || 'development'
    }
  },
  providers: parseEnvProviders(process.env.PROVIDERS) || [
    `${/^win/.test(process.platform) ? '\\\\.\\pipe\\' : ''}${`/tmp/${(process.env.NETWORK || 'development')}/geth.ipc`}`
  ]
};

module.exports = config;
