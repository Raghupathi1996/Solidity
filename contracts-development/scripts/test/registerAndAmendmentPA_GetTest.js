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
    console.log("Start");


// //PA 1 
// console.log("PA1");
//     let pa1V1 = await pa.getPaymentAdvice(data.uids.pa1V1);
//         // .then(receipt => {console.log("HI"); console.log(receipt.events); console.log(receipt.events)}).catch(error => {console.log(error)});
//     console.log("receipt of PA1",pa1V1);
// //PA2

// console.log("PA2");
//     let pa2V1 = await pa.getPaymentAdvice(data.uids.pa2V1);
//         // .then(receipt => {console.log("HI"); console.log(receipt.events); console.log(receipt.events)}).catch(error => {console.log(error)});
//     console.log("receipt of PA2",pa2V1);

// //first amendment of the PA1
// console.log("first Amendment of PA1");
//     let pa1v1a1 = await pa.getPaymentAdvice(data.uids.pa1v1a1);
//         // .then(receipt => {console.log("HI"); console.log(receipt.events); console.log(receipt.events)}).catch(error => {console.log(error)});
//     console.log("receipt of PA1 amendment 1",pa1v1a1);

// //Second amendment of the PA1
// console.log("second Amendment of PA1");

//     let pa1v1a2 = await pa.getPaymentAdvice(data.uids.pa1v1a2);
//         // .then(receipt => {console.log("HI"); console.log(receipt.events); console.log(receipt.events)}).catch(error => {console.log(error)});
//     console.log("receipt of PA1 amendment 2",pa1v1a2);

// //first amendment of the PA2
// console.log("first Amendment of PA2");

//     let pa2v1a1 = await pa.getPaymentAdvice(data.uids.pa2v1a1);
//         // .then(receipt => {console.log("HI"); console.log(receipt.events); console.log(receipt.events)}).catch(error => {console.log(error)});
//     console.log("receipt of PA2 amendment 1",pa2v1a1);

// //Second amendment of the PA1
// console.log("second Amendment of PA2");

//     let pa2v1a2 = await pa.getPaymentAdvice(data.uids.pa2v1a2);
//         // .then(receipt => {console.log("HI"); console.log(receipt.events); console.log(receipt.events)}).catch(error => {console.log(error)});
//     console.log("receipt of PA2 amendment 1",pa2v1a2);

console.log("PA1");
    let pa1V1Gid = await pa.getLatestPaByReferenceNumber("PA01");
        // .then(receipt => {console.log("HI"); console.log(receipt.events); console.log(receipt.events)}).catch(error => {console.log(error)});
    console.log("receipt of PA1",JSON.stringify(pa1V1Gid));
    console.log("receipt of PA1",pa1V1Gid);



    
    callback();
};
// gitignore test

