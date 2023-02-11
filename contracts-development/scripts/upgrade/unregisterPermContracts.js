const PermissionsUpgradable = artifacts.require('PermissionsUpgradable');
const ContractRegistry = artifacts.require('ContractRegistry');

const {Perm} = require("../constants")

module.exports = async function (callback) {
    const permissionsUpgradable = await PermissionsUpgradable.deployed();
    const contractRegistry = await ContractRegistry.deployed();

    const memberHelper = await contractRegistry.getRegisteredContract(Perm.Storage.MemberHelper);
    const listHelper = await contractRegistry.getRegisteredContract(Perm.Storage.ListHelper);
    const mapHelper = await contractRegistry.getRegisteredContract(Perm.Storage.MapHelper);
    await permissionsUpgradable.unRegisterContract(Perm.Storage.MemberHelper, memberHelper);
    await permissionsUpgradable.unRegisterContract(Perm.Storage.ListHelper, listHelper);
    await permissionsUpgradable.unRegisterContract(Perm.Storage.MapHelper, mapHelper);
    
    const accountModel = await contractRegistry.getRegisteredContract(Perm.Models.AccountModel);
    const orgModel = await contractRegistry.getRegisteredContract(Perm.Models.OrgModel);
    const nodeModel = await contractRegistry.getRegisteredContract(Perm.Models.NodeModel);
    const roleModel = await contractRegistry.getRegisteredContract(Perm.Models.RoleModel);
    const voterModel = await contractRegistry.getRegisteredContract(Perm.Models.VoterModel);
    await permissionsUpgradable.unRegisterContract(Perm.Models.AccountModel, accountModel);
    await permissionsUpgradable.unRegisterContract(Perm.Models.OrgModel, orgModel);
    await permissionsUpgradable.unRegisterContract(Perm.Models.NodeModel, nodeModel);
    await permissionsUpgradable.unRegisterContract(Perm.Models.RoleModel, roleModel);
    await permissionsUpgradable.unRegisterContract(Perm.Models.VoterModel, voterModel);

    const accountManager = await contractRegistry.getRegisteredContract(Perm.Contracts.AccountManager);
    const orgManager = await contractRegistry.getRegisteredContract(Perm.Contracts.OrgManager);
    const nodeManager = await contractRegistry.getRegisteredContract(Perm.Contracts.NodeManager);
    const roleManager = await contractRegistry.getRegisteredContract(Perm.Contracts.RoleManager);
    const voterManager = await contractRegistry.getRegisteredContract(Perm.Contracts.VoterManager);
    await permissionsUpgradable.unRegisterContract(Perm.Contracts.AccountManager, accountManager);
    await permissionsUpgradable.unRegisterContract(Perm.Contracts.OrgManager, orgManager);
    await permissionsUpgradable.unRegisterContract(Perm.Contracts.NodeManager, nodeManager);
    await permissionsUpgradable.unRegisterContract(Perm.Contracts.RoleManager, roleManager);
    await permissionsUpgradable.unRegisterContract(Perm.Contracts.VoterManager, voterManager);
        
    callback();
}