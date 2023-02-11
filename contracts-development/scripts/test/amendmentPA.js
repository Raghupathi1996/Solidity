const fs = require('fs')
const HDWalletProvider = require('@truffle/hdwallet-provider');

const ProcuringEntityManager = artifacts.require('ProcuringEntityManager');
const AwardOfContractManager = artifacts.require('AwardOfContractManager');
const VendorManager = artifacts.require('VendorManager');
const WorkExperienceManager = artifacts.require('WorkExperienceManager');
const PaymentAdviceManager = artifacts.require('PaymentAdviceManager');
const PaymentAdviceModel = artifacts.require('PaymentAdviceModel');
const BankGuaranteeManager = artifacts.require('BankGuaranteeManager');
const BankGuaranteeModel = artifacts.require('BankGuaranteeModel');


const editData = (newData) => {
    path = './scripts/test/data.json';
    if(fs.existsSync(path)) {fs.unlinkSync(path)}
    fs.writeFileSync(path, JSON.stringify(newData));
    return newData;
}

module.exports = async function (callback) {
    
    const data = JSON.parse(fs.readFileSync('./scripts/test/data.json'));

    const provider = new HDWalletProvider({
      privateKeys: [data.keys.admin.privateKey, data.keys.egp.privateKey, data.keys.vendor1.privateKey, data.keys.vendor2.privateKey, data.keys.bank1.privateKey,  data.keys.bank2.privateKey],
      providerOrUrl: "http://127.0.0.1:22000/",
      chainId: 10
    });

    ProcuringEntityManager.setProvider(provider);
    AwardOfContractManager.setProvider(provider);
    VendorManager.setProvider(provider);
    WorkExperienceManager.setProvider(provider);
    PaymentAdviceManager.setProvider(provider);
    PaymentAdviceModel.setProvider(provider);
    BankGuaranteeManager.setProvider(provider);
    BankGuaranteeModel.setProvider(provider);

    let procm = await ProcuringEntityManager.deployed();
    let aocm = await AwardOfContractManager.deployed();
    let venm = await VendorManager.deployed();
    let wxm = await WorkExperienceManager.deployed();
    let pa = await PaymentAdviceManager.deployed();
    let pamodel = await PaymentAdviceModel.deployed();
    let bg = await BankGuaranteeManager.deployed();
    let bgmodel = await BankGuaranteeModel.deployed();


    // let gidProc = await procm.registerProcuringEntity("test_name" + Math.random().toString(),"test_externalId" + Math.random().toString(),`ADMINORG.${data.egp}`, {from: data.keys.egp.address});
    // console.log(gidProc);
    // data.gids.peGid = gidProc.logs[0].args._gid;
    // console.log(data.gids);
    // console.log("Registered Procuring Entity with GID: " + data.gids.peGid + "\n")
    console.log("Start")

    // // let bgmUid = await bgmodel.getBankGuaranteeUid(0)
    // // console.log(JSON.stringify(bgmUid));
    // // console.log("step1");
    // // let id = await pamodel.getPaymentAdviceListLength();
    // // console.log(JSON.stringify(id));
    // // console.log("step2");
    // // let PAprev = await pamodel.generatePaymentAdvice({
    // //     "uid":"0x0000000000000000",
    // //     "egpSystemId":`ADMINORG.${data.egp}`, 
    // //     "paymentType":1, 
    // //     "paymentAdviceReferenceNumber":"PA1", 
    // //     "validityPeriodDays":369000000,
    // //     "bankGuaranteeClaimExpiryDate": "1662811114931", 
    // //     "currency":"INR", 
    // //     "bankGuaranteeAmount":80000022,
    // //     "vendorGid":data.gids.ven2Gid, 
    // //     "vendorName":"Raghu",
    // //     "procuringEntityGid":data.gids.peGid, 
    // //     "procuringEntityName":"Department", 
    // //     "amendment":0,
    // //     "formStatus":1,
    // //     version:1});
    // // console.log(PAprev);
    // // console.log("step3");
    // // let uid = await pa._generateUID(PAprev[0]);
    // // console.log(uid);
    // // console.log("step4");
    // // let check = await pamodel.getPaymentAdviceIndex(uid);
    // // console.log(JSON.stringify(check));
    // // console.log(PAprev[0][0]);
    // // console.log("step5");
    // // PAprev[0][0] = uid;
    // // console.log("step6");
    // // await pamodel.setPaymentAdviceIndex(uid,1+id);
    // // console.log("step7");
    // // let _indexModel = await pamodel.getPaymentAdviceIndex(uid);
    // // console.log(JSON.stringify(_indexModel));
    // // await pa.addPaymentAdviceIndexListByPaymentAdviceAndEgpIdMan("PA1",`ADMINORG.${data.egp}`,id);
    // // console.log("step8");
    // // await pamodel.incPaymentAdviceListLength();
    // // let _leng = await pamodel.getPaymentAdviceListLength();
    // // console.log(JSON.stringify(_leng));
    // console.log("step9");
    // // console.log(JSON.stringify(PAprev[1]));
    // let __len = await pamodel.getPaymentAdviceListLength();
    // console.log(JSON.stringify(__len));
    // await pamodel.updatePreviousPAtoOutdated(PAprev[1]);
    // let status = await pamodel.getPaymentAdviceFormStatus(PAprev[1]);
    // console.log(JSON.stringify(status));
    // // console.log("step10");
    // // await pamodel.addPaymentAdvice(id, PAprev[0]);
    // // let PAamend = await pa.getPaymentAdvice(uid);
    // // console.log(PAamend);
    // let amount = await pamodel.getPaymentAdviceBankGuaranteeAmount(0);
    // console.log(amount);

    let _paymentAdvice = await pa.getPaymentAdvice(data.uids.pa2V1);
    console.log(_paymentAdvice);
    


    callback();
};
// gitignore test

