const helpers = require("../../../helpers/common-actions")
const {waitForLoadState} = require("../../../helpers/common-actions");
const productPageLocators = {
    product: function (productName) {
        return '(//a[@title="' + productName + '"])[2]'
    }
}

const campaignDashboardLocators = {
    setPageText: "//div[text()='You’re all set!']",
    campaignDashboardButton: "(//button[@type='button'])[1]",
    allFilterDropdown: "//a[@dropdown-direction='down']",
    inReviewFilterDropdown: "//a[contains(text(),'In Review')]",
    firstCampaignInDashboard: "//span[text()='e2e_test_Post']"
}
class campaignDashboard {
    async campaignDashBoardButton(){

        await helpers.clickElement(page, campaignDashboardLocators.campaignDashboardButton)
    }
    async campaignDashboardPage(){
        await helpers.clickElement(page, campaignDashboardLocators.allFilterDropdown)
        await helpers.clickElement(page, campaignDashboardLocators.inReviewFilterDropdown)
        await helpers.waitForTimeout(page,5000);
        const createdCampaign = await helpers.getText(campaignDashboardLocators.firstCampaignInDashboard)
        console.log("createdCampaign -> "+createdCampaign);
        assert.strictEqual(createdCampaign,"e2e_test_Post","Boost Post Campaign returned in the Campaign Dashboard InReview state")
    }
}
module.exports= {campaignDashboard}