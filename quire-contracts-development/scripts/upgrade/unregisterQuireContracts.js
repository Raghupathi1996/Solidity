const QuireUpgradable = artifacts.require('QuireUpgradable');
const QuireContracts = artifacts.require('QuireContracts');

const {Quire} = require("../constants")

module.exports = async function (callback) {
    
    const args = new Set();
    for(let i=4;i<process.argv.length;i++) {
        args.add(process.argv[i]);
    }

    const quireUpgradable = await QuireUpgradable.deployed();
    const quireContracts = await QuireContracts.deployed();

    if((args.size==0) || args.has("MemberStorage")) {
        const memberStorage = await quireContracts.getRegisteredContract(Quire.Storage.MemberHelper)
        if (memberStorage!='0x0000000000000000000000000000000000000000') {
            await quireUpgradable.unRegisterContract(Quire.Storage.MemberHelper, memberStorage);
            console.log("Un-registered Contract: MemberStorage");
        }
    }

    if((args.size==0) || args.has("ListStorage")) {
        const listStorage = await quireContracts.getRegisteredContract(Quire.Storage.ListHelper)
        if (listStorage!='0x0000000000000000000000000000000000000000') {
            await quireUpgradable.unRegisterContract(Quire.Storage.ListHelper, listStorage);
            console.log("Un-registered Contract: ListStorage");
        }
    }

    if((args.size==0) || args.has("MapStorage")) {
        const mapStorage = await quireContracts.getRegisteredContract(Quire.Storage.MapHelper)
        if (mapStorage!='0x0000000000000000000000000000000000000000') {
            await quireUpgradable.unRegisterContract(Quire.Storage.MapHelper, mapStorage);
            console.log("Un-registered Contract: MapStorage");
        }
    }
    
    if((args.size==0) || args.has("VendorModel")) {
        const vendorModel = await quireContracts.getRegisteredContract(Quire.Models.VendorModel)
        if (vendorModel!='0x0000000000000000000000000000000000000000') {
            await quireUpgradable.unRegisterContract(Quire.Models.VendorModel, vendorModel);
            console.log("Un-registered Contract: VendorModel");
        }
    }

    if((args.size==0) || args.has("ProcuringEntityModel")) {
        const procuringEntityModel = await quireContracts.getRegisteredContract(Quire.Models.ProcuringEntityModel)
        if (procuringEntityModel!='0x0000000000000000000000000000000000000000') {
            await quireUpgradable.unRegisterContract(Quire.Models.ProcuringEntityModel, procuringEntityModel);
            console.log("Un-registered Contract: ProcuringEntityModel");
        }
    }

    if((args.size==0) || args.has("AwardOfContractModel")) {
        const awardOfContractModel = await quireContracts.getRegisteredContract(Quire.Models.AwardOfContractModel)
        if (awardOfContractModel!='0x0000000000000000000000000000000000000000') {
            await quireUpgradable.unRegisterContract(Quire.Models.AwardOfContractModel, awardOfContractModel);
            console.log("Un-registered Contract: AwardOfContractModel");
        }
    }

    if((args.size==0) || args.has("WorkExperienceModel")) {
        const workExperienceModel = await quireContracts.getRegisteredContract(Quire.Models.WorkExperienceModel)
        if (workExperienceModel!='0x0000000000000000000000000000000000000000') {
            await quireUpgradable.unRegisterContract(Quire.Models.WorkExperienceModel, workExperienceModel);
            console.log("Un-registered Contract: WorkExperienceModel");
        }
    }

    if((args.size==0) || args.has("BankModel")) {
        const bankModel = await quireContracts.getRegisteredContract(Quire.Models.BankModel)
        if (bankModel!='0x0000000000000000000000000000000000000000') {
            await quireUpgradable.unRegisterContract(Quire.Models.BankModel, bankModel);
            console.log("Un-registered Contract: BankModel");
        }
    }

    if((args.size==0) || args.has("PaymentAdviceModel")) {
        const paymentAdviceModel = await quireContracts.getRegisteredContract(Quire.Models.PaymentAdviceModel)
        if (paymentAdviceModel!='0x0000000000000000000000000000000000000000') {
            await quireUpgradable.unRegisterContract(Quire.Models.PaymentAdviceModel, paymentAdviceModel);
            console.log("Un-registered Contract: PaymentAdviceModel");
        }
    }

    if((args.size==0) || args.has("BankGuaranteeModel")) {
        const bankGuaranteeModel = await quireContracts.getRegisteredContract(Quire.Models.BankGuaranteeModel)
        if (bankGuaranteeModel!='0x0000000000000000000000000000000000000000') {
            await quireUpgradable.unRegisterContract(Quire.Models.BankGuaranteeModel, bankGuaranteeModel);
            console.log("Un-registered Contract: BankGuaranteeModel");
        }
    }

    if((args.size==0) || args.has("BankGuaranteeReleaseModel")) {
        const bankGuaranteeReleaseModel = await quireContracts.getRegisteredContract(Quire.Models.BankGuaranteeReleaseModel)
        if (bankGuaranteeReleaseModel!='0x0000000000000000000000000000000000000000') {
            await quireUpgradable.unRegisterContract(Quire.Models.BankGuaranteeReleaseModel, bankGuaranteeReleaseModel);
            console.log("Un-registered Contract: BankGuaranteeReleaseModel");
        }
    }

    if((args.size==0) || args.has("BankGuaranteeInvokeModel")) {
        const bankGuaranteeInvokeModel = await quireContracts.getRegisteredContract(Quire.Models.BankGuaranteeInvokeModel)
        if (bankGuaranteeInvokeModel!='0x0000000000000000000000000000000000000000') {
            await quireUpgradable.unRegisterContract(Quire.Models.BankGuaranteeInvokeModel, bankGuaranteeInvokeModel);
            console.log("Un-registered Contract: BankGuaranteeInvokeModel");
        }
    }

    if((args.size==0) || args.has("VcnFunctionalModel")) {
        const vcnFunctionalModel = await quireContracts.getRegisteredContract(Quire.Models.VcnFunctionalModel)
        if (vcnFunctionalModel!='0x0000000000000000000000000000000000000000') {
            await quireUpgradable.unRegisterContract(Quire.Models.VcnFunctionalModel, vcnFunctionalModel);
            console.log("Un-registered Contract: VcnFunctionalModel");
        }
    }
        
    if((args.size==0) || args.has("VendorManager")) {
        const vendorManager = await quireContracts.getRegisteredContract(Quire.Contracts.VendorManager)
        if (vendorManager!='0x0000000000000000000000000000000000000000') {
            await quireUpgradable.unRegisterContract(Quire.Contracts.VendorManager, vendorManager);
            console.log("Un-registered Contract: VendorManager");
        }
    }

    if((args.size==0) || args.has("ProcuringEntityManager")) {
        const procuringEntityManager = await quireContracts.getRegisteredContract(Quire.Contracts.ProcuringEntityManager)
        if (procuringEntityManager!='0x0000000000000000000000000000000000000000') {
            await quireUpgradable.unRegisterContract(Quire.Contracts.ProcuringEntityManager, procuringEntityManager);
            console.log("Un-registered Contract: ProcuringEntityManager");
        }
    }

    if((args.size==0) || args.has("AwardOfContractManager")) {
        const awardOfContractManager = await quireContracts.getRegisteredContract(Quire.Contracts.AwardOfContractManager)
        if (awardOfContractManager!='0x0000000000000000000000000000000000000000') {
            await quireUpgradable.unRegisterContract(Quire.Contracts.AwardOfContractManager, awardOfContractManager);
            console.log("Un-registered Contract: AwardOfContractManager");
        }
    }

    if((args.size==0) || args.has("WorkExperienceManager")) {
        const workExperienceManager = await quireContracts.getRegisteredContract(Quire.Contracts.WorkExperienceManager)
        if (workExperienceManager!='0x0000000000000000000000000000000000000000') {
            await quireUpgradable.unRegisterContract(Quire.Contracts.WorkExperienceManager, workExperienceManager);
            console.log("Un-registered Contract: WorkExperienceManager");
        }
    }

    if((args.size==0) || args.has("BankManager")) {
        const bankManager = await quireContracts.getRegisteredContract(Quire.Contracts.BankManager)
        if (bankManager!='0x0000000000000000000000000000000000000000') {
            await quireUpgradable.unRegisterContract(Quire.Contracts.BankManager, bankManager);
            console.log("Un-registered Contract: BankManager");
        }
    }

    if((args.size==0) || args.has("PaymentAdviceManager")) {
        const paymentAdviceManager = await quireContracts.getRegisteredContract(Quire.Contracts.PaymentAdviceManager)
        if (paymentAdviceManager!='0x0000000000000000000000000000000000000000') {
            await quireUpgradable.unRegisterContract(Quire.Contracts.PaymentAdviceManager, paymentAdviceManager);
            console.log("Un-registered Contract: PaymentAdviceManager");
        }
    }

    if((args.size==0) || args.has("BankGuaranteeManager")) {
        const bankGuaranteeManager = await quireContracts.getRegisteredContract(Quire.Contracts.BankGuaranteeManager)
        if (bankGuaranteeManager!='0x0000000000000000000000000000000000000000') {
            await quireUpgradable.unRegisterContract(Quire.Contracts.BankGuaranteeManager, bankGuaranteeManager);
            console.log("Un-registered Contract: BankGuaranteeManager");
        }
    }

    if((args.size==0) || args.has("BankGuaranteeReleaseManager")) {
        const bankGuaranteeReleaseManager = await quireContracts.getRegisteredContract(Quire.Contracts.BankGuaranteeReleaseManager)
        if (bankGuaranteeReleaseManager!='0x0000000000000000000000000000000000000000') {
            await quireUpgradable.unRegisterContract(Quire.Contracts.BankGuaranteeReleaseManager, bankGuaranteeReleaseManager);
            console.log("Un-registered Contract: BankGuaranteeReleaseManager");
        }
    }

    if((args.size==0) || args.has("VcnFunctionalManager")) {
        const vcnFunctionalManager = await quireContracts.getRegisteredContract(Quire.Contracts.VcnFunctionalManager)
        if (vcnFunctionalManager!='0x0000000000000000000000000000000000000000') {
            await quireUpgradable.unRegisterContract(Quire.Contracts.VcnFunctionalManager, vcnFunctionalManager);
            console.log("Un-registered Contract: VcnFunctionalManager");
        }
    }

    callback();
}