const MemberHelper = artifacts.require('MemberHelper');
const ListHelper = artifacts.require('ListHelper');
const MapHelper = artifacts.require('MapHelper');
const ContractRegistry = artifacts.require('ContractRegistry');
const RoleModel = artifacts.require('RoleModel');

module.exports = async function (deployer) {
  const memberHelper = await MemberHelper.deployed();
  const listHelper = await ListHelper.deployed();
  const mapHelper = await MapHelper.deployed();
  const contractRegistry = await ContractRegistry.deployed();
  await deployer.deploy(RoleModel, memberHelper.address, listHelper.address, mapHelper.address, contractRegistry.address);
};