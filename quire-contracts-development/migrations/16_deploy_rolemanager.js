
const PermissionsUpgradable = artifacts.require('PermissionsUpgradable');
const RoleModel = artifacts.require('RoleModel');
const RoleManager = artifacts.require('RoleManager');

module.exports = async function (deployer) {
  const permissionsUpgradable = await PermissionsUpgradable.deployed();
  const roleModel = await RoleModel.deployed();
  await deployer.deploy(RoleManager, permissionsUpgradable.address, roleModel.address);
};