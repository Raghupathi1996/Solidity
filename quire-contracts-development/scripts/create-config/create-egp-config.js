const fs = require('fs');

const ProcuringEntityManager = artifacts.require('ProcuringEntityManager');
const VendorManager = artifacts.require('VendorManager');
const AwardOfContractManager = artifacts.require('AwardOfContractManager');
const WorkExperienceManager = artifacts.require('WorkExperienceManager');
const PaymentAdviceManager = artifacts.require('PaymentAdviceManager');
const BankGuaranteeManager = artifacts.require('BankGuaranteeManager');
const BankGuaranteeReleaseManager = artifacts.require('BankGuaranteeReleaseManager');
const VcnFunctionalManager = artifacts.require('VcnFunctionalManager');

module.exports = async function (callback) {
  const config = {
    contracts: {
      procuringEntityManager: {
        abi: ProcuringEntityManager.abi,
        address: ProcuringEntityManager.address,
        bytecode: ProcuringEntityManager.bytecode
      },
      vendorManager: {
        abi: VendorManager.abi,
        address: VendorManager.address,
        bytecode: VendorManager.bytecode
      },
      awardOfContractManager: {
        abi: AwardOfContractManager.abi,
        address: AwardOfContractManager.address,
        bytecode: AwardOfContractManager.bytecode
      },
      workExperienceManager: {
        abi: WorkExperienceManager.abi,
        address: WorkExperienceManager.address,
        bytecode: WorkExperienceManager.bytecode
      },
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
    nodeUrl: 'https://staging.egpblockchain.net/blockchain'
  };
  try {
    await fs.writeFileSync('config_egp.json', JSON.stringify(config))
    console.log('File written successfully\n');
    console.log(fs.readFileSync('config_egp.json', 'utf8'));
  } catch (error) {
    console.log(error);
  }
  callback();
};