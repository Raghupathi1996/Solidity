const MemberStorage = artifacts.require('MemberStorage');
const ListStorage = artifacts.require('ListStorage');
const MapStorage = artifacts.require('MapStorage');
const PaymentAdviceModel = artifacts.require('PaymentAdviceModel');
const QuireContracts = artifacts.require('QuireContracts');

module.exports = async function (deployer) {
  const memberStorage = await MemberStorage.deployed();
  const listStorage = await ListStorage.deployed();
  const mapStorage = await MapStorage.deployed();
  const quireContracts = await QuireContracts.deployed();
  await deployer.deploy(PaymentAdviceModel, memberStorage.address, listStorage.address, mapStorage.address, quireContracts.address);
};