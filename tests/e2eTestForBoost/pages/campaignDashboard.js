const helpers = require("../../../helpers/common-actions")

const campaignDashboardLocators = {
    campaignDashboardButton_locator: "//button[contains(@class,'ds-button ds-button-primary')]",
    firstCampaignInDashboard_locator: "//span[text()='e2e_test_Post']",
    boostCampaignFilter_locator: "(//a[@class='side-nav-item ng-scope'])[1]",
    campaignState_locator: "(//span[text()='In Review'])[1]"
}
class campaignDashboard {
    async campaignDashBoardButton(){
        await helpers.clickElement(page, campaignDashboardLocators.campaignDashboardButton_locator)
    }
    async campaignDashboardPage(){
        await helpers.clickElement(page, campaignDashboardLocators.boostCampaignFilter_locator)
        const createdBoostCampaign =await helpers.getText(page, campaignDashboardLocators.firstCampaignInDashboard_locator)
        const inReviewCampaign = await helpers.getText(page, campaignDashboardLocators.campaignState_locator)
        assert.strictEqual(createdBoostCampaign, "e2e_test_Post","Boost Post Campaign returned in the Campaign Dashboard")
        assert.strictEqual(inReviewCampaign, "In Review", "State is InReview as expected")
    }
}

module.exports= { campaignDashboard }