const expect = require('chai').expect
const vendorsGid = require('../scripts/test/admin_add_egp_vendors_bank_copy');
const data = require('../scripts/test/data_copy.json');
describe('Suite 1', () => {
    it("Adding VendorsGid", () => {
        console.log("vendorList");
        let vendorList = vendorsGid();
        console.log(vendorList);
        expect(vendorList).to.be.jsonObj(jsonObj);
    });
});