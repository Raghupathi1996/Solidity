const PermissionsInterface = artifacts.require('PermissionsInterface');
const PaymentAdviceManager = artifacts.require('PaymentAdviceManager');
const VendorManager = artifacts.require('VendorManager');
const ProcuringEntityManager = artifacts.require('ProcuringEntityManager');
const PaymentAdviceModel = artifacts.require('PaymentAdviceModel');
const VcnFunctionalManager = artifacts.require('VcnFunctionalManager');

module.exports = async function (deployer) {
  const permissionsInterface = await PermissionsInterface.deployed();
  const vendorManager = await VendorManager.deployed();
  const procuringEntityManager = await ProcuringEntityManager.deployed();
  const paymentAdviceModel = await PaymentAdviceModel.deployed();
  const vcnFunctionalManager = await VcnFunctionalManager.deployed();
  await deployer.deploy(PaymentAdviceManager, permissionsInterface.address, vendorManager.address, procuringEntityManager.address, paymentAdviceModel.address, vcnFunctionalManager.address);
};