const MemberStorage = artifacts.require('MemberStorage');
const ListStorage = artifacts.require('ListStorage');
const MapStorage = artifacts.require('MapStorage');
const BankGuaranteeInvokeModel = artifacts.require('BankGuaranteeInvokeModel');
const QuireContracts = artifacts.require('QuireContracts');
const BankGuaranteeReleaseModel = artifacts.require('BankGuaranteeReleaseModel')

module.exports = async function (deployer) {
  const memberStorage = await MemberStorage.deployed();
  const listStorage = await ListStorage.deployed();
  const mapStorage = await MapStorage.deployed();
  const quireContracts = await QuireContracts.deployed();
  const bankGuaranteeReleaseModel = await BankGuaranteeReleaseModel.deployed();
  await deployer.deploy(BankGuaranteeInvokeModel, memberStorage.address, listStorage.address, mapStorage.address, quireContracts.address, bankGuaranteeReleaseModel.address);
};