const PermissionsUpgradable = artifacts.require('PermissionsUpgradable');
const EternalStorage = artifacts.require('EternalStorage');

module.exports = async function(deployer) {
  const permissionsUpgradable = await PermissionsUpgradable.deployed();
  await deployer.deploy(EternalStorage, permissionsUpgradable.address);
};