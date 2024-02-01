const helpers = require("../../../helpers/common-actions")
const {waitForLoadState} = require("../../../helpers/common-actions");
const productPageLocators = {
    product: function (productName) {
        return '(//a[@title="' + productName + '"])[2]'
    }
}

const boostLocators = {

     setPostBoostBudgetText: "//h1[text()='Set Your Post Boost Budget and Period']",

    nextButton:"//button[contains(@class,'ds-button ds-button-primary')]",
}
class BoostPage {
    async VerifySetBudgetAndDuration(){
        const budgetText= await helpers.getText(page, boostLocators.setPostBoostBudgetText)
        console.log("budget Text -> "+budgetText);
        assert.strictEqual(budgetText, "Set Your Post Boost Budget and Period", "Correct Page displayed")
    }
    async setBudgetAndDuration(){
        await helpers.clickElement(page, boostLocators.nextButton)
    }
}

module.exports= {BoostPage}