const MemberHelper = artifacts.require('MemberHelper');
const ListHelper = artifacts.require('ListHelper');
const MapHelper = artifacts.require('MapHelper');
const ContractRegistry = artifacts.require('ContractRegistry');
const VoterModel = artifacts.require('VoterModel');

module.exports = async function (deployer) {
  const memberHelper = await MemberHelper.deployed();
  const listHelper = await ListHelper.deployed();
  const mapHelper = await MapHelper.deployed();
  const contractRegistry = await ContractRegistry.deployed();
  await deployer.deploy(VoterModel, memberHelper.address, listHelper.address, mapHelper.address, contractRegistry.address);
};