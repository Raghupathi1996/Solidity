
const PermissionsUpgradable = artifacts.require('PermissionsUpgradable');
const NodeModel = artifacts.require('NodeModel');
const NodeManager = artifacts.require('NodeManager');

module.exports = async function (deployer) {
  const permissionsUpgradable = await PermissionsUpgradable.deployed();
  const nodeModel = await NodeModel.deployed();
  await deployer.deploy(NodeManager, permissionsUpgradable.address, nodeModel.address);
};