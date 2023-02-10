const VcnFunctionalManager = artifacts.require('VcnFunctionalManager');
const VcnFunctionalModel = artifacts.require('VcnFunctionalModel');
const PermissionsInterface = artifacts.require('PermissionsInterface');
module.exports = async function (deployer) {
  const permissionsInterface = await PermissionsInterface.deployed();
  const vcnFunctionalModel = await VcnFunctionalModel.deployed();
  await deployer.deploy(VcnFunctionalManager, permissionsInterface.address, vcnFunctionalModel.address);
};