const BankGuaranteeReleaseManager = artifacts.require('BankGuaranteeReleaseManager');
const BankGuaranteeManager = artifacts.require('BankGuaranteeManager');
const BankGuaranteeReleaseModel = artifacts.require('BankGuaranteeReleaseModel');
const BankGuaranteeInvokeModel = artifacts.require('BankGuaranteeInvokeModel');
const PermissionsInterface = artifacts.require('PermissionsInterface');
const VcnFunctionalManager = artifacts.require('VcnFunctionalManager');

module.exports = async function (deployer) {
  const bankGuaranteeReleaseModel = await BankGuaranteeReleaseModel.deployed();
  const bankGuaranteeInvokeModel = await BankGuaranteeInvokeModel.deployed();
  const bankGuaranteeManager = await BankGuaranteeManager.deployed();
  const permInterface = await PermissionsInterface.deployed();
  const vcnFunctionalManager = await VcnFunctionalManager.deployed();
  await deployer.deploy(BankGuaranteeReleaseManager, bankGuaranteeReleaseModel.address, bankGuaranteeInvokeModel.address, bankGuaranteeManager.address, permInterface.address, vcnFunctionalManager.address);
};