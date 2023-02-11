const BankManager = artifacts.require('BankManager');
const PaymentAdviceManager = artifacts.require('PaymentAdviceManager');
const BankGuaranteeManager = artifacts.require('BankGuaranteeManager');
const AccountManager = artifacts.require('AccountManager');
const BankGuaranteeModel = artifacts.require('BankGuaranteeModel');
const VcnFunctionalManager = artifacts.require('VcnFunctionalManager');

module.exports = async function (deployer) {
  const accountManager = await AccountManager.deployed();
  const bankGuaranteeModel = await BankGuaranteeModel.deployed();
  const bankManager = await BankManager.deployed();
  const paymentAdviceManager = await PaymentAdviceManager.deployed();
  const vcnFunctionalManager = await VcnFunctionalManager.deployed();
  await deployer.deploy(BankGuaranteeManager, bankManager.address, paymentAdviceManager.address, bankGuaranteeModel.address, accountManager.address, vcnFunctionalManager.address);
};