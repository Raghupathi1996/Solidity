const PermissionsInterface = artifacts.require('PermissionsInterface');
const ProcuringEntityManager = artifacts.require('ProcuringEntityManager');
const ProcuringEntityModel = artifacts.require('ProcuringEntityModel');
const UidUtils = artifacts.require('UidUtils');

module.exports = async function (deployer) {
  const permissionsInterface = await PermissionsInterface.deployed();
  const procuringEntityModel = await ProcuringEntityModel.deployed();
  const uidUtils = await UidUtils.deployed();
  await deployer.deploy(ProcuringEntityManager, permissionsInterface.address, procuringEntityModel.address, uidUtils.address);
};