const AwardOfContractManager = artifacts.require('AwardOfContractManager');
const PermissionsInterface = artifacts.require('PermissionsInterface');
const VendorManager = artifacts.require('VendorManager');
const ProcuringEntityManager = artifacts.require('ProcuringEntityManager');
const AwardOfContractModel = artifacts.require('AwardOfContractModel');

module.exports = async function (deployer) {
  const permissionsInterface = await PermissionsInterface.deployed();
  const vendorManager = await VendorManager.deployed();
  const procEntityManager = await ProcuringEntityManager.deployed();
  const aocModel = await AwardOfContractModel.deployed();
  await deployer.deploy(
    AwardOfContractManager,
    permissionsInterface.address, 
    vendorManager.address, 
    procEntityManager.address,
    aocModel.address
  );
};