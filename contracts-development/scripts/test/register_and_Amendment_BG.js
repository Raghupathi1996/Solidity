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
    path = './scripts/test/data_copy.json';
    if(fs.existsSync(path)) {fs.unlinkSync(path)}
    fs.writeFileSync(path, JSON.stringify(newData));
    return newData;
}

module.exports = async function (callback) {
    
    const data = JSON.parse(fs.readFileSync('./scripts/test/data_copy.json'));

    const provider = new HDWalletProvider({
        privateKeys: [data.keys.admin.privateKey, 
          data.keys.egpKeys.egp_1.privateKey,
          data.keys.egpKeys.egp_2.privateKey,
          data.keys.bankKeys.bank1.privateKey, 
          data.keys.bankKeys.bank2.privateKey, 
          data.vdrKeys.vendor1.privateKey, 
          data.vdrKeys.vendor2.privateKey, 
          data.vdrKeys.vendor3.privateKey, 
          data.vdrKeys.vendor4.privateKey, 
          data.vdrKeys.vendor5.privateKey, 
          data.vdrKeys.vendor6.privateKey, 
          data.vdrKeys.vendor7.privateKey, 
          data.vdrKeys.vendor8.privateKey, 
          data.vdrKeys.vendor9.privateKey, 
          data.vdrKeys.vendor10.privateKey],
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

    console.log("start");

    let bg1bank1pa1V1 = 
    await bg.publishBankGuarantee({
        "uid":"0x00000000", 
        "bankGid": data.gids.bank1Gid,
        "paymentAdviceNumber": "PA1",
        "paymentAdviceUid": data.uids.pa1V1,
        "referenceNumber":"BG22",
        "branchName": "test_branchName", 
        "bankRepresentativeName":data.bank.bank1, 
        "issuanceDate": 1662814931,
        "validityPeriod": 10, 
        "claimExpiryDate": 1662814931, 
        "validFrom": 1662814931, 
        "validTill": 1662814931, 
        "currency":"INR", 
        "amount": 80000033, 
        "beneficiaryName": "Food Department", 
        "fileHash": "test_fileHash", 
        "bankEncryptedKey":"",
        "egpEncryptedKey":"",
        "vendorEncryptedKey":"",
        "formStatus":1,
        "amendment":0,
        version:1}, {from: data.keys.bankKeys.bank1.address}
    )

    console.log(bg1bank1pa1V1);
    console.log(bg1bank1pa1V1.logs[0]);
    bg1bank1pa1V1 = bg1bank1pa1V1.logs[0].args._bgUid;
    data.uids.bg1bank1pa1V1 = bg1bank1pa1V1;
    editData(data);

    // let bgRelease = await bg.setBgReleaseStatusPaUid(data.gids.bank1Gid,data.uids.bg1bank1pa1V1);
    // console.log(bgRelease);

        // .then(receipt => {console.log("HI"); console.log(receipt.events); console.log(receipt.events)}).catch(error => {console.log(error)});

    // console.log("3");

    // let bg1bank2pa1V1 = await bg.amendedBankGuarantee({
    //     "uid":"0x00000000", 
    //     "bankGid": data.gids.bank1Gid,
    //     "paymentAdviceNumber": "PA01",
    //     "paymentAdviceUid": "0x968bfcb0e3713572",
    //     "referenceNumber":"BG13",
    //     "branchName": "test_branchName", 
    //     "bankRepresentativeName":data.bank1, 
    //     "issuanceDate": 1662814931,
    //     "validityPeriod": 10, 
    //     "claimExpiryDate": 1662814931, 
    //     "validFrom": 1662814931, 
    //     "validTill": 1662814931, 
    //     "currency":"INR", 
    //     "amount": 1222070, 
    //     "beneficiaryName": "Food Department", 
    //     "fileHash": "test_fileHash", 
    //     "bankEncryptedKey":"",
    //     "egpEncryptedKey":"",
    //     "vendorEncryptedKey":"",
    //     "formStatus":1,
    //     "amendment":0, 
    //     version:""}, {from: data.keys.bank1.address}); 

    // console.log(bg1bank2pa1V1);
    // console.log(bg1bank2pa1V1.logs[0]);
    // data.uids.bg1bank2pa1V1 = bg1bank2pa1V1.logs[0].args._uid;
    
    editData(data);

    // await paymentAdviceManager.registerPaymentAdvice({uid:"0x00000000",egpSystemId:"ADMINORG.EGP_a8af",paymentType:0,paymentAdviceReferenceNumber:"xx",validityPeriodDays:0,bankGuaranteeClaimExpiryDate:"0x00000000000000000000000000000000000000000000000000000000000000ff",bankGuaranteeAmount:"0x00000000000000000000000000000000000000000000000000000000000000ff",vendorGid:"1UVKHLI9",vendorName:"",procuringEntityGid:"6FNPS45A",procuringEntityName:"",amendment:0,version:0})
    // await bankGuaranteeReleaseManager.publishBankGuaranteeRelease({uid:'0x00000000',bankGuaranteeUid:'0xf69d7d74d43b8a1d',paymentReference:'test_payment_reference',procuringEntityGid:'6FNPS45A',egpSystemId:'ADMINORG.EGP_a8af',vendorGid:'1UVKHLI9',bankGid:'MMNR83HM',branchName:'',releaseDate:'255',amountReleased:'4',bgReleaseFileHash:'',version:''})
    // await bankGuaranteeReleaseManager.publishBankGuaranteeInvoke({uid:'0x00000000',bankGuaranteeUid:'0xf69d7d74d43b8a1d',paymentReference:'test_paymecdccddnt_reference',procuringEntityGid:'6FNPS45A',egpSystemId:'ADMINORG.EGP_a8af',vendorGid:'1UVKHLI9',bankGid:'MMNR83HM',branchName:'',revocationDate:255,revocationAmount:1,beneficiaryName:"",beneficiaryBankAccountNumber:"",beneficiaryBankName:"",beneficiaryBranchName:"",beneficiaryIfscCode:"",bgInvokeFileHash:'ccddcscds',version:''})

    callback();
};
// gitignore test

