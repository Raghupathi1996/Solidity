
const PermissionsUpgradable = artifacts.require('PermissionsUpgradable');
const PermissionsInterface = artifacts.require('PermissionsInterface');

module.exports = async function (deployer) {
  const permissionsUpgradable = await PermissionsUpgradable.deployed();
  await deployer.deploy(PermissionsInterface, permissionsUpgradable.address);
};