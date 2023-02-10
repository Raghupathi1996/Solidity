const PermissionsInterface = artifacts.require('PermissionsInterface');
const PermissionsImplementation = artifacts.require('PermissionsImplementation');
const BankManager = artifacts.require('BankManager');
const AccountManager = artifacts.require('AccountManager');
const BankModel = artifacts.require('BankModel');
const UidUtils = artifacts.require('UidUtils');

module.exports = async function (deployer) {
  const permissionsInterface = await PermissionsInterface.deployed();
  const permissionsImplementation = await PermissionsImplementation.deployed();
  const accountManager = await AccountManager.deployed();
  const bankModel = await BankModel.deployed();
  const uidUtils = await UidUtils.deployed();
  await deployer.deploy(BankManager, permissionsInterface.address, permissionsImplementation.address, 
    accountManager.address, bankModel.address, uidUtils.address);
};