const {Given, When, Then} = require('@cucumber/cucumber')
let helpers = require('../../../helpers/common-actions');

const config = require('../../../shared/config.test');
Given(/^I login as Alice$/, async () => {
    await loginPage.login(config.alice.username, config.alice.password)
})
Then(/^I create a text post$/,async function (){
    await feedPage.createPost();
    await helpers.waitForLoadState(page, 5000);
    await feedPage.validateCreatedPost();
})
Then(/^I click the Boost button$/,async function (){
    await feedPage.clickBoost();
})
When(/^I set the Budget & Duration for my Boost Campaign$/,async function (){
    await boostPage.verifySetBudgetAndDuration();
    await boostPage.setBudgetAndDuration();
})
When(/^I complete the Boost payment process$/,async function (){
    await orderSummaryPage.verifyOrderSummary();
    await orderSummaryPage.completePurchase();
})
When(/^I click on the Campaign Dashboard button$/,async function (){
    await campaignDashboardPage.campaignDashBoardButton();
})
Then(/^Boost Post campaign is shown on Boost Dashboard$/,async function (){
    await helpers.waitForTimeout(page,20000);
    await campaignDashboardPage.campaignDashboardPage();
})
When(/^I click on the Boost button again$/, async function(){
    await feedPage.feed();
    await helpers.waitForTimeout(page,20000);
    await feedPage.clickBoost();
})
Then(/^Campaign Performance page should be displayed with status In-Review$/, async function(){
    await helpers.waitForTimeout(page,5000);
    await campaignPerformancePage.campaignStatus();
    await campaignPerformancePage.verifyCampaignDetails();
})
Then(/^I delete the post created for clean-up$/, async function(){
    await helpers.waitForTimeout(page,5000);
    await feedPage.feed();
    await feedPage.deletePost();
})