const fs = require('fs');

const PermissionsInterface = artifacts.require('PermissionsInterface');
const AccountManager = artifacts.require('AccountManager');
const NodeManager = artifacts.require('NodeManager');
const OrgManager = artifacts.require('OrgManager');
const RoleManager = artifacts.require('RoleManager');
const VoterManager = artifacts.require('VoterManager');
const ProcuringEntityManager = artifacts.require('ProcuringEntityManager');
const VendorManager = artifacts.require('VendorManager');
const AwardOfContractManager = artifacts.require('AwardOfContractManager');
const WorkExperienceManager = artifacts.require('WorkExperienceManager');
const BankManager = artifacts.require('BankManager');
const PaymentAdviceManager = artifacts.require('PaymentAdviceManager');
const BankGuaranteeManager = artifacts.require('BankGuaranteeManager');
const BankGuaranteeReleaseManager = artifacts.require('BankGuaranteeReleaseManager');
const VcnFunctionalManager = artifacts.require('VcnFunctionalManager');
const QuireContracts = artifacts.require('QuireContracts');

module.exports = async function (callback) {
  const config = {
    contracts: {
      permInterface: {
        abi: PermissionsInterface.abi,
        address: PermissionsInterface.address
      },
      accountManager: {
        abi: AccountManager.abi,
        address: AccountManager.address
      },
      nodeManager: {
        abi: NodeManager.abi,
        address: NodeManager.address
      },
      orgManager: {
        abi: OrgManager.abi,
        address: OrgManager.address
      },
      roleManager: {
        abi: RoleManager.abi,
        address: RoleManager.address
      },
      voterManager: {
        abi: VoterManager.abi,
        address: VoterManager.address
      },
      procuringEntityManager: {
        abi: ProcuringEntityManager.abi,
        address: ProcuringEntityManager.address
      },
      vendorManager: {
        abi: VendorManager.abi,
        address: VendorManager.address
      },
      awardOfContractManager: {
        abi: AwardOfContractManager.abi,
        address: AwardOfContractManager.address
      },
      workExperienceManager: {
        abi: WorkExperienceManager.abi,
        address: WorkExperienceManager.address
      },
      bankManager: {
        abi: BankManager.abi,
        address: BankManager.address,
      },
      paymentAdviceManager: {
        abi: PaymentAdviceManager.abi,
        address: PaymentAdviceManager.address,
      },
      bankGuaranteeManager: {
        abi: BankGuaranteeManager.abi,
        address: BankGuaranteeManager.address,
      },
      bankGuaranteeReleaseManager: {
        abi: BankGuaranteeReleaseManager.abi,
        address: BankGuaranteeReleaseManager.address,
      },
      vcnFunctionalManager: {
        abi: VcnFunctionalManager.abi,
        address: VcnFunctionalManager.address,
      },
      quireContracts: {
        abi: QuireContracts.abi,
        address: QuireContracts.address,
      }
    },
    nodeUrl: 'http://localhost:22000'
  };
  try {
    await fs.writeFileSync('config.json', JSON.stringify(config))
    console.log('File written successfully\n');
    console.log(fs.readFileSync('config.json', 'utf8'));
  } catch (error) {
    console.log(error);
  }
  callback();
};