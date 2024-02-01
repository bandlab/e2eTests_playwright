const helpers = require("../../../helpers/common-actions"), {
    waitForLoadState,
    getText
} = require("../../../helpers/common-actions"), feedLocators = {
    inputPost: ".post-create-caption>span",
    feedText: ".form-field.textarea-emoji-wrapper>textarea",
    postButton: "(//span[@class='ds-button-text'])[3]",
    boostButton: "(//span[text()='Boost'])[1]",
    postTitle: "(//p[text()='e2e_test_Post'])[1]"
};

class Feeds {
    async CreatePost(){
        await helpers.clickElement(page, feedLocators.inputPost);
        await helpers.clearAndInputText(page, feedLocators.feedText, "e2e_test_Post");
        await helpers.clickElement(page, feedLocators.postButton);
    }

    async CreatePostFunc(){
        const post = await helpers.getText(page, feedLocators.postTitle);
        console.log("actualText -> "+post);
       assert.strictEqual(post, "e2e_test_Post", "Post created successfully")
    }

    async clickBoost(){
        await  helpers.clickElement(page,feedLocators.boostButton)
    }
}

module.exports = {Feeds}