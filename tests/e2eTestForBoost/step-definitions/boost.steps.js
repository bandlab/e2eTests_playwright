const {Given, When, Then} = require('@cucumber/cucumber')
let helpers = require('../../../helpers/common-actions');


Given(/^I login with (.*) and (.*)$/, async (username, password) => {
   await boostPostPage.login(username, password)
})
Then(/^I create a text post$/,async function (){
    await myFeedPage.createPost();
    await helpers.waitForTimeout(page,10000);
    await myFeedPage.validateCreatedPost();
})
Then(/^I click the Boost button$/,async function (){
    await myFeedPage.clickBoost();
})
When(/^I check the Boost Campaign details$/,async function (){
    await boostPage.verifySetBudgetAndDuration();
    await boostPage.setBudgetAndDuration();
})
When(/^I complete the Boost payment process$/,async function (){
    await helpers.waitForTimeout(page,5000);
    await orderSummaryPage.verifyOrderSummary();
    await orderSummaryPage.completePurchase();
})
When(/^I click on the Campaign Dashboard button$/,async function (){
    await campaignDashboardPage.campaignDashBoardButton();
})
Then(/^Boost Post campaign is returned should be returned in the Campaign Dashboard$/,async function (){
    await helpers.waitForTimeout(page,10000);
    await campaignDashboardPage.campaignDashboardPage();
})
