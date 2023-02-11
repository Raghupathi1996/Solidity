
const PermissionsUpgradable = artifacts.require('PermissionsUpgradable');
const OrgModel = artifacts.require('OrgModel');
const OrgManager = artifacts.require('OrgManager');

module.exports = async function (deployer) {
  const permissionsUpgradable = await PermissionsUpgradable.deployed();
  const orgModel = await OrgModel.deployed();
  await deployer.deploy(OrgManager, permissionsUpgradable.address, orgModel.address);
};