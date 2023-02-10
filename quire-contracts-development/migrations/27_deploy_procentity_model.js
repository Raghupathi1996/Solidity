const MemberStorage = artifacts.require('MemberStorage');
const ListStorage = artifacts.require('ListStorage');
const MapStorage = artifacts.require('MapStorage');
const ProcuringEntityModel = artifacts.require('ProcuringEntityModel');
const QuireContracts = artifacts.require('QuireContracts');

module.exports = async function (deployer) {
  const memberStorage = await MemberStorage.deployed();
  const listStorage = await ListStorage.deployed();
  const mapStorage = await MapStorage.deployed();
  const quireContracts = await QuireContracts.deployed();
  await deployer.deploy(ProcuringEntityModel, memberStorage.address, listStorage.address, mapStorage.address, quireContracts.address);
};