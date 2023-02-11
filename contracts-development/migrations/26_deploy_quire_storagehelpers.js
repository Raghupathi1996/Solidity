const QuireStorage = artifacts.require('QuireStorage');
const MapStorage = artifacts.require('MapStorage');
const MemberStorage = artifacts.require('MemberStorage');
const ListStorage = artifacts.require('ListStorage');

module.exports = async function(deployer) {
  const quireStorage = await QuireStorage.deployed();
  await deployer.deploy(MapStorage, quireStorage.address);
  await deployer.deploy(MemberStorage, quireStorage.address);
  await deployer.deploy(ListStorage, quireStorage.address);
};