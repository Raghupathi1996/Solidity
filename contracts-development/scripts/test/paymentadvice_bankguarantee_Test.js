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

    let bgmVGid = await bg.getBankGuaranteesByPaymentAdviceRefAndEgpId("PA01",`ADMINORG.${data.egp}`, 10, 10)
    console.log(JSON.stringify(bgmVGid));
    // console.log(JSON.stringify(bgmVGid.logs[0].args));
    // console.log(JSON.stringify(bgmVGid.logs[0].event));
    // console.log(bgmVGid);

    // let bgmPGid = await bg.getBankGuaranteeListByVendorAndBankGid(data.gids.ven1Gid, data.gids.bank1Gid, 5, 5)
    // console.log(JSON.stringify(bgmPGid));

    // let prevIndex = await pamodel.getPreviousIndex("PA1",`ADMINORG.${data.egp}`);
    // console.log(JSON.stringify(prevIndex));

    // let venGid = await pamodel.getPaymentAdviceIndex(data.uids.pa2V1);//data.uids.pa2V1);
    // console.log(JSON.stringify(venGid));

    // let len = await pa.getPaymentAdviceIndexListLengthByPaymentAdviceAndEgpIdMa("PA1",`ADMINORG.${data.egp}`);
    // console.log(JSON.stringify(len));

    // let IndexList = await pa.getPaymentAdviceIndexListLengthByPaymentAdviceAndEgpIdMan("PA1",`ADMINORG.${data.egp}`,5,5);
    // console.log(JSON.stringify(IndexList));



    // let pamUid = await pa._generateUID({
    //         "uid":"0x0000000000000000",
    //         "egpSystemId":`ADMINORG.${data.egp}`, 
    //         "paymentType":1, 
    //         "paymentAdviceReferenceNumber":"PA1", 
    //         "validityPeriodDays":369000000,
    //         "bankGuaranteeClaimExpiryDate": "1662811114931", 
    //         "currency":"INR", 
    //         "bankGuaranteeAmount":80000022,
    //         "vendorGid":data.gids.ven2Gid, 
    //         "vendorName":"Raghu",
    //         "procuringEntityGid":data.gids.peGid, 
    //         "procuringEntityName":"Department", 
    //         "amendment":0,
    //         "formStatus":1,
    //         version:1});
    // console.log(JSON.stringify(pamUid));

    // let palength = await pamodel.getPaymentAdviceListLength();
    // console.log(JSON.stringify(palength));

    // let paIndex = [];
    // let include;
    // let length;
    // paIndex = await pa.getPaymentAdviceListByPaymentAdviceRefAndEgpId("PA1",`ADMINORG.${data.egp}`, 5, 2);
    // console.log(paIndex[0]);
    // console.log(include);
    // console.log(length);


    // console.log("start");

    // let bg1bank1pa1V1 = 
    // await bg.publishBankGuarantee({
    //     "uid":"0x00000000", 
    //     "bankGid": data.gids.bank1Gid,
    //     "paymentAdviceNumber": "PA02",
    //     "paymentAdviceUid": data.uids.pa2V1,
    //     "referenceNumber":"BG02",
    //     "branchName": "test_branchName", 
    //     "bankRepresentativeName":data.bank1, 
    //     "issuanceDate": 1662814931,
    //     "validityPeriod": 10, 
    //     "claimExpiryDate": 1662814931, 
    //     "validFrom": 1662814931, 
    //     "validTill": 1662814931, 
    //     "currency":"INR", 
    //     "amount": 100000, 
    //     "beneficiaryName": "Food Department", 
    //     "fileHash": "test_fileHash", 
    //     "bankEncryptedKey":"",
    //     "egpEncryptedKey":"",
    //     "vendorEncryptedKey":"",
    //     "formStatus":1,
    //     "amendment":0,
    //     version:1}, {from: data.keys.bank1.address}
    // )

    // console.log(bg1bank1pa1V1);
    // console.log(bg1bank1pa1V1.logs[0]);
    // bg1bank1pa1V1 = bg1bank1pa1V1.logs[0].args._bgUid;
    // data.uids.bg1bank1pa1V1 = bg1bank1pa1V1;
    // editData(data);

        // .then(receipt => {console.log("HI"); console.log(receipt.events); console.log(receipt.events)}).catch(error => {console.log(error)});

    // console.log("3");

    // let bg1bank2pa1V1 = await bg.publishBankGuarantee({
    //     "uid":"0x00000000", 
    //     "bankGid": data.gids.bank2Gid, 
    //     "paymentAdviceNumber": "test_paymentAdviceReferenceNumber4",
    //     "paymentAdviceUid": data.uids.pa2V1,
    //     "referenceNumber":"test_referenceNumberB2",
    //     "branchName": "test_branchName2", 
    //     "bankRepresentativeName":data.bank2, 
    //     "issuanceDate": 1662814931,
    //     "validityPeriod": 10, 
    //     "claimExpiryDate": 1662814931, 
    //     "validFrom": 1662814931, 
    //     "validTill": 1662814931, 
    //     "currency":"INR", 
    //     "amount": 800000, 
    //     "beneficiaryName": "test_beneficiaryName2", 
    //     "fileHash": "test_fileHash2", 
    //     "bankEncryptedKey":"",
    //     "egpEncryptedKey":"",
    //     "vendorEncryptedKey":"",
    //     "amendment":0, 
    //     version:""}, {from: data.keys.bank2.address}); 

    // console.log(bg1bank2pa1V1);
    // console.log(bg1bank2pa1V1.logs[0]);
    // data.uids.bg1bank2pa1V1 = bg1bank2pa1V1.logs[0].args._uid;
    
    // editData(data);

    // await paymentAdviceManager.registerPaymentAdvice({uid:"0x00000000",egpSystemId:"ADMINORG.EGP_a8af",paymentType:0,paymentAdviceReferenceNumber:"xx",validityPeriodDays:0,bankGuaranteeClaimExpiryDate:"0x00000000000000000000000000000000000000000000000000000000000000ff",bankGuaranteeAmount:"0x00000000000000000000000000000000000000000000000000000000000000ff",vendorGid:"1UVKHLI9",vendorName:"",procuringEntityGid:"6FNPS45A",procuringEntityName:"",amendment:0,version:0})
    // await bankGuaranteeReleaseManager.publishBankGuaranteeRelease({uid:'0x00000000',bankGuaranteeUid:'0xf69d7d74d43b8a1d',paymentReference:'test_payment_reference',procuringEntityGid:'6FNPS45A',egpSystemId:'ADMINORG.EGP_a8af',vendorGid:'1UVKHLI9',bankGid:'MMNR83HM',branchName:'',releaseDate:'255',amountReleased:'4',bgReleaseFileHash:'',version:''})
    // await bankGuaranteeReleaseManager.publishBankGuaranteeInvoke({uid:'0x00000000',bankGuaranteeUid:'0xf69d7d74d43b8a1d',paymentReference:'test_paymecdccddnt_reference',procuringEntityGid:'6FNPS45A',egpSystemId:'ADMINORG.EGP_a8af',vendorGid:'1UVKHLI9',bankGid:'MMNR83HM',branchName:'',revocationDate:255,revocationAmount:1,beneficiaryName:"",beneficiaryBankAccountNumber:"",beneficiaryBankName:"",beneficiaryBranchName:"",beneficiaryIfscCode:"",bgInvokeFileHash:'ccddcscds',version:''})

    callback();
};
// gitignore test

