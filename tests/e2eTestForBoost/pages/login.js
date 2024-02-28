const helpers = require('../../../helpers/common-actions')

const loginPageLocators = {
    loginLink_locator:"//*[contains(text(),'Log in')]",
    usernameTextBox_locator: '#username',
    passwordTextBox_locator: '#password',
    loginButton_locator: "//*[contains(text(),'Log in')]",
}

class Login {
    async login(username, password) {
        await helpers.clickElement(page,loginPageLocators.loginLink_locator)
        await helpers.clearAndInputText(page, loginPageLocators.usernameTextBox_locator, username)
        await helpers.clearAndInputText(page, loginPageLocators.passwordTextBox_locator, password)
        await helpers.clickElement(page, loginPageLocators.loginButton_locator)
    }
}

module.exports = { Login }
