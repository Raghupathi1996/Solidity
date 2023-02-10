const PermissionsUpgradable = artifacts.require('PermissionsUpgradable');
const EternalStorage = artifacts.require('EternalStorage');
const ContractRegistry = artifacts.require('ContractRegistry');

module.exports = async function(deployer) {
  const permissionsUpgradable = await PermissionsUpgradable.deployed();
  const eternalStorage = await EternalStorage.deployed();
  await deployer.deploy(ContractRegistry, permissionsUpgradable.address, eternalStorage.address);
};