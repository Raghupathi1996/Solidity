const QuireUpgradable = artifacts.require('QuireUpgradable');

module.exports = async function(deployer) {
  await deployer.deploy(QuireUpgradable);
};