const QuireUpgradable = artifacts.require('QuireUpgradable');
const QuireStorage = artifacts.require('QuireStorage');
const QuireContracts = artifacts.require('QuireContracts');

module.exports = async function (callback) {

    const quireUpgradable = await QuireUpgradable.deployed();
    const quireStorage = await QuireStorage.deployed();
    const quireContracts = await QuireContracts.deployed();
    await quireUpgradable.init(quireContracts.address, quireStorage.address);

    callback();

}