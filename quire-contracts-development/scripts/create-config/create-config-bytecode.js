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

module.exports = async function (callback) {
  const config = {
    contracts: {
      permInterface: {
        abi: PermissionsInterface.abi,
        address: PermissionsInterface.address,
        bytecode: PermissionsInterface.bytecode
      },
      accountManager: {
        abi: AccountManager.abi,
        address: AccountManager.address,
        bytecode: AccountManager.bytecode
      },
      nodeManager: {
        abi: NodeManager.abi,
        address: NodeManager.address,
        bytecode: NodeManager.bytecode
      },
      orgManager: {
        abi: OrgManager.abi,
        address: OrgManager.address,
        bytecode: OrgManager.bytecode
      },
      roleManager: {
        abi: RoleManager.abi,
        address: RoleManager.address,
        bytecode: RoleManager.bytecode
      },
      voterManager: {
        abi: VoterManager.abi,
        address: VoterManager.address,
        bytecode: VoterManager.bytecode
      },
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
      bankManager: {
        abi: BankManager.abi,
        address: BankManager.address,
        bytecode: BankManager.bytecode
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
    nodeUrl: 'http://localhost:22000'
  };
  try {
    await fs.writeFileSync('config_bytecode.json', JSON.stringify(config))
    console.log('File written successfully\n');
    console.log(fs.readFileSync('config_bytecode.json', 'utf8'));
  } catch (error) {
    console.log(error);
  }
  callback();
};