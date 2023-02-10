const EternalStorage = artifacts.require('EternalStorage');
const MapHelper = artifacts.require('MapHelper');

module.exports = async function(deployer) {
  const eternalStorage = await EternalStorage.deployed();
  await deployer.deploy(MapHelper, eternalStorage.address);
};