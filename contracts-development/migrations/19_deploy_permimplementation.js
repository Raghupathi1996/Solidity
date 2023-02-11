
const PermissionsUpgradable = artifacts.require('PermissionsUpgradable');
const AccountManager = artifacts.require('AccountManager');
const NodeManager = artifacts.require('NodeManager');
const OrgManager = artifacts.require('OrgManager');
const RoleManager = artifacts.require('RoleManager');
const VoterManager = artifacts.require('VoterManager');
const PermissionsImplementation = artifacts.require('PermissionsImplementation');


module.exports = async function (deployer) {
  const permissionsUpgradable = await PermissionsUpgradable.deployed();
  const nodeManager = await NodeManager.deployed();
  const accountManager = await AccountManager.deployed();
  const orgManager = await OrgManager.deployed();
  const roleManager = await RoleManager.deployed();
  const voterManager = await VoterManager.deployed();

  await deployer.deploy(PermissionsImplementation, permissionsUpgradable.address, orgManager.address,
    roleManager.address, accountManager.address, voterManager.address, nodeManager.address);
};