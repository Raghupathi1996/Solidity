const EternalStorage = artifacts.require('EternalStorage');
const ListHelper = artifacts.require('ListHelper');

module.exports = async function(deployer) {
  const eternalStorage = await EternalStorage.deployed();
  await deployer.deploy(ListHelper, eternalStorage.address);
};