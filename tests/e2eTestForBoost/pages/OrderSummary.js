const helpers = require("../../../helpers/common-actions")

const completePurchase= {
    orderSummary_locator: "//div[text()='Order summary']",
    completePurchaseButton_locator:"//span[text()='Complete Purchase']"
}
class OrderSummary {
    async verifyOrderSummary(){
        const verifyOrderSummary = await helpers.getText(page, completePurchase.orderSummary_locator)
        console.log("Order Summary page ->"+verifyOrderSummary);
        assert.strictEqual(verifyOrderSummary,"Order summary", "Order summary Page is Successful")
    }
    async completePurchase(){
        await helpers.clickElement(page, completePurchase.completePurchaseButton_locator)
    }
}

module.exports= { OrderSummary }