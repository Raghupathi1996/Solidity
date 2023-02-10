const PermissionsUpgradable = artifacts.require('PermissionsUpgradable');

const ContractRegistry = artifacts.require('ContractRegistry');

const MemberHelper = artifacts.require('MemberHelper');
const ListHelper = artifacts.require('ListHelper');
const MapHelper = artifacts.require('MapHelper');

const AccountModel = artifacts.require('AccountModel');
const OrgModel = artifacts.require('OrgModel');
const NodeModel = artifacts.require('NodeModel');
const RoleModel = artifacts.require('RoleModel');
const VoterModel = artifacts.require('VoterModel');

const AccountManager = artifacts.require('AccountManager');
const OrgManager = artifacts.require('OrgManager');
const NodeManager = artifacts.require('NodeManager');
const RoleManager = artifacts.require('RoleManager');
const VoterManager = artifacts.require('VoterManager');

const {Perm} = require("../constants")

module.exports = async function (callback) {
    
    const permissionsUpgradable = await PermissionsUpgradable.deployed();

    const contractRegistry = await ContractRegistry.deployed();
    await permissionsUpgradable.registerContract(Perm.Storage.ContractRegistry, contractRegistry.address);

    const memberHelper = await MemberHelper.deployed();
    const listHelper = await ListHelper.deployed();
    const mapHelper = await MapHelper.deployed();
    await permissionsUpgradable.registerContract(Perm.Storage.MemberHelper, memberHelper.address);
    await permissionsUpgradable.registerContract(Perm.Storage.ListHelper, listHelper.address);
    await permissionsUpgradable.registerContract(Perm.Storage.MapHelper, mapHelper.address);
    
    const accountModel = await AccountModel.deployed();
    const orgModel = await OrgModel.deployed();
    const nodeModel = await NodeModel.deployed();
    const roleModel = await RoleModel.deployed();
    const voterModel = await VoterModel.deployed();
    await permissionsUpgradable.registerContract(Perm.Models.AccountModel, accountModel.address);
    await permissionsUpgradable.registerContract(Perm.Models.OrgModel, orgModel.address);
    await permissionsUpgradable.registerContract(Perm.Models.NodeModel, nodeModel.address);
    await permissionsUpgradable.registerContract(Perm.Models.RoleModel, roleModel.address);
    await permissionsUpgradable.registerContract(Perm.Models.VoterModel, voterModel.address);

    const accountManager = await AccountManager.deployed();
    const orgManager = await OrgManager.deployed();
    const nodeManager = await NodeManager.deployed();
    const roleManager = await RoleManager.deployed();
    const voterManager = await VoterManager.deployed();
    await permissionsUpgradable.registerContract(Perm.Contracts.AccountManager, accountManager.address);
    await permissionsUpgradable.registerContract(Perm.Contracts.OrgManager, orgManager.address);
    await permissionsUpgradable.registerContract(Perm.Contracts.NodeManager, nodeManager.address);
    await permissionsUpgradable.registerContract(Perm.Contracts.RoleManager, roleManager.address);
    await permissionsUpgradable.registerContract(Perm.Contracts.VoterManager, voterManager.address);
    
    callback();
}