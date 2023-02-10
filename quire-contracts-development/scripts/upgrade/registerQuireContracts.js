const QuireUpgradable = artifacts.require('QuireUpgradable');

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

const VendorManager = artifacts.require('VendorManager');
const ProcuringEntityManager = artifacts.require('ProcuringEntityManager');
const AwardOfContractManager = artifacts.require('AwardOfContractManager');
const WorkExperienceManager = artifacts.require('WorkExperienceManager');
const BankManager = artifacts.require('BankManager');
const PaymentAdviceManager = artifacts.require('PaymentAdviceManager');
const BankGuaranteeManager = artifacts.require('BankGuaranteeManager');

const BankGuaranteeReleaseManager = artifacts.require('BankGuaranteeReleaseManager');
const BankGuaranteeReleaseModel = artifacts.require('BankGuaranteeReleaseModel');
const BankGuaranteeInvokeModel = artifacts.require('BankGuaranteeInvokeModel');

const VcnFunctionalManager = artifacts.require('VcnFunctionalManager');
const VcnFunctionalModel = artifacts.require('VcnFunctionalModel');

const {Quire} = require("../constants")

module.exports = async function (callback) {

    const args = new Set();
    for(let i=4;i<process.argv.length;i++) {
        args.add(process.argv[i]);
    }

    const quireUpgradable = await QuireUpgradable.deployed();

    if((args.size==0) || args.has("MemberStorage")) {
        const memberStorage = await MemberStorage.deployed();
        await quireUpgradable.registerContract(Quire.Storage.MemberHelper, memberStorage.address);
        console.log("Registered Contract: MemberStorage");
    } 

    if((args.size==0) || args.has("ListStorage")) {
        const listStorage = await ListStorage.deployed();
        await quireUpgradable.registerContract(Quire.Storage.ListHelper, listStorage.address);
        console.log("Registered Contract: ListStorage");
    }

    if((args.size==0) || args.has("MapStorage")) {
        const mapStorage = await MapStorage.deployed();
        await quireUpgradable.registerContract(Quire.Storage.MapHelper, mapStorage.address);
        console.log("Registered Contract: MapStorage");
    }
    
    if((args.size==0) || args.has("VendorModel")) {
        const vendorModel = await VendorModel.deployed();
        await quireUpgradable.registerContract(Quire.Models.VendorModel, vendorModel.address);
        console.log("Registered Contract: VendorModel");
    }

    if((args.size==0) || args.has("ProcuringEntityModel")) {
        const procuringEntityModel = await ProcuringEntityModel.deployed();
        await quireUpgradable.registerContract(Quire.Models.ProcuringEntityModel, procuringEntityModel.address);
        console.log("Registered Contract: ProcuringEntityModel");
    }

    if((args.size==0) || args.has("AwardOfContractModel")) {
        const awardOfContractModel = await AwardOfContractModel.deployed();
        await quireUpgradable.registerContract(Quire.Models.AwardOfContractModel, awardOfContractModel.address);
        console.log("Registered Contract: AwardOfContractModel");
    }

    if((args.size==0) || args.has("BankModel")) {
        const bankModel = await BankModel.deployed();
        await quireUpgradable.registerContract(Quire.Models.BankModel, bankModel.address);
        console.log("Registered Contract: BankModel");
    }

    if((args.size==0) || args.has("PaymentAdviceModel")) {
        const paymentAdviceModel = await PaymentAdviceModel.deployed();
        await quireUpgradable.registerContract(Quire.Models.PaymentAdviceModel, paymentAdviceModel.address);
        console.log("Registered Contract: PaymentAdviceModel");
    }

    if((args.size==0) || args.has("BankGuaranteeModel")) {
        const bankGuaranteeModel = await BankGuaranteeModel.deployed();
        await quireUpgradable.registerContract(Quire.Models.BankGuaranteeModel, bankGuaranteeModel.address);
        console.log("Registered Contract: BankGuaranteeModel");
    }

    if((args.size==0) || args.has("BankGuaranteeReleaseModel")) {
        const bankGuaranteeReleaseModel = await BankGuaranteeReleaseModel.deployed();
        await quireUpgradable.registerContract(Quire.Models.BankGuaranteeReleaseModel, bankGuaranteeReleaseModel.address);
        console.log("Registered Contract: BankGuaranteeReleaseModel");
    }

    if((args.size==0) || args.has("BankGuaranteeInvokeModel")) {
        const bankGuaranteeInvokeModel = await BankGuaranteeInvokeModel.deployed();
        await quireUpgradable.registerContract(Quire.Models.BankGuaranteeInvokeModel, bankGuaranteeInvokeModel.address);
        console.log("Registered Contract: BankGuaranteeReleaseModel");
    }

    if((args.size==0) || args.has("WorkExperienceModel")) {
        const workExperienceModel = await WorkExperienceModel.deployed();
        await quireUpgradable.registerContract(Quire.Models.WorkExperienceModel, workExperienceModel.address);
        console.log("Registered Contract: WorkExperienceModel");
    }

    if((args.size==0) || args.has("VcnFunctionalModel")) {
        const vcnFunctionalModel = await VcnFunctionalModel.deployed();
        await quireUpgradable.registerContract(Quire.Models.VcnFunctionalModel, vcnFunctionalModel.address);
        console.log("Registered Contract: VcnFunctionalModel");
    }

    if((args.size==0) || args.has("VendorManager")) {
        const vendorManager = await VendorManager.deployed();
        await quireUpgradable.registerContract(Quire.Contracts.VendorManager, vendorManager.address);
        console.log("Registered Contract: VendorManager");
    }

    if((args.size==0) || args.has("ProcuringEntityManager")) {
        const procuringEntityManager = await ProcuringEntityManager.deployed();
        await quireUpgradable.registerContract(Quire.Contracts.ProcuringEntityManager, procuringEntityManager.address);
        console.log("Registered Contract: ProcuringEntityManager");
    }

    if((args.size==0) || args.has("AwardOfContractManager")) {
        const awardOfContractManager = await AwardOfContractManager.deployed();
        await quireUpgradable.registerContract(Quire.Contracts.AwardOfContractManager, awardOfContractManager.address);
        console.log("Registered Contract: AwardOfContractManager");
    }

    if((args.size==0) || args.has("WorkExperienceManager")) {
        const workExperienceManager = await WorkExperienceManager.deployed();
        await quireUpgradable.registerContract(Quire.Contracts.WorkExperienceManager, workExperienceManager.address);
        console.log("Registered Contract: WorkExperienceManager");
    }

    if((args.size==0) || args.has("BankManager")) {
        const bankManager = await BankManager.deployed();
        await quireUpgradable.registerContract(Quire.Contracts.BankManager, bankManager.address);
        console.log("Registered Contract: BankManager");
    }

    if((args.size==0) || args.has("PaymentAdviceManager")) {
        const paymentAdviceManager = await PaymentAdviceManager.deployed();
        await quireUpgradable.registerContract(Quire.Contracts.PaymentAdviceManager, paymentAdviceManager.address);
        console.log("Registered Contract: PaymentAdviceManager");
    }

    if((args.size==0) || args.has("BankGuaranteeManager")) {
        const bankGuaranteeManager = await BankGuaranteeManager.deployed();
        await quireUpgradable.registerContract(Quire.Contracts.BankGuaranteeManager, bankGuaranteeManager.address);
        console.log("Registered Contract: BankGuaranteeManager");
    }

    if((args.size==0) || args.has("BankGuaranteeReleaseManager")) {
        const bankGuaranteeReleaseManager = await BankGuaranteeReleaseManager.deployed();
        await quireUpgradable.registerContract(Quire.Contracts.BankGuaranteeReleaseManager, bankGuaranteeReleaseManager.address);
        console.log("Registered Contract: BankGuaranteeReleaseManager");
    }

    if((args.size==0) || args.has("VcnFunctionalManager")) {
        const vcnFunctionalManager = await VcnFunctionalManager.deployed();
        await quireUpgradable.registerContract(Quire.Contracts.VcnFunctionalManager, vcnFunctionalManager.address);
        console.log("Registered Contract: VcnFunctionalManager");
    }

    callback();
}