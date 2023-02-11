const QuireUpgradable = artifacts.require('QuireUpgradable');
const QuireContracts = artifacts.require('QuireContracts');

const MemberStorage = artifacts.require('MemberStorage');
const ListStorage = artifacts.require('ListStorage');
const MapStorage = artifacts.require('MapStorage');

const VendorModel = artifacts.require('VendorModel');
const ProcuringEntityModel = artifacts.require('ProcuringEntityModel');
const AwardOfContractModel = artifacts.require('AwardOfContractModel');
const WorkExperienceModel = artifacts.require('WorkExperienceModel');
const BankModel = artifacts.require('BankModel');
const PaymentAdviceModel = artifacts.require('PaymentAdviceModel');
const BankGuaranteeModel = artifacts.require('BankGuaranteeModel');
const BankGuaranteeReleaseModel = artifacts.require('BankGuaranteeReleaseModel');
const BankGuaranteeInvokeModel = artifacts.require('BankGuaranteeInvokeModel');


const VendorManager = artifacts.require('VendorManager');
const ProcuringEntityManager = artifacts.require('ProcuringEntityManager');
const AwardOfContractManager = artifacts.require('AwardOfContractManager');
const WorkExperienceManager = artifacts.require('WorkExperienceManager');
const BankManager = artifacts.require('BankManager');
const PaymentAdviceManager = artifacts.require('PaymentAdviceManager');
const BankGuaranteeManager = artifacts.require('BankGuaranteeManager');
const VcnFunctionalManager = artifacts.require('VcnFunctionalManager');
const VcnFunctionalModel = artifacts.require('VcnFunctionalModel');
const BankGuaranteeReleaseManager = artifacts.require('BankGuaranteeReleaseManager');


const {Quire} = require("../constants")

module.exports = async function (callback) {

    const quireUpgradable = await QuireUpgradable.deployed();
    
    const quireContracts = await QuireContracts.deployed();
    await quireUpgradable.registerContract(Quire.Storage.QuireContracts, quireContracts.address);

    const memberStorage = await MemberStorage.deployed();
    const listStorage = await ListStorage.deployed();
    const mapStorage = await MapStorage.deployed();
    await quireUpgradable.registerContract(Quire.Storage.MemberHelper, memberStorage.address);
    await quireUpgradable.registerContract(Quire.Storage.ListHelper, listStorage.address);
    await quireUpgradable.registerContract(Quire.Storage.MapHelper, mapStorage.address);
    
    const vendorModel = await VendorModel.deployed();
    await quireUpgradable.registerContract(Quire.Models.VendorModel, vendorModel.address);

    const procuringEntityModel = await ProcuringEntityModel.deployed();
    await quireUpgradable.registerContract(Quire.Models.ProcuringEntityModel, procuringEntityModel.address);

    const awardOfContractModel = await AwardOfContractModel.deployed();
    await quireUpgradable.registerContract(Quire.Models.AwardOfContractModel, awardOfContractModel.address);

    const workExperienceModel = await WorkExperienceModel.deployed();
    await quireUpgradable.registerContract(Quire.Models.WorkExperienceModel, workExperienceModel.address);

    const bankModel = await BankModel.deployed();
    await quireUpgradable.registerContract(Quire.Models.BankModel, bankModel.address);

    const paymentAdviceModel = await PaymentAdviceModel.deployed();
    await quireUpgradable.registerContract(Quire.Models.PaymentAdviceModel, paymentAdviceModel.address);

    const bankGuaranteeModel = await BankGuaranteeModel.deployed();
    await quireUpgradable.registerContract(Quire.Models.BankGuaranteeModel, bankGuaranteeModel.address);

    const vcnFunctionalModel = await VcnFunctionalModel.deployed();
    await quireUpgradable.registerContract(Quire.Models.VcnFunctionalModel, vcnFunctionalModel.address);

    const bankGuaranteeReleaseModel = await BankGuaranteeReleaseModel.deployed();
    await quireUpgradable.registerContract(Quire.Models.BankGuaranteeReleaseModel, bankGuaranteeReleaseModel.address);

    const bankGuaranteeInvokeModel = await BankGuaranteeInvokeModel.deployed();
    await quireUpgradable.registerContract(Quire.Models.BankGuaranteeInvokeModel, bankGuaranteeInvokeModel.address);
        
    const vendorManager = await VendorManager.deployed();
    await quireUpgradable.registerContract(Quire.Contracts.VendorManager, vendorManager.address);

    const procuringEntityManager = await ProcuringEntityManager.deployed();
    await quireUpgradable.registerContract(Quire.Contracts.ProcuringEntityManager, procuringEntityManager.address);

    const awardOfContractManager = await AwardOfContractManager.deployed();
    await quireUpgradable.registerContract(Quire.Contracts.AwardOfContractManager, awardOfContractManager.address);

    const workExperienceManager = await WorkExperienceManager.deployed();
    await quireUpgradable.registerContract(Quire.Contracts.WorkExperienceManager, workExperienceManager.address);

    const bankManager = await BankManager.deployed();
    await quireUpgradable.registerContract(Quire.Contracts.BankManager, bankManager.address);

    const paymentAdviceManager = await PaymentAdviceManager.deployed();
    await quireUpgradable.registerContract(Quire.Contracts.PaymentAdviceManager, paymentAdviceManager.address);

    const bankGuaranteeManager = await BankGuaranteeManager.deployed();
    await quireUpgradable.registerContract(Quire.Contracts.BankGuaranteeManager, bankGuaranteeManager.address);

    const vcnFunctionalManager = await VcnFunctionalManager.deployed();
    await quireUpgradable.registerContract(Quire.Contracts.VcnFunctionalManager, vcnFunctionalManager.address);

    const bankGuaranteeReleaseManager = await BankGuaranteeReleaseManager.deployed();
    await quireUpgradable.registerContract(Quire.Contracts.BankGuaranteeReleaseManager, bankGuaranteeReleaseManager.address);

    callback();
}