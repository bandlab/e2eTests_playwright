//const LoginBase = require('../pages-base/loginBase')
const helpers = require('../../../helpers/common-actions')
const commonMethods = require('../commonMethods')

const loginPageLocators = {
    loginLink:"//*[contains(text(),'Log in')]",
    usernameTextBox: '#username',
    passwordTextBox: '#password',
    loginButton: "//*[contains(text(),'Log in')]",
}

class BoostPost {

    async performLogin(username, password) {
        await helpers.clickElement(page,loginPageLocators.loginLink)
        await helpers.clearAndInputText(page, loginPageLocators.usernameTextBox, username)
        await helpers.clearAndInputText(page, loginPageLocators.passwordTextBox, password)
        await helpers.clickElement(page, loginPageLocators.loginButton)
    }
}

module.exports = { BoostPost }
