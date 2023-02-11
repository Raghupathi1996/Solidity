
const PermissionsUpgradable = artifacts.require('PermissionsUpgradable');
const VoterManager = artifacts.require('VoterManager');
const VoterModel = artifacts.require('VoterModel');

module.exports = async function (deployer) {
  const permissionsUpgradable = await PermissionsUpgradable.deployed();
  const voterModel = await VoterModel.deployed();
  await deployer.deploy(VoterManager, permissionsUpgradable.address, voterModel.address);
};