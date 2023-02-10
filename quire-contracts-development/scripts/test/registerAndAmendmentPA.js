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


const addingWEx = () => {
    let newData = {
    uidsWx: {
    pa1v1a1:" ",  //first amendment of the Payment advice pa1
    pa1v1a2:" ",
    pa1v1a3:" ",
    pa2v1a1:" ",
    pa2v1a2:" ",
    pa2v1a3:" ",
    bg1pa1v1a1:" ",
    bg1a1pa1v1a1:" ",
    bg1a1pa1v1a2:" ",
    bg1a1pa1v1a3:" ",
    }
}
console.log(newData);
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
    console.log("Start")
    console.log("Creating data fields");
    
    let path = './scripts/test/data.json';
    let newData = addingWEx();
    let existingJson = fs.readFileSync(path);   // read the data from the file in the form of data string 
    let existingObject = JSON.parse(existingJson); // parse it in the form of object 
    existingObject.uids = { ...existingObject.uids, ...newData.uidsWx}; //tring to merge the contents in the field uids in existingObject
                                                                     // and the contents in the fields uidsWxdata object.

    // existingObject = { ...existingObject, ...data}; // tring to merge the contents in the existingObject
                                                       // and the contents in the data object
    console.log("object list after merger", existingObject);
    fullData = JSON.stringify(existingObject);
    editData(fullData);
    console.log("Added data list", fullData);


    // fs.writeFileSync(path,newData);



// PA 1 
console.log("register PA1");
    let pa1V1 = await pa.registerPaymentAdvice({
        "uid":"0x0000000000000000",
        "egpSystemId":`ADMINORG.${data.egp}`, 
        "paymentType":1, 
        "paymentAdviceReferenceNumber":"PA03", 
        "validityPeriodDays":300,
        "bankGuaranteeClaimExpiryDate": "5672114931", 
        "currency":"INR", 
        "bankGuaranteeAmount":9000,
        "vendorGid":data.gids.ven1Gid, 
        "vendorName":"Meghana",
        "procuringEntityGid":data.gids.peGid, 
        "procuringEntityName":"Fire Department", 
        "amendment":0,
        "formStatus":1,
        version:1}, {from: data.keys.egp.address});
        // .then(receipt => {console.log("HI"); console.log(receipt.events); console.log(receipt.events)}).catch(error => {console.log(error)});
    console.log("receipt of PA1",pa1V1);
    console.log("logs of PA1",pa1V1.logs[0]);
    pa1V1 = pa1V1.logs[0].args._paUid;
    data.uids.pa1V1 = pa1V1;
//PA2

console.log("register PA2");
    let pa2V1 = await pa.registerPaymentAdvice({
        "uid":"0x0000000000000000",
        "egpSystemId":`ADMINORG.${data.egp}`, 
        "paymentType":1, 
        "paymentAdviceReferenceNumber":"PA04", 
        "validityPeriodDays":100,
        "bankGuaranteeClaimExpiryDate": "1234514931", 
        "currency":"INR", 
        "bankGuaranteeAmount":100000,
        "vendorGid":data.gids.ven1Gid, 
        "vendorName":"Raghu",
        "procuringEntityGid":data.gids.peGid, 
        "procuringEntityName":"Food Department", 
        "amendment":"",
        "formStatus":"",
        version:1}, {from: data.keys.egp.address});
        // .then(receipt => {console.log("HI"); console.log(receipt.events); console.log(receipt.events)}).catch(error => {console.log(error)});
    console.log("receipt of PA2",pa2V1);
    console.log("logs of PA2",pa2V1.logs[0]);
    pa2V1 = pa2V1.logs[0].args._paUid;
    data.uids.pa2V1 = pa2V1;
    // console.log(JSON.stringify(pa1V1.logs[0].args._paAmendment));


    editData(data);

//first amendment of the PA1
console.log("first Amendment of PA1");
    let pa1v1a1 = await pa.amendedPaymentAdvice({
        "uid":"0x0000000000000000",
        "egpSystemId":`ADMINORG.${data.egp}`, 
        "paymentType":1, 
        "paymentAdviceReferenceNumber":"PA03", 
        "validityPeriodDays":400,
        "bankGuaranteeClaimExpiryDate": "5672114931", 
        "currency":"INR", 
        "bankGuaranteeAmount":9500,
        "vendorGid":data.gids.ven1Gid, 
        "vendorName":"Meghana's BF",
        "procuringEntityGid":data.gids.peGid, 
        "procuringEntityName":"Fire Department", 
        "amendment":0,
        "formStatus":1,
        version:1}, {from: data.keys.egp.address});
        // .then(receipt => {console.log("HI"); console.log(receipt.events); console.log(receipt.events)}).catch(error => {console.log(error)});
    console.log("receipt of PA1 amendment 1",pa1v1a1);
    console.log("logs of PA1 amendment 1",pa1v1a1.logs[0]);
    pa1v1a1 = pa1v1a1.logs[0].args._paUid;
    data.uids.pa1v1a1 = pa1v1a1;


// Second amendment of the PA1
console.log("Second Amendment of PA1");

    let pa1v1a2 = await pa.amendedPaymentAdvice({
        "uid":"0x0000000000000000",
        "egpSystemId":`ADMINORG.${data.egp}`, 
        "paymentType":1, 
        "paymentAdviceReferenceNumber":"PA03", 
        "validityPeriodDays":450,
        "bankGuaranteeClaimExpiryDate": "5672114931", 
        "currency":"INR", 
        "bankGuaranteeAmount":1200,
        "vendorGid":data.gids.ven1Gid, 
        "vendorName":"Meghana's break up",
        "procuringEntityGid":data.gids.peGid, 
        "procuringEntityName":"Department", 
        "amendment":"",
        "formStatus":1,
        version:1}, {from: data.keys.egp.address});
        // .then(receipt => {console.log("HI"); console.log(receipt.events); console.log(receipt.events)}).catch(error => {console.log(error)});
    console.log("receipt of PA1 amendment 3",pa1v1a2);
    console.log("logs of PA1 amendment 3",pa1v1a2.logs[0]);
    pa1v1a2 = pa1v1a2.logs[0].args._paUid;
    data.uids.pa1v1a2 = pa1v1a2;
    


//first amendment of the PA2
console.log("first Amendment of PA2");

    let pa2v1a1 = await pa.amendedPaymentAdvice({
        "uid":"0x0000000000000000",
        "egpSystemId":`ADMINORG.${data.egp}`, 
        "paymentType":1, 
        "paymentAdviceReferenceNumber":"PA04", 
        "validityPeriodDays":110,
        "bankGuaranteeClaimExpiryDate": "1234514931", 
        "currency":"INR", 
        "bankGuaranteeAmount":100200,
        "vendorGid":data.gids.ven1Gid, 
        "vendorName":"Raghupathi",
        "procuringEntityGid":data.gids.peGid, 
        "procuringEntityName":"Food Department", 
        "amendment":"",
        "formStatus":"",
        version:1}, {from: data.keys.egp.address});
        // .then(receipt => {console.log("HI"); console.log(receipt.events); console.log(receipt.events)}).catch(error => {console.log(error)});
    console.log("receipt of PA2 amendment 1",pa2v1a1);
    console.log("logs of PA2 amendment 1",pa2v1a1.logs[0]);
    pa2v1a1 = pa2v1a1.logs[0].args._paUid;
    data.uids.pa2v1a1 = pa2v1a1;


//Second amendment of the PA1
console.log("second Amendment of PA2");

    let pa2v1a2 = await pa.amendedPaymentAdvice({
        "uid":"0x0000000000000000",
        "egpSystemId":`ADMINORG.${data.egp}`, 
        "paymentType":0, 
        "paymentAdviceReferenceNumber":"PA04", 
        "validityPeriodDays":115,
        "bankGuaranteeClaimExpiryDate": "1234514931", 
        "currency":"INR", 
        "bankGuaranteeAmount":120000,
        "vendorGid":data.gids.ven1Gid, 
        "vendorName":"Raghupathi",
        "procuringEntityGid":data.gids.peGid, 
        "procuringEntityName":"Food Department of India", 
        "amendment":"",
        "formStatus":"",
        version:1}, {from: data.keys.egp.address});
        // .then(receipt => {console.log("HI"); console.log(receipt.events); console.log(receipt.events)}).catch(error => {console.log(error)});
    console.log("receipt of PA2 amendment 1",pa2v1a2);
    console.log("receipt of PA2 amendment 2",pa2v1a2.logs[0]);
    pa2v1a2 = pa2v1a2.logs[0].args._paUid;
    data.uids.pa2v1a2 = pa2v1a2;


// // Third amendment of the PA1
// console.log("Third Amendment of PA1");

//     let pa1v1a3 = await pa.amendedPaymentAdvice({
//         "uid":"0x0000000000000000",
//         "egpSystemId":`ADMINORG.${data.egp}`, 
//         "paymentType":1, 
//         "paymentAdviceReferenceNumber":"PA04", 
//         "validityPeriodDays":450,
//         "bankGuaranteeClaimExpiryDate": "5672114931", 
//         "currency":"INR", 
//         "bankGuaranteeAmount":122207,
//         "vendorGid":data.gids.ven1Gid, 
//         "vendorName":"Meghana",
//         "procuringEntityGid":data.gids.peGid, 
//         "procuringEntityName":"Department", 
//         "amendment":"",
//         "formStatus":1,
//         version:1}, {from: data.keys.egp.address});
//         // .then(receipt => {console.log("HI"); console.log(receipt.events); console.log(receipt.events)}).catch(error => {console.log(error)});
//     console.log("receipt of PA1 amendment 3",pa1v1a3);
//     console.log("logs of PA1 amendment 3",pa1v1a3.logs[0]);
//     pa1v1a3 = pa1v1a3.logs[0].args._paUid;
//     data.uids.v = pa1v1a3;


    editData(data);
    
    callback();
};
// gitignore test

