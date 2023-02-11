const PermissionsUpgradable = artifacts.require('PermissionsUpgradable');

module.exports = async function(deployer) {
  await deployer.deploy(PermissionsUpgradable);
};