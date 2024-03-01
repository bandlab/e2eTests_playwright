const helpers = require("../../../helpers/common-actions")
const {waitForLoadState} = require("../../../helpers/common-actions");

const boostLocators = {
    setPostBoostBudgetText_locator: "//h1[text()='Set Your Post Boost Budget and Period']",
    nextButton_locator:"//button[contains(@class,'ds-button ds-button-primary')]",
}
class BoostPage {
    async verifySetBudgetAndDuration(){
        const budgetText= await helpers.getText(page, boostLocators.setPostBoostBudgetText_locator)
        assert.strictEqual(budgetText, "Set Your Post Boost Budget and Period", "Correct Page displayed")
    }
    async setBudgetAndDuration(){
        await helpers.clickElement(page, boostLocators.nextButton_locator)
    }
}

module.exports= {BoostPage}