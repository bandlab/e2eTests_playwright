const helpers = require("../../../helpers/common-actions")
const context = require('../../../context/context');

const campaignDashboardLocators = {
    campaignDashboardButton_locator: "//button[contains(@class,'ds-button ds-button-primary')]",
    firstCampaignInDashboard_locator: "(//span[@class='text-wrap'])[1]",
    boostCampaignFilter_locator: "(//a[@class='side-nav-item ng-scope'])[1]",
    campaignState_locator: "(//span[text()='In Review'])[1]"
}
class campaignDashboard {
    async campaignDashBoardButton(){
        await helpers.clickElement(page, campaignDashboardLocators.campaignDashboardButton_locator)
    }
    async campaignDashboardPage(expectedValue){
        await helpers.clickElement(page, campaignDashboardLocators.boostCampaignFilter_locator)
        const createdBoostCampaign =await helpers.getText(page, campaignDashboardLocators.firstCampaignInDashboard_locator)
        const inReviewCampaign = await helpers.getText(page, campaignDashboardLocators.campaignState_locator);
        console.log("context -> "+context.randomPostText);
        assert.strictEqual(createdBoostCampaign, context.randomPostText,"Boost Post Campaign returned in the Campaign Dashboard");
        console.log("context 1-> "+context.randomPostText);
        assert.strictEqual(inReviewCampaign, "In Review", "State is InReview as expected")
    }
}

module.exports= { campaignDashboard }