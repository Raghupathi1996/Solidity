const QuireUpgradable = artifacts.require('QuireUpgradable');
const QuireStorage = artifacts.require('QuireStorage');

module.exports = async function(deployer) {
  const quireUpgradable = await QuireUpgradable.deployed();
  await deployer.deploy(QuireStorage, quireUpgradable.address);
};