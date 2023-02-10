const EternalStorage = artifacts.require('EternalStorage');
const MemberHelper = artifacts.require('MemberHelper');

module.exports = async function(deployer) {
  const eternalStorage = await EternalStorage.deployed();
  await deployer.deploy(MemberHelper, eternalStorage.address);
};