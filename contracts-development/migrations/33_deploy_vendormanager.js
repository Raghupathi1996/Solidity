const PermissionsInterface = artifacts.require('PermissionsInterface');
const PermissionsImplementation = artifacts.require('PermissionsImplementation');
const VendorManager = artifacts.require('VendorManager');
const AccountManager = artifacts.require('AccountManager');
const VendorModel = artifacts.require('VendorModel');
const UidUtils = artifacts.require('UidUtils');

module.exports = async function (deployer) {
  const permissionsInterface = await PermissionsInterface.deployed();
  const permissionsImplementation = await PermissionsImplementation.deployed();
  const accountManager = await AccountManager.deployed();
  const vendorModel = await VendorModel.deployed();
  const uidUtils = await UidUtils.deployed();
  await deployer.deploy(VendorManager, permissionsInterface.address, permissionsImplementation.address, 
    accountManager.address, vendorModel.address, uidUtils.address);
};