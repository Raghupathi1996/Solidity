const PermissionsUpgradable = artifacts.require('PermissionsUpgradable');
const AccountManager = artifacts.require('AccountManager');
const AccountModel = artifacts.require('AccountModel');

module.exports = async function (deployer) {
  const permissionsUpgradable = await PermissionsUpgradable.deployed();
  const accountModel = await AccountModel.deployed();
  await deployer.deploy(AccountManager, permissionsUpgradable.address, accountModel.address);
};