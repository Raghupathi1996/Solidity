const fs = require('fs');

const PaymentAdviceManager = artifacts.require('PaymentAdviceManager');
const BankGuaranteeManager = artifacts.require('BankGuaranteeManager');
const BankGuaranteeReleaseManager = artifacts.require('BankGuaranteeReleaseManager');
const VcnFunctionalManager = artifacts.require('VcnFunctionalManager');

module.exports = async function (callback) {
  const config = {
    contracts: {
      paymentAdviceManager: {
        abi: PaymentAdviceManager.abi,
        address: PaymentAdviceManager.address,
        bytecode: PaymentAdviceManager.bytecode
      },
      bankGuaranteeManager: {
        abi: BankGuaranteeManager.abi,
        address: BankGuaranteeManager.address,
        bytecode: BankGuaranteeManager.bytecode
      },
      bankGuaranteeReleaseManager: {
        abi: BankGuaranteeReleaseManager.abi,
        address: BankGuaranteeReleaseManager.address,
        bytecode: BankGuaranteeReleaseManager.bytecode
      },
      vcnFunctionalManager: {
        abi: VcnFunctionalManager.abi,
        address: VcnFunctionalManager.address,
        bytecode: VcnFunctionalManager.bytecode
      }
    },
    nodeUrlStaging: 'https://staging.egpblockchain.net/blockchain',
    nodeUrlProduction: 'https://egpblockchain.net/blockchain'
  };
  try {
    await fs.writeFileSync('config_bank.json', JSON.stringify(config))
    console.log('File written successfully\n');
    console.log(fs.readFileSync('config_bank.json', 'utf8'));
  } catch (error) {
    console.log(error);
  }
  callback();
};