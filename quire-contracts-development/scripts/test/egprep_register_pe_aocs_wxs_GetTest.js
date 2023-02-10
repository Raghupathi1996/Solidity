const fs = require('fs')
const HDWalletProvider = require('@truffle/hdwallet-provider');

const ProcuringEntityManager = artifacts.require('ProcuringEntityManager');
const AwardOfContractManager = artifacts.require('AwardOfContractManager');
const VendorManager = artifacts.require('VendorManager');
const WorkExperienceManager = artifacts.require('WorkExperienceManager');

module.exports = async function (callback) {
  console.log("1");
    
    const data = JSON.parse(fs.readFileSync('./scripts/test/data_copy.json'));
    console.log("2");

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
    console.log("3");

    ProcuringEntityManager.setProvider(provider);
    AwardOfContractManager.setProvider(provider);
    VendorManager.setProvider(provider);
    WorkExperienceManager.setProvider(provider);

    let procm = await ProcuringEntityManager.deployed();
    let aocm = await AwardOfContractManager.deployed()
    let venm = await VendorManager.deployed()
    let wxm = await WorkExperienceManager.deployed()


    let aoc1v1 = await aocm.getAllAoc(30,10);
    console.log("test\n", aoc1v1);

    callback();
};