const helpers = require('../../../helpers/common-actions')

const loginPageLocators = {
    loginLink_locator:"//*[contains(text(),'Log in')]",
    usernameTextBox_locator: '#username',
    passwordTextBox_locator: '#password',
    loginButton_locator: "//*[contains(text(),'Log in')]",
}

class Login {
    async login(username, password) {
        // @ts-ignore
        await helpers.clickElement(page,loginPageLocators.loginLink_locator)
        // @ts-ignore
        await helpers.clearAndInputText(page, loginPageLocators.usernameTextBox_locator, username)
        // @ts-ignore
        await helpers.clearAndInputText(page, loginPageLocators.passwordTextBox_locator, password)
        // @ts-ignore
        await helpers.clickElement(page, loginPageLocators.loginButton_locator)
    }
}

module.exports = { Login }
