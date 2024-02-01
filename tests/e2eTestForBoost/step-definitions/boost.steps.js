const {Given, When, Then} = require('@cucumber/cucumber')
let helpers = require('../../../helpers/common-actions');
const assert = require('assert');


Given(/^Login with (.*) and (.*)$/, async (username, password) => {
   await boostPostPage.performLogin(username, password)
})

Then (/^Create a text post$/,async function (){
    await myFeedPage.CreatePost()
    await helpers.waitForTimeout(page,5000);
    await  myFeedPage.CreatePostFunc();
})

Then (/^I click the boost button$/,async function (){
    await myFeedPage.clickBoost();
})

When (/^I check the Boost Campaign Details$/,async function (){
    await boostPage.VerifySetBudgetAndDuration();
    await boostPage.setBudgetAndDuration();
})

When (/^Complete the Boost payment process$/,async function (){
    await helpers.waitForTimeout(page,5000);
    await orderSummaryPage.VerifyOrderSummary();
    await orderSummaryPage.CompletePurchase();
})

When(/^I click on the Campaign Dashboard button$/,async function (){
    await helpers.waitForTimeout(page,10000);
    await campaignDashboardPage.campaignDashBoardButton();
})

Then (/^Boost Post Campaign is returned should be returned in the Campaign Dashboard$/,async function (){
    await helpers.waitForTimeout(page,10000);
    await campaignDashboardPage.campaignDashboardPage();
})
