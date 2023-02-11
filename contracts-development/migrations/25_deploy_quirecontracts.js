const QuireUpgradable = artifacts.require('QuireUpgradable');
const QuireStorage = artifacts.require('QuireStorage');
const QuireContracts = artifacts.require('QuireContracts');

module.exports = async function(deployer) {
  const quireUpgradable = await QuireUpgradable.deployed();
  const quireStorage = await QuireStorage.deployed();
  await deployer.deploy(QuireContracts, quireUpgradable.address, quireStorage.address);
};