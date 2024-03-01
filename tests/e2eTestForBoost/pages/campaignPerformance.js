const helpers = require("../../../helpers/common-actions")
const {waitForLoadState} = require("../../../helpers/common-actions");
const context = require('../../../context/context');

const campaignPerformance = {
    boostedPost_locator: "//div[@class='promote-tile-img-container']/following-sibling::div[1]",
    boostPostStatus_locator: "//span[text()='In Review']",
    totalBudget_locator: "(//span[text()='$50'])[1]",
    backToFeed_locator: "//button[contains(@class,'button-scd button-round-32')]"
}

class CampaignPerformance {
    async verifyCampaignDetails(){
        const boostedPost= await helpers.getText(page, campaignPerformance.boostedPost_locator)
        assert.strictEqual(boostedPost, context.newTextPost, "Boosted text Post returned successfully")
    }
    async campaignStatus(){
        await helpers.clickElement(page, campaignPerformance.boostPostStatus_locator)
    }
    async backToFeed(){
        await helpers.clickElement(page, campaignPerformance.backToFeed_locator)
    }
}

module.exports= { CampaignPerformance }