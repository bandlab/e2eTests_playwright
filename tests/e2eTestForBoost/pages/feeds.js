const helpers = require("../../../helpers/common-actions"), {
    } = require("../../../helpers/common-actions");
const context = require('../../../context/context');

    feedLocators = {
        inputPost_locator: "//span[text()='What’s new?']",
        feedText_locator: "//textarea[@aria-label='What’s new?']",
        postButton_locator: "//span[text()='Post']",
        boostButton_locator: "(//span[text()='Boost'])[1]",
        postTitle_locator: "(//post-card-caption[@text='vm.post.caption']//div)[2]",
        feedHome_locator: "(//a[@ui-sref='feed'])[1]",
        threeDotsMenu_locator: "(//div[contains(@class,'button-transparent button-height-32')]//i)[1]",
        deletePost: "//a[@class='dropdown-menu-link ng-scope']//span[1]",
        confirmationPopUp: "//h2[text()='Delete this post?']",
        confirmDelete: "//button[text()='Delete']"
    };
    class Feeds {
    async createPost(){
        await helpers.clickElement(page, feedLocators.inputPost_locator);
        context.newTextPost = await helpers.generateRandomText();
        context.variable = context.newTextPost;
        await helpers.clearAndInputText(page, feedLocators.feedText_locator, context.newTextPost);
        await helpers.clickElement(page, feedLocators.postButton_locator);
    }
    async validateCreatedPost(){
        const post = await helpers.getText(page, feedLocators.postTitle_locator);
        assert.strictEqual(post, context.newTextPost, "Post created successfully")
    }
    async clickBoost(){
        await  helpers.clickElement(page, feedLocators.boostButton_locator)
    }
    async feed(){
        await  helpers.clickElement(page, feedLocators.feedHome_locator)
    }
    async deletePost(){
        await  helpers.clickElement(page, feedLocators.threeDotsMenu_locator);
        await helpers.clickElement(page, feedLocators.deletePost);
        await helpers.waitForLoadState(page, 10000);
        const confirmDeletePopUp = await helpers.getText(page, feedLocators.confirmationPopUp);
        assert.strictEqual(confirmDeletePopUp, "Delete this post?", "Pass");
        await helpers.waitForLoadState(page, 3000);
        await helpers.clickElement(page, feedLocators.confirmDelete);
    }
}

module.exports = { Feeds }