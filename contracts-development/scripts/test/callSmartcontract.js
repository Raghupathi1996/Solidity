// const Web3 = require("web3");
// const config = require("../../config.json");
// // const { vendorEventBlocks } = require("../../models/vendorEvent");
// // const QUORUM_URL_WS = process.env.QUORUM_URL_WS || "ws//localhost:23000";
// const QUORUM_URL_WS = "ws://localhost:23000";

// const web3 = new Web3(QUORUM_URL_WS);

// const contracts = config.contracts.vcnFunctionalManager;
// const contract = new web3.eth.Contract(contracts.abi, contracts.address);

// Listen to triggered events for vendorManager contract and save Block Hash, Block Number and Timestamp in database

// const HDWalletProvider = require('@truffle/HDWallet-provider')
// const fs = require('fs');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
// let provider = new HDWalletProvider("0x71750a9f1c57c09893b2ae0cad7ea9a15171919021d05ac4e0c5c9413ebad2dd", "http://localhost:22000");
// const provider = new Web3.providers.HttpProvider(`http://localhost:22000`);

// Create web3.js middleware that signs transactions locally
const localKeyProvider = new HDWalletProvider({
    privateKeys: ["0x71750a9f1c57c09893b2ae0cad7ea9a15171919021d05ac4e0c5c9413ebad2dd"],
  providerOrUrl: "http://localhost:22000",
});
let web3 = new Web3(localKeyProvider);
const config = require("../../config.json");
// const QuireContract = require('./QuireContract');

// const editData = (newData) => {
//     path = './scripts/test/data.json';
//     if(fs.existsSync(path)) {fs.unlinkSync(path)}
//     fs.writeFileSync(path, JSON.stringify(newData));
//     return newData;
// }


const contractInstance = config.contracts.vendorManager;
let contract = new web3.eth.Contract(contractInstance.abi, contractInstance.address);
const setCurrency = async () => {

    await contract.methods.registerVendor("V1", "123", "321", "Raghupathi").call({ from: "0xf9a731e46b2236cf3d8c35a2784e6b1a75598dcc" }, function(error, result){
        console.log(result);
    });
    


    // const data = JSON.parse(fs.readFileSync('./scripts/test/data.json'))
    // try {
    // await contract.methods.setCurrency(currency).send({ from: "0xf9a731e46b2236cf3d8c35a2784e6b1a75598dcc" })
    // } catch (error) {
    //     console.log("ERROR IN TRANSACTION", error)
    // }
}
setCurrency();

