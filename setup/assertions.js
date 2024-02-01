(async () => {
    const chai = await import('chai');
    global.expect = chai.expect;
    global.assert = chai.assert;
    global.should = chai.should;
})();
const expectPw = require("@playwright/test")

global.pwExpect = expectPw.expect

