const PermissionsInterface = artifacts.require('PermissionsInterface');
const AccountManager = artifacts.require('AccountManager');
const ProcuringEntityManager = artifacts.require('ProcuringEntityManager');
const WorkExperienceManager = artifacts.require('WorkExperienceManager');
const VendorManager = artifacts.require('VendorManager')
const AwardOfContractManager = artifacts.require('AwardOfContractManager');
const WorkExperienceModel = artifacts.require('WorkExperienceModel');

module.exports = async function (deployer) {
  const permissionsInterface = await PermissionsInterface.deployed();
  const accountManager = await AccountManager.deployed();
  const procuringEntityManager = await ProcuringEntityManager.deployed();
  const vendorManager = await VendorManager.deployed();
  const aocManager = await AwardOfContractManager.deployed();
  const workExperienceModel = await WorkExperienceModel.deployed();
  await deployer.deploy(
    WorkExperienceManager,
    permissionsInterface.address,
    accountManager.address,
    procuringEntityManager.address,
    vendorManager.address, 
    aocManager.address,
    workExperienceModel.address
  );
};