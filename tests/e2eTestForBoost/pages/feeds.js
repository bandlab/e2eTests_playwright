const helpers = require("../../../helpers/common-actions"), {
} = require("../../../helpers/common-actions"),

    feedLocators = {
    inputPost_locator: ".post-create-caption>span",
    feedText_locator: ".form-field.textarea-emoji-wrapper>textarea",
    postButton_locator: "(//span[@class='ds-button-text'])[3]",
    boostButton_locator: "(//span[text()='Boost'])[1]",
    postTitle_locator: "(//p[text()='e2e_test_Post'])[1]"
};

class Feeds {
    async createPost(){
        await helpers.clickElement(page, feedLocators.inputPost_locator);
        await helpers.clearAndInputText(page, feedLocators.feedText_locator, "e2e_test_Post");
        await helpers.clickElement(page, feedLocators.postButton_locator);
    }
    async validateCreatedPost(){
        const post = await helpers.getText(page, feedLocators.postTitle_locator);
        assert.strictEqual(post, "e2e_test_Post", "Post created successfully")
    }
    async clickBoost(){
        await  helpers.clickElement(page,feedLocators.boostButton_locator)
    }
}

module.exports = { Feeds }
