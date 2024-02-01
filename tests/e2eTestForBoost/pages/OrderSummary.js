const helpers = require("../../../helpers/common-actions")
const {waitForLoadState} = require("../../../helpers/common-actions");
const productPageLocators = {
    product: function (productName) {
        return '(//a[@title="' + productName + '"])[2]'
    }
}

const completePurchase = {

    orderSummary: "//div[text()='Order summary']",

    completePurchaseButton:"//span[text()='Complete Purchase']"
}

class OrderSummary {

    async VerifyOrderSummary(){
        const verifyOrderSummary = await helpers.getText(page, completePurchase.orderSummary)
        console.log("Order Summary page ->"+verifyOrderSummary);
        assert.strictEqual(verifyOrderSummary,"Order summary", "Order summary Page is Successful")
    }
    async CompletePurchase(){
        await helpers.clickElement(page, completePurchase.completePurchaseButton)
    }
}

module.exports= {OrderSummary}