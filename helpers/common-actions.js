const colors = require('colors');
const envconfig = require('../envConfigs')[process.env.NODE_ENV];
const moment = require("moment");


const {
    DEFAULT_TIMEOUT,
    LOGIN_ROLES
} = require(`./${envconfig.e2eConst}`);



/**
 * @summary The method goto page and set local storage.
 *
 * @param {Page} page the page's object.
 * @param {string} path the path.
 *
 * 
 * */
async function gotoPage(page, path) {
    try {
        let timeout = process.env.APP_LOAD_TIMEOUT ? process.env.APP_LOAD_TIMEOUT : DEFAULT_TIMEOUT

            // Navigate to certain url
            await page.goto(global.BASE_URL.desktop + path, {timeout: parseInt(timeout)});

    } catch (exec) {
        CustomException('Failed load page', path, exec)
    }
}


async function isVisible(page, locator) {
   // await page.waitForLoadState("state:load","timeout:800")
    await  waitForTimeout(page,3000);
    const visible = await page.isVisible(locator)
    return expect(visible).to.equal(true, '\n[Failure Message]: Element is not visible. \n[Locator]: ' + locator);
}

/**
 * @summary The method clicks the element.
 *
 * @param {Page} page the page's object.
 * @param {string} locator the locator.
 * @throws {CustomException} the customer error.
 *
 * 
 * */
async function clickElement(page, locator) {
    try {
        return await page.locator(locator).click()
    } catch (exec) {
        CustomException('Failed to click the element', locator, exec)
    }
}

/**
 * @summary The method double clicks the element.
 *
 * @param {Page} page the page's object.
 * @param {string} locator the element locator.
 * @throws {CustomException} the customer error.
 *
 * 
 * */
async function doubleClickElement(page, locator) {
    try {
        return await page.locator(locator).dblclick()
    } catch (exec) {
        CustomException('Failed to double click the element', locator, exec)
    }
}

/**
 * @summary The method clicks the element by dispatch event that is it directly dispatch the click event on the element.
 *
 * @param {Page} page the page's object.
 * @param {string} locator the element locator.
 * @throws {CustomException} the customer error.
 *
 * 
 * */
async function clickElementByDispatchEvent(page, locator) {
    try {
        return await page.dispatchEvent(locator, 'click')
    } catch (exec) {
        CustomException('Failed to click the element by dispatch event', locator, exec)
    }
}

/**
 * @summary The method focus on the element.
 *
 * @param {Page} page the page's object.
 * @param {string} locator the element locator.
 * @throws {CustomException} the customer error.
 *
 * 
 * */
async function focusOnElement(page, locator) {
    try {
        return await page.locator(locator).focus()
    } catch (exec) {
        CustomException('Failed to click the element by dispatch event', locator, exec)
    }
}

async function getText(page, locator) {
    let visible = await isVisible(page, locator);
    return await page.innerText(locator);
}

async function getUserWithFunds(userType) {

    if (userType === 'OnlinePlayer') {
        return LOGIN_ROLES.OnlinePlayer;
    } else {
      throw new Error("User type undefined");
    }

}

/**
 * @summary The method clears the text tex box and then enters the provided input text.
 *
 * @param {Page} page the page's object.
 * @param {string} locator the element locator.
 * @param {string} inputText the text to enter.
 * @throws {CustomException} the customer error.
 *
 * 
 * */
async function clearAndInputText(page, locator, inputText) {
    try {
        let element = await page.locator(locator)
        await element.fill('')
        return await element.fill(inputText)
    } catch (exec) {
        CustomException('Failed to clear and input text.', locator, exec)
    }
}

/**
 * @summary The method enters the provided input text in the text box.
 *
 * @param {Page} page the page's object.
 * @param {string} locator the element locator.
 * @param {string} inputText the text to enter.
 * @throws {CustomException} the customer error.
 *
 * 
 * */
async function inputText(page, locator, inputText) {
    try {
        await page.locator(locator).fill(inputText)
    } catch (exec) {
        CustomException('Failed to input text, ' + inputText, locator, exec)
    }
}

/**
 * @summary This method use fill and type to emulate real user interaction with delay
 * @param page
 * @param locator
 * @param text
 * @param delay
 * @returns {Promise<void>}
 */
async function inputValueByType(page, locator, text, delay) {

    try {

        if (typeof delay === 'undefined') {
            await inputText(page, locator, '')
            await page.type(locator, text)
        } else {
            await inputText(page, locator, '')
            await page.type(locator, text, {delay: delay})

        }
    } catch (exec) {
        CustomException('Failed to inputValue, ' + text, locator, exec)
    }
}

/**
 * @summary The method enters waits until the element is present. That is it checks if the element is attached to the DOM.
 *
 * @param {Page} page the page's object.
 * @param {string} locator the element locator.
 * @param {number} [timeout] the max amount of time to to check if element is attached to the DOM. Optional parameter.
 * @throws {CustomException} the customer error.
 *
 * 
 * */
async function waitForElementToBePresent(page, locator, timeout) {
    try {
        if (typeof (timeout) === 'undefined') {
            await page.locator(locator).waitFor({state: 'attached'})
        } else {
            await page.locator(locator).waitFor({state: 'attached', timeout: timeout})
        }
    } catch (exec) {
        CustomException('Element is not present.', locator, exec)
    }
}

/**
 * @summary The method waits until the element is not present. That is it checks if the element is detached from the DOM.
 *
 * @param {Page} page the page's object.
 * @param {string} locator the element locator.
 * @param {number} [timeout] the max amount of time to to check if element is detached from the DOM. Optional parameter.
 * @throws {CustomException} the customer error.
 *
 * 
 * */
async function waitForElementToBeNotPresent(page, locator, timeout) {
    try {
        if (typeof (timeout) === 'undefined') {
            await page.locator(locator).waitFor({state: 'detached'})
        } else {
            await page.locator(locator).waitFor({state: 'detached', timeout: timeout})
        }
    } catch (exec) {
        CustomException('Element is present.', locator, exec)
    }
}

/**
 * @summary The method enters waits until the element is visible. That is it checks if the element is visible in the DOM.
 *
 * @param {Page} page the page's object.
 * @param {string} locator the element locator.
 * @param {number} [timeout] the max amount of time to to check if element is visible in the DOM. Optional parameter.
 * @throws {CustomException} the customer error.
 *
 * 
 * */
async function waitForElementToBeVisible(page, locator, timeout) {
    try {
        if (typeof (timeout) === 'undefined') {
            await page.locator(locator).waitFor({state: 'visible'})
        } else {
            await page.locator(locator).waitFor({state: 'visible', timeout: timeout})
        }
    } catch (exec) {
        CustomException('Element is not visible.', locator, exec)
    }
}

/**
 * @summary The method enters waits until the element is visible. That is it checks if the element is hidden in the DOM.
 *
 * @param {Page} page the page's object.
 * @param {string} locator the element locator.
 * @param {number} [timeout] the max amount of time to to check if element is hidden in the DOM. Optional parameter.
 * @throws {CustomException} the customer error.
 *
 * 
 * */
async function waitForElementToBeHidden(page, locator, timeout) {
    try {
        if (typeof (timeout) === 'undefined') {
            await page.locator(locator).waitFor({state: 'hidden'})
        } else {
            await page.locator(locator).waitFor({state: 'hidden', timeout: timeout})
        }
    } catch (exec) {
        CustomException('Element is not hidden.', locator, exec)
    }
}

/**
 * @summary The method enters waits until the element is visible. That is it checks if the element is hidden in the DOM.
 *
 * @param {Page} page the page's object.
 * @param {number} timeout the max amount of time to wait for in milliseconds.
 * @throws {CustomException} the customer error.
 *
 * 
 * */
async function waitForTimeout(page, timeout) {
    await page.waitForTimeout(timeout)
}

/**
 * @summary The method waits for the load event to be fired
 *
 * @param {Page} page the page's object.
 * @param {number} [timeout] the max amount of time to wait for in milliseconds. Optional parameter.
 * @throws {CustomException} the customer error.
 *
 * 
 * */
async function waitForLoadState(page, timeout) {
    try {
        if (typeof (timeout) === 'undefined') {
            return await page.waitForLoadState('load')
        } else {
            return await page.waitForLoadState('load', {timeout: timeout})
        }
    } catch (exec) {
        CustomException('Error occurred while waiting for the load state: load', undefined, exec)
    }
}

/**
 * @summary The method enters waits until there are no network connections for at least 500 ms.
 *
 * @param {Page} page the page's object.
 * @param {number} [timeout] the max amount of time to wait for in milliseconds. Optional parameter.
 * @throws {CustomException} the customer error.
 *
 * 
 * */
async function waitForNetworkIdleState(page, timeout) {
    try {
        if (typeof (timeout) === 'undefined') {
            return await page.waitForLoadState('networkidle')
        } else {
            return await page.waitForLoadState('networkidle', {timeout: timeout})
        }
    } catch (exec) {
        CustomException('Error occurred while waiting for the load state: networkidle', undefined, exec)
    }
}

/**
 * @summary The method waits for the DOMContentLoaded event to be fired.
 *
 * @param {Page} page the page's object.
 * @param {number} [timeout] the max amount of time to wait for in milliseconds. Optional parameter.
 * @throws {CustomException} the customer error.
 *
 * 
 * */
async function waitForDomContentLoadedState(page, timeout) {
    try {
        if (typeof (timeout) === 'undefined') {
            return await page.waitForLoadState('domcontentloaded')
        } else {
            return await page.waitForLoadState('domcontentloaded', {timeout: timeout})
        }
    } catch (exec) {
        CustomException('Error occurred while waiting for the load state: domcontentloaded', undefined, exec)
    }
}

/**
 * @summary The method waits for network response to be received and when the document started loading.
 *
 * @param {Page} page the page's object.
 * @param {number} [timeout] the max amount of time to wait for in milliseconds. Optional parameter.
 * @throws {CustomException} the customer error.
 *
 * 
 * */
async function waitForCommitState(page, timeout) {
    try {
        if (typeof (timeout) === 'undefined') {
            return await page.waitForLoadState('commit')
        } else {
            return await page.waitForLoadState('commit', {timeout: timeout})
        }
    } catch (exec) {
        CustomException('Error occurred while waiting for the load state: domcontentloaded', undefined, exec)
    }
}

/**
 * @summary The method gets the element's text.
 *
 * @param {Page} page the page's object.
 * @param {string} locator the element locator.
 * @throws {CustomException} the customer error.
 * @returns {string} the text of the element.
 *
 * 
 * */
async function getElementText(page, locator) {
    try {
        return await page.locator(locator).textContent()
    } catch (exec) {
        CustomException('Failed to fetch element text.', locator, exec)
    }
}

/**
 * @summary The method gets the element's inner text.
 *
 * @param {Page} page the page's object.
 * @param {string} locator the element locator.
 * @throws {CustomException} the customer error.
 * @returns {string} the inner text of the element.
 *
 * 
 * */
async function getElementInnerText(page, locator) {
    try {
        return await page.locator(locator).innerText()
    } catch (exec) {
        CustomException('Failed to fetch element inner-text.', locator, exec)
    }
}

/**
 * @summary The method gets the element's attribute value.
 *
 * @param {Page} page the page's object.
 * @param {string} locator the element locator.
 * @param {string} attributeName the attribute name whose value needs to be fetched.
 * @throws {CustomException} the customer error.
 * @returns {string} the value of the attribute.
 *
 * 
 * */
async function getElementAttributeValue(page, locator, attributeName) {
    try {
        return await page.locator(locator).getAttribute(attributeName)
    } catch (exec) {
        CustomException('Failed to fetch attribute value for ' + attributeName, locator, exec)
    }
}


/**
 * @summary The method selects from the drop down by it's value.
 *
 * @param {Page} page the page's object.
 * @param {string} locator the element locator.
 * @param {string} value the value in the drop down.
 * @throws {CustomException} the customer error.
 *
 * 
 * */
async function selectFromDropDownByValue(page, locator, value) {
    try {
        return await page.locator(locator).selectOption({value: value})
    } catch (exec) {
        CustomException('Failed to select from drop down by value, ' + value, locator, exec)
    }
}

/**
 * @summary The method selects from the drop down by it's label.
 *
 * @param {Page} page the page's object.
 * @param {string} locator the element locator.
 * @param {string} label the label in the drop down.
 * @throws {CustomException} the customer error.
 *
 * 
 * */
async function selectFromDropDownByLabel(page, locator, label) {
    try {
        return await page.locator(locator).selectOption({label: label})
    } catch (exec) {
        CustomException('Failed to select from drop down by label, ' + label, locator, exec)
    }
}

/**
 * @summary The method selects from the drop down by it's index.
 *
 * @param {Page} page the page's object.
 * @param {string} locator the element locator.
 * @param {number} index the index to select in the drop down.
 * @throws {CustomException} the customer error.
 *
 * 
 * */
async function selectFromDropDownByIndex(page, locator, index) {
    try {
        return await page.locator(locator).selectOption({index: index})
    } catch (exec) {
        CustomException('Failed to select from drop down by index, ' + index, locator, exec)
    }
}

/**
 * @summary The method enters the text in the text box by using page class.
 *
 * @param {Page} page the page's object.
 * @param {string} locator the element locator.
 * @param {string} text the text to enter.
 * @throws {CustomException} the customer error.
 *
 * 
 * */
async function inputTextByPageFill(page, locator, text) {
    try {
        await page.fill(locator, text)
    } catch (exec) {
        CustomException('Failed to input text, ' + text, locator, exec)
    }
}

/**
 * @summary The method checks if the actual and expected values are equal. If not equal, either the expect fails with the custom message passed or with the pre-defined message.
 *
 * @param {object} actualValue The actual value.
 * @param {object} expectedValue The expected value.
 * @param {string} [customMessage] The custom message to be displayed on failure. Optional argument.
 * @param {string} [key] The key. Optional argument.
 *
 *
 * 
 */
function expectValuesEqual(actualValue, expectedValue, customMessage, key) {
    if (customMessage === undefined) {
        if (key !== undefined)
            expect(actualValue, '\n[Affected key]: ' + key + '\n[Failure Message]: Actual and expected values are not equal.\nActual value: ' + actualValue + '\nExpected value: ' + expectedValue + '\n').to.equal(expectedValue)
        else
            expect(actualValue, '\n[Failure Message]: Actual and expected values are not equal.\nActual value: ' + actualValue + '\nExpected value: ' + expectedValue + '\n').to.equal(expectedValue)
    } else {
        if (key !== undefined)
            expect(actualValue, '\n[Affected key]: ' + key + '\n[Failure Message]: ' + customMessage + '\n').to.equal(expectedValue)
        else
            expect(actualValue, '\n[Failure Message]: ' + customMessage + '\n').to.equal(expectedValue)
    }
}

/**
 * @summary The method checks if the actual and expected values are not equal. If equal, either the expect fails with the custom message passed or with the pre-defined message.
 *
 * @param {object} actualValue The actual value.
 * @param {object} expectedValue The expected value.
 * @param {string} [customMessage] The custom message to be displayed on failure. Optional argument.
 * @param {string} [key] The key. Optional argument.
 *
 * 
 */
function expectValuesNotEqual(actualValue, expectedValue, customMessage, key) {
    if (customMessage === undefined) {
        if (key !== undefined)
            expect(actualValue, '\n[Affected key]: ' + key + '\n[Failure Message]: Actual and expected values equal but should not be.\nActual value: ' + actualValue + '\nExpected value: ' + expectedValue + '\n').to.not.equal(expectedValue)
        else
            expect(actualValue, '\n[Failure Message]: Actual and expected values equal but should not be.\nActual value: ' + actualValue + '\nExpected value: ' + expectedValue + '\n').to.not.equal(expectedValue)
    } else {
        if (key !== undefined)
            expect(actualValue, '\n[Affected key]: ' + key + '\n[Failure Message]: ' + customMessage + '\n').to.not.equal(expectedValue)
        else
            expect(actualValue, '\n[Failure Message]: ' + customMessage + '\n').to.not.equal(expectedValue)
    }
}

/**
 * @summary The method checks if the value is True. If not, either the expect fails with the custom message passed or with the pre-defined message.
 *
 * @param {boolean} value The actual value to verify.
 * @param {string} [customMessage] The custom message to be displayed on failure. Optional argument.
 * @param {string} [key] The key. Optional argument.
 *
 * 
 */
function expectValueIsTrue(value, customMessage, key) {
    if (customMessage === undefined) {
        if (key !== undefined)
            expect(value, '\n[Affected key]: ' + key + '\n[Failure Message]: Value is not true.\nActual value: ' + value + '\nExpected value: true').to.be.true;
        else
            expect(value, '\n[Failure Message]: Value is not true.\nActual value: ' + value + '\nExpected value: true').to.be.true;
    } else {
        if (key !== undefined)
            expect(value, '\n[Affected key]: ' + key + '\n[Failure Message]: ' + customMessage + '\n').to.be.true;
        else
            expect(value, '\n[Failure Message]: ' + customMessage + '\n').to.be.true;
    }
}

/**
 * @summary The method checks if the value is False. If not, either the expect fails with the custom message passed or with the pre-defined message.
 *
 * @param {boolean} value The actual value to verify.
 * @param {string} [customMessage] The custom message to be displayed on failure. Optional argument.
 * @param {string} [key] The key. Optional argument.
 *
 * 
 */
function expectValueIsFalse(value, customMessage, key) {
    if (customMessage === undefined) {
        if (key !== undefined)
            expect(value, '\n[Affected key]: ' + key + '\n[Failure Message]: Value is not false.\nActual value: ' + value + '\nExpected value: False').to.be.false;
        else
            expect(value, '\n[Failure Message]: Value is not False.\nActual value: ' + value + -'\nExpected value: False').to.be.false;
    } else {
        if (key !== undefined)
            expect(value, '\n[Affected key]: ' + key + '\n[Failure Message]: ' + customMessage + '\n').to.be.false;
        else
            expect(value, '\n[Failure Message]: ' + customMessage + '\n').to.be.false;
    }
}

/**
 * @summary The method checks if the value is Null. If not, either the expect fails with the custom message passed or with the pre-defined message.
 *
 * @param {object} value The actual value to verify.
 * @param {string} [customMessage] The custom message to be displayed on failure. Optional argument.
 * @param {string} [key] The key. Optional argument.
 *
 * 
 */
function expectValueIsNull(value, customMessage, key) {
    if (customMessage === undefined) {
        if (key !== undefined)
            expect(value, '\n[Affected key]: ' + key + '\n[Failure Message]: Value is not null.\nActual value: ' + value + '\nExpected value: Null').to.be.null;
        else
            expect(value, '\n[Failure Message]: Value is not Null.\nActual value: ' + value + -'\nExpected value: Null').to.be.null;
    } else {
        if (key !== undefined)
            expect(value, '\n[Affected key]: ' + key + '\n[Failure Message]: ' + customMessage + '\n').to.be.null;
        else
            expect(value, '\n[Failure Message]: ' + customMessage + '\n').to.be.null;
    }
}

/**
 * @summary The method checks if the value is not Null. If not, either the expect fails with the custom message passed or with the pre-defined message.
 *
 * @param {object} value The actual value to verify.
 * @param {string} [customMessage] The custom message to be displayed on failure. Optional argument.
 * @param {string} [key] The key. Optional argument.
 *
 * 
 */
function expectValueIsNotNull(value, customMessage, key) {
    if (customMessage === undefined) {
        if (key !== undefined)
            expect(value, '\n[Affected key]: ' + key + '\n[Failure Message]: Value is Null.\nActual value: ' + value + '\nExpected value: Not Null').to.not.be.null;
        else
            expect(value, '\n[Failure Message]: Value is Null.\nActual value: ' + value + -'\nExpected value: Not Null').to.not.be.null;
    } else {
        if (key !== undefined)
            expect(value, '\n[Affected key]: ' + key + '\n[Failure Message]: ' + customMessage + '\n').to.not.be.null;
        else
            expect(value, '\n[Failure Message]: ' + customMessage + '\n').to.not.be.null;
    }
}

/**
 * @summary The method checks if the value is undefined. If not, either the expect fails with the custom message passed or with the pre-defined message.
 *
 * @param {object} value The actual value to verify.
 * @param {string} [customMessage] The custom message to be displayed on failure. Optional argument.
 * @param {string} [key] The key. Optional argument.
 *
 * 
 */
function expectValueIsUndefined(value, customMessage, key) {
    if (customMessage === undefined) {
        if (key !== undefined)
            expect(value, '\n[Affected key]: ' + key + '\n[Failure Message]: Value is not Undefined.\nActual value: ' + value + '\nExpected value: undefined').to.be.undefined;
        else
            expect(value, '\n[Failure Message]: Value is not Undefined.\nActual value: ' + value + '\nExpected value: undefined').to.be.undefined;
    } else {
        if (key !== undefined)
            expect(value, '\n[Affected key]: ' + key + '\n[Failure Message]: ' + customMessage + '\n').to.be.undefined;
        else
            expect(value, '\n[Failure Message]: ' + customMessage + '\n').to.be.undefined;
    }
}

/**
 * @summary The method checks if the value is empty. If not, either the expect fails with the custom message passed or with the pre-defined message.
 *
 * @param {object} value The actual value to verify.
 * @param {string} [customMessage] The custom message to be displayed on failure. Optional argument.
 * @param {string} [key] The key. Optional argument.
 *
 * 
 */
function expectValueIsEmpty(value, customMessage, key) {
    if (customMessage === undefined) {
        if (key !== undefined)
            expect(value, '\n[Affected key]: ' + key + '\n[Failure Message]: Actual value should be empty.\nActual value: ' + value + '\nExpected value: empty').to.be.empty;
        else
            expect(value, '\n[Failure Message]: Actual value should be empty.\nActual value: ' + value + -'\nExpected value: empty').to.be.empty;
    } else {
        if (key !== undefined)
            expect(value, '\n[Affected key]: ' + key + '\n[Failure Message]: ' + customMessage + '\n').to.be.empty;
        else
            expect(value, '\n[Failure Message]: ' + customMessage + '\n').to.be.empty;
    }
}

/**
 * @summary The method checks if the value is not empty. If not, either the expect fails with the custom message passed or with the pre-defined message.
 *
 * @param {object} value The actual value to verify.
 * @param {string} [customMessage] The custom message to be displayed on failure. Optional argument.
 * @param {string} [key] The key. Optional argument.
 *
 * 
 */
function expectValueIsNotEmpty(value, customMessage, key) {
    if (customMessage === undefined) {
        if (key !== undefined)
            expect(value, '\n[Affected key]: ' + key + '\n[Failure Message]: Actual value should not be empty.\nActual value: ' + value + '\nExpected value: Not Empty').not.empty;
        else
            expect(value, '\n[Failure Message]: Actual value should not be empty.\nActual value: ' + value + -'\nExpected value: Not Empty').not.empty;
    } else {
        if (key !== undefined)
            expect(value, '\n[Affected key]: ' + key + '\n[Failure Message]: ' + customMessage + '\n').not.empty;
        else
            expect(value, '\n[Failure Message]: ' + customMessage + '\n').not.empty;
    }
}

/**
 * @summary The method checks if the field contain a string. If not, either the expect fails with the custom message passed or with the pre-defined message.
 *
 * @param {string} string The field whose contains operation needs to be performed.
 * @param {string} stringToCheck The string to check if it is present in the field value.
 * @param {string} [customMessage] The custom message to be displayed on failure. Optional argument.
 *
 * 
 */
function expectStringContains(string, stringToCheck, customMessage) {
    if (customMessage === undefined) {
        expect(string, '\n[Failure Message]: ' + string + ' does not contain string ' + stringToCheck + '\n').to.have.string(stringToCheck);
    } else {
        expect(string, '\n[Failure Message]: ' + customMessage + '\n').to.have.string(stringToCheck);
    }
}

/**
 * @summary The method checks if the field's value is within start and finish value. If not, either the expect fails with the custom message passed or with the pre-defined message.
 *
 * @param {object} actualValue The actual value.
 * @param {string} [customMessage] The custom message to be displayed on failure. Optional argument.
 * @param {number} start The start value.
 * @param {number} finish The finish value.
 * @param {string} [key] The key. Optional argument.
 *
 * 
 */
function expectValueIsWithin(actualValue, start, finish, customMessage, key) {
    if (customMessage === undefined) {
        if (key !== undefined)
            expect(value, "\n[Affected key]: " + key + "\n[Failure Message]: " + actualValue + "'s value is not within the start: " + start + " and finish: " + finish + "] value\n").to.be.within(start, finish);
        else
            expect(actualValue, "\n[Failure Message]: " + actualValue + "'s value is not within the start: " + start + " and finish: " + finish + "] value\n").to.be.within(start, finish);
    } else {
        if (key !== undefined)
            expect(value, '\n[Affected key]: ' + key + '\n[Failure Message]: ' + customMessage + '\n').to.be.within(start, finish);
        else
            expect(actualValue, '\n[Failure Message]: ' + customMessage + '\n').to.be.within(start, finish);
    }
}

/**
 * @summary The method checks if the actual and expected array values are equal. If not equal, either the expect fails with the custom message passed or with the pre-defined message.
 *
 * @param {Array} actualArray The actual array.
 * @param {Array} expectedArray The expected array.
 * @param {string} [customMessage] The custom message to be displayed on failure. Optional argument.
 * @param {string} [key] The key. Optional argument.
 *
 * 
 */
function expectArraysEqual(actualArray, expectedArray, customMessage, key) {
    if (customMessage === undefined) {
        if (key !== undefined)
            expect(value, '\n[Affected key]: ' + key + '\n[Failure Message]: Actual and expected values are not equal.\nActual value: ' + JSON.stringify(actualArray) + '\nExpected value: ' + JSON.stringify(expectedArray) + '\n').to.deep.equal(expectedArray)
        else
            expect(actualArray, '\n[Failure Message]: Actual and expected values are not equal.\nActual value: ' + JSON.stringify(actualArray) + '\nExpected value: ' + JSON.stringify(expectedArray) + '\n').to.deep.equal(expectedArray)
    } else {
        if (key !== undefined)
            expect(value, '\n[Affected key]: ' + key + '\n[Failure Message]: ' + customMessage + '\n').to.deep.equal(expectedArray)
        else
            expect(actualArray, '\n[Failure Message]: ' + customMessage + '\n').to.deep.equal(expectedArray)

    }
}

/**
 * @summary The method checks performs a expect failure with the message supplied.
 *
 * @param {string} failureMessage The custom message to be displayed on failure.
 *
 * 
 */
function expectFail(failureMessage) {
    expect.fail(failureMessage)
}


/**
 * @summary The method checks if the object includes the value.
 *
 * @param objectToSearchIn The object to search the value in.
 * @param valueToSearch The value to search.
 * @param {string} [customMessage] The custom message to be displayed on failure. Optional argument.
 *
 * 
 */
function expectIncludes(objectToSearchIn, valueToSearch, customMessage) {
    if (customMessage === undefined) {
        expect(objectToSearchIn, '\n[Failure Message]: ' + objectToSearchIn + ' does not includes value ' + valueToSearch + '\n').to.include(valueToSearch)
    } else {
        expect(objectToSearchIn, '\n[Failure Message]: ' + customMessage + '\n').to.include(valueToSearch)
    }
}

/**
 * @summary The method logs warning message with a specific color.
 *
 * @param {string} message the message.
 *
 * 
 * */
function logWarning(message) {
    if (message)
        console.warn("[WARN]: ".gray + message.brightYellow);
}

/**
 * @summary The method logs error message with a specific color.
 *
 * @param {string} message the message.
 *
 * 
 * */
function logError(message) {
    if (message)
        console.error("[ERROR]: ".gray + message.brightRed);
}

/**
 * @summary The method logs info message with a specific color.
 *
 * @param {string} message the message.
 *
 * 
 * */
function logInfo(message) {
    if (message)
        console.info("[INFO]: ".gray + message.cyan);
}

/**
 * @summary The method logs success message with a specific color.
 *
 * @param {string} message the message.
 *
 * 
 * */
function logSuccess(message) {
    if (message)
        console.info("[SUCCESS]: ".gray + message.green);
}

/**
 * @summary The method logs debug message with a specific color.
 *
 * @param {string} message the message.
 *
 * 
 * */
function logDebug(message) {
    if (message)
        console.debug("[DEBUG]: ".gray + message.yellow);
}

/**
 * @summary The method prints a message.
 *
 * @param {string} message the message.
 *
 * 
 * */
function logMessage(message) {
    if (message)
        console.info("[MESSAGE]: ".blue.bold + message.blue.bold);
}

/**
 * @summary The method throws an custom error.
 *
 * @param {string} failureMessage the custom failure message to be thrown.
 * @param {string} locator the element locator.
 * @param {Object} exception.
 * @throws {Error} the custom error details.
 *
 * 
 * */
function CustomException(failureMessage, locator, exception) {
    if (typeof locator !== 'undefined')
        throw new Error(('\n[Failure Message]: ' + failureMessage + '\n[Locator]: ' + locator + '\n[Details]: ' + exception).brightRed)
    else
        throw new Error(('\n[Failure Message]: ' + failureMessage + '\n[Details]: ' + exception).brightRed)
}

/**
 * @summary The method return the list of element. It uses locator class to find the elements.
 *
 * @param {Page} page the page object.
 * @param {string} locator the element locator.
 * @throws {CustomException} the customer error.
 *
 * 
 * */
async function getListOfElements(page, locator) {
    try {
        return await page.locator(locator)
    } catch (exec) {
        CustomException('Failed to get the elements list.', locator, exec)
    }
}

/**
 * @summary The method verifies if the element is enabled.
 *
 * @param {Page} page the page's object.
 * @param {string} locator the element locator.
 * @throws {CustomException} the customer error.
 *
 * 
 * */
async function verifyElementEnabled(page, locator) {
    try {
        expectValueIsTrue(await page.locator(locator).isEnabled(), 'Element is not enabled.')
    } catch (exec) {
        CustomException('Element is not enabled.', locator, exec)
    }
}

/**
 * @summary The method finds the element and returns the object of ElementHandle.
 *
 * @param {Page} page the page's object.
 * @param {string} locator the element locator.
 * @returns {elementHandle} the element handle object.
 * @throws {CustomException} the customer error.
 *
 * 
 * */
async function getElementHandle(page, locator) {
    try {
        return await page.$(locator)
    } catch (exec) {
        CustomException('Failed to get the element', locator, exec)
    }
}

/**
 * @summary The method finds the list of elements and returns the object of ElementHandles.
 *
 * @param {Page} page the page's object.
 * @param {string} locator the element locator.
 * @returns {elementHandle} the list of element handle object.
 * @throws {CustomException} the customer error.
 *
 * 
 * */
async function getElementHandles(page, locator) {
    try {
        return await page.$$(locator)
    } catch (exec) {
        CustomException('Failed to get the elements list', locator, exec)
    }
}

/**
 * @summary The method clicks the element by using ElementHandle class.
 *
 * @param {Page} page the page's object.
 * @param {string} locator the element locator.
 * @throws {CustomException} the customer error.
 *
 * 
 * */
async function clickElementByElementHandle(page, locator) {
    try {
        let elementHandle = await getElementHandle(page, locator)
        await elementHandle.focus()
        await elementHandle.click()
    } catch (exec) {
        CustomException('Failed to click element by ElementHandle', locator, exec)
    }
}

/**
 * @summary The method performs a page refresh
 *
 * @param {Page} page the page's object.
 * @throws {CustomException} the customer error.
 *
 * 
 * */
async function refreshPage(page) {
    try {
        return await page.reload()
    } catch (exec) {
        CustomException('Failed refresh the page', undefined, exec)
    }
}

/**
 * @summary The method generates random email for testing purpose
 * 
 * */
async function generateRandomEmail() {
    const length = 6
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return "test" + result + "@testemail.com"
}

/**
 *
 * @summary The method ticks(checks) checkbox element
 * @param {Page} page the page's object.
 * @param {string} locator the element locator.
 * 
 *
 * */
async function tickCheckBox(page, locator) {
    try {
        await page.check(locator)
    } catch (exec) {
        CustomException('Failed to tick checkbox element', locator, exec)
    }
}

/**
 * @summary The method generates random number
 * @param {number} length of the number
 * 
 * */
async function generateRandomNumber(length) {
    return Math.floor(Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1));
}

/**
 * @summary The method navigates to the given url.
 * @param {Page} page the page's object.
 * @param {string} url the url to navigate to.
 * @param {string} [path] the path to append to the url.
 * @return {Promise<void>}
 *
 * 
 */
async function navigateTo(page, url, path) {
    if ((typeof path) === 'undefined')
        await page.goto(url)
    else
        await page.goto(url + path)
}

/**
 * @summary The method checks if the given number starts with 0 and updates it to a non zero starting number.
 * @param {string} number the number
 * @return {string} the number that does not start with a zero.
 *
 * 
 */
function checkIfNumberStartsWithZeroAndGetANewOne(number) {
    if (number.startsWith('0')) {
        logWarning('Phone number, ' + number + ', starts with 0. Getting a new one')
        number = '9' + number.substr(1)
    }
    return number
}

/**
 * @summary The methods generates random alpha string for the given length
 * @param {number} length the length.
 * @return {string} random alpha string of given length.
 *
 * 
 */
function randAlphaString(length) {
    let ans = '';
    let arr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    for (let i = length; i > 0; i--) {
        ans += arr[Math.floor(Math.random() * arr.length)];
    }
    return ans;
}

/**
 * @summary The methods generates random number string for the given length
 * @param {number} length the length.
 * @return {string} random number string of given length.
 *
 * 
 */
function randNumberString(length) {
    let result = '';
    let numbers = '0123456789';
    let numbersLength = numbers.length;
    for (let i = 0; i < length; i++) {
        result += numbers.charAt(Math.floor(Math.random() * numbersLength));
    }
    return result;
}

/**
 * @summary This function is used to press Enter Key
 * @returns {Promise<void>}
 */
async function pressEnter() {
    await page.keyboard.down('Enter')
    await page.keyboard.up('Enter')
}

/**
 * @summary The method generates random number between min and max value
 * @param {number} min value
 * @param {number} max value
 * */
async function generateRandomNumberBetween(min, max) {
    return Math.floor((Math.random() * max) + 1);
}

/**
 * @summary The method checks if the element is visible.
 *
 * @param {Page} page the page's object.
 * @param {string} locator the element locator.
 * @param {number} [timeout] the max amount of time to to check if element is visible. Optional parameter.
 * @throws {CustomException} the customer error.
 * @returns {Promise<boolean>}
 *
 * 
 * */
async function isElementVisible(page, locator, timeout) {
    try {
        if (typeof (timeout) === 'undefined') {
            return await page.locator(locator).isVisible()
        } else {
            return await page.locator(locator).isVisible({timeout: timeout})
        }
    } catch (exec) {
        CustomException('Error occurred while checking if element is not visible.', locator, exec)
    }
}

/**
 * @summary The method gets the input value for the selected input or textarea or select element. More details: https://playwright.dev/docs/api/class-locator#locator-input-value
 *
 * @param {Page} page the page's object.
 * @param {string} locator the element locator.
 * @throws {CustomException} the customer error.
 * @returns {Promise<string>} the input value from the input or textarea or select element.
 *
 * 
 * */
async function getInputValue(page, locator) {
    return await page.locator(locator).inputValue()
}

/**
 * @summary The method removes non numeric characters from the string.
 * @returns {string} the string that contains only numbers.
 *
 * 
 */
function removeNonNumericCharacter(string) {
    return string.replace(/\D/g, '');
}

/**
 * @summary The method formats the date to given format.
 * @param {Date} dateToFormat the date to format.
 * @param {string} dateFormat the date format.
 * @returns {string} the formatted date.
 *
 * 
 */
function formatDate(dateToFormat, dateFormat) {
    return moment(dateToFormat).format(dateFormat)
}

/**
 * @summary The method gets the Country code based on the environment.
 *
 * @return {string} country code.
 *
 * 
 * */
function getCountryCodeBasedOnEnv() {
    let countryCode = ''
    if (env.toLowerCase().includes('nigeria'))
        countryCode = config.countryCodes.nigeria
    else if (env.toLowerCase().includes('kenya'))
        countryCode = config.countryCodes.kenya
    else if (env.toLowerCase().includes('ghana'))
        countryCode = config.countryCodes.ghana
    else if (env.toLowerCase().includes('ethiopia'))
        countryCode = config.countryCodes.ethiopia
    return countryCode
}


/**
 * @summary The method gets the Country dial prefix based on the environment.
 *
 * @return {string} dial prefix
 *
 * 
 * */
function getCountryDialPrefixBasedOnEnv() {
    let dialPrefix = ''
    if (env.toLowerCase().includes('nigeria'))
        dialPrefix = config.countryDialPrefix.nigeria
    else if (env.toLowerCase().includes('kenya'))
        dialPrefix = config.countryDialPrefix.kenya
    else if (env.toLowerCase().includes('ghana'))
        dialPrefix = config.countryDialPrefix.ghana
    else if (env.toLowerCase().includes('ethiopia'))
        dialPrefix = config.countryDialPrefix.ethiopia
    return dialPrefix
}

/**
 * @summary The method will sleep(stop test execution) for time given in milliseconds
 * @param {number} timeout in milliseconds
 * 
 */
async function sleep(timeout) {
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
    await sleep(timeout);
}

/**
 * @summary The method checks if the actual and expected values are equal. If not equal, either the expect fails with the custom message passed or with the pre-defined message.
 *
 * @param {(number,Date)} actualValue The actual value.
 * @param {(number,Date)} expectedValue The expected value.
 * @param {string} [customMessage] The custom message to be displayed on failure. Optional argument.
 *
 * 
 */
function expectValueToBeAbove(actualValue, expectedValue, customMessage) {
    if (customMessage === undefined) {
        expect(actualValue, '\n[Failure Message]: Actual and expected values are not equal.\nActual value: ' + actualValue + '\nExpected value: ' + expectedValue + '\n').to.be.above(expectedValue)
    } else {
        expect(actualValue, '\n[Failure Message]: ' + customMessage + '\n').to.equal(expectedValue)
    }
}

/**
 * @summary The method gets the element from Iframe.
 *
 * @param {Page} page the page's object.
 * @param {string} frameLocator the element locator.
 * @param {string} iLocator the element locator.
 * 
 */
async function getIFrameElement(page, frameLocator, iLocator) {
    try {
        const fLocator = await page.frameLocator(frameLocator);
        return await fLocator.locator(iLocator);
    } catch (exec) {
        CustomException('Failed to find locator', framelocator, iLocator, exec)
    }
}

/**
 * @summary The method gets the element from Iframe and runs defined action. await helpers.iframeAction(page,frameLocator,iLocator,'type',text);
 *
 * @param {Page} page the page's object.
 * @param {string} frameLocator the iframe locator.
 * @param {string} iLocator locator inside the iframe.
 * @param {Array} ...args Array of elements action || action, text
 * 
 * */
async function iframeAction(page, frameLocator, iLocator, ...args) {
    try {
        const fLocator = await page.frameLocator(frameLocator);
        const action = args[0];
        if (action === "click") {
            return await fLocator.locator(iLocator).click();
        } else if (action === "type" && (typeof args[1]) !== 'undefined') {
            return await fLocator.locator(iLocator).type(args[1]);
        } else if (action === "fill" && (typeof args[1]) !== 'undefined') {
            return await fLocator.locator(iLocator).fill(args[1]);
        }
    } catch (exec) {
        CustomException('Failed to find locator', frameLocator, iLocator, exec)
    }
}


/**
 * @summary The method return name of the country from env.
 *
 *
 */
function getCountryName() {
    let countryName = ''
    if (env.toLowerCase().includes('nigeria'))
        countryName = "nigeria"
    else if (env.toLowerCase().includes('kenya'))
        countryName = "kenya"
    else if (env.toLowerCase().includes('ghana'))
        countryName = "ghana"
    else if (env.toLowerCase().includes('ethiopia'))
        countryName = "ethiopia"
    return countryName
}



/**
 * @summary The method checks if the element is disabled.
 *
 * @param {Page} page the page's object.
 * @param {string} locator the element locator.
 * @param {number} [timeout] the max amount of time to to check if element is disabled. Optional parameter.
 * @throws {CustomException} the customer error.
 * @returns {Promise<boolean>}
 *
 * 
 * */
async function isElementDisabled(page, locator, timeout) {
    try {
        if (typeof (timeout) === 'undefined') {
            return await page.locator(locator).isDisabled()
        } else {
            return await page.locator(locator).isDisabled({timeout: timeout})
        }
    } catch (exec) {
        CustomException('Error occurred while checking if element is disabled.', locator, exec)
    }
}

/**
 * @summary The method verifies/asserts the element is disabled
 *
 * @param {Page} page the page's object.
 * @param {string} locator the element locator.
 * @param {number} [timeout] the max amount of time to to check if element is disabled. Optional parameter.
 * @throws {CustomException} the customer error.
 * @returns {Promise<boolean>}
 *
 * 
 * */
async function verifyElementIsDisabled(page, locator, timeout) {
    if (!await isElementDisabled(page, locator, timeout))
        expectFail('[Failure Message]: The element is not disabled.\n[Expected value]: The element should be disabled.\n[Locator]: ' + locator)
}

/**
 * @summary The method checks if the element is checked.
 *
 * @param {Page} page the page's object.
 * @param {string} locator the element locator.
 * @param {number} [timeout] the max amount of time to to check if element is disabled. Optional parameter.
 * @throws {CustomException} the customer error.
 * @returns {Promise<boolean>}
 *
 * 
 * */
async function isElementChecked(page, locator, timeout) {
    try {
        if (typeof (timeout) === 'undefined') {
            return await page.locator(locator).isChecked()
        } else {
            return await page.locator(locator).isChecked({timeout: timeout})
        }
    } catch (exec) {
        CustomException('Error occurred while checking if element is checked.', locator, exec)
    }
}

/**
 * @summary The method verifies/asserts the element is checked.
 *
 * @param {Page} page the page's object.
 * @param {string} locator the element locator.
 * @param {number} [timeout] the max amount of time to to check if element is checked. Optional parameter.
 * @throws {CustomException} the customer error.
 * @returns {Promise<void>}
 *
 * 
 * */
async function verifyElementIsChecked(page, locator, timeout) {
    if (!await isElementChecked(page, locator, timeout))
        expectFail('[Failure Message]: The element is not checked.\n[Expected value]: Element should be checked.\n[Locator]: ' + locator)
}

/**
 * @summary The method verifies/asserts the element is disabled.
 *
 * @param {Page} page the page's object.
 * @param {string} locator the element locator.
 * @param {number} [timeout] the max amount of time to to check if element is disabled. Optional parameter.
 * @throws {CustomException} the customer error.
 * @returns {Promise<void>}
 *
 * 
 * */
async function verifyElementIsUnChecked(page, locator, timeout) {
    if (await isElementChecked(page, locator, timeout))
        expectFail('[Failure Message]: The element is checked.\n[Expected value]: Element should not be checked.\n[Locator]: ' + locator)
}

/**
 * @description The method checks a radio button or a checkbox. This method can be used with input[type=checkbox], input[type=radio],
 * [role=checkbox] or label associated with checkbox or radio button.
 *
 * @param {Page} page the page's object.
 * @param {string} locator the element locator.
 * @param {number} [timeout] the max amount of time to to check if element is disabled. Optional parameter.
 * @throws {CustomException} the customer error.
 * @returns {Promise<void>}
 *
 * 
 * */
async function checkRadioOrCheckbox(page, locator, timeout) {
    try {
        if (typeof (timeout) === 'undefined') {
            return await page.locator(locator).check()
        } else {
            return await page.locator(locator).check({timeout: timeout})
        }
    } catch (exec) {
        CustomException('Error occurred while performing check operation on the element.', locator, exec)
    }
}

/**
 * @description The method checks a radio button or a checkbox. This method can be used with input[type=checkbox], input[type=radio],
 * [role=checkbox] or label associated with checkbox or radio button.
 *
 * @param {Page} page the page's object.
 * @param {string} locator the element locator.
 * @param {number} [timeout] the max amount of time to to check if element is disabled. Optional parameter.
 * @throws {CustomException} the customer error.
 * @returns {Promise<void>}
 *
 * 
 * */
async function uncheckRadioOrCheckbox(page, locator, timeout) {
    try {
        if (typeof (timeout) === 'undefined') {
            return await page.locator(locator).uncheck()
        } else {
            return await page.locator(locator).uncheck({timeout: timeout})
        }
    } catch (exec) {
        CustomException('Error occurred while performing uncheck operation on the element.', locator, exec)
    }
}

/**
 * @description The method function converts the string array to float array
 *
 * @param {array} stringArray
 *
 * 
 * */
function convertStringArrayToFloatArray(stringArray) {
    return stringArray.map(Number)
}

/**
 * @description The method will get max value from number array
 *
 * @param {array}
 *
 * 
 * */
function getMaxValueFromNumberArray(array) {
    return Math.max.apply(Math, array)
}

/**
 * @description The method will get min value from number array
 *
 * @param {array}
 *
 * 
 * */
function getMinValueFromNumberArray(array) {
    return Math.min.apply(Math, array)
}


/**
 * @description The method gets all the attribute names of the element as an Array of strings.
 * If the element has no attributes it returns an empty array.
 *
 * @param {Page} page the page's object.
 * @param {string} locator the element locator.
 * @throws {CustomException} the customer error.
 *
 * 
 * */
async function getElementAttributeNames(page, locator) {
    try {
        let element = await page.locator(locator)
        return await element.evaluate(async (el) => el.getAttributeNames())
    } catch (exec) {
        CustomException('Error occurred while fetching the attribute names of the element.', locator, exec)
    }
}

/**
 * @summary The method checks if typeof key is undefined. And returns boolean value
 * @param key the key to check for undefined.
 * @return {boolean} true is undefined else false.
 *
 * 
 */
function isKeyUndefined(key) {
    return typeof (key) === 'undefined'
}

/**
 * @summary The method gets the locator object.
 * @param {Page} page the page's object.
 * @param {string} locator the element locator.
 * @throws {CustomException} the customer error.
 * @return {Promise<*>}
 *
 * 
 */
async function getElementLocator(page, locator) {
    try {
        return await page.locator(locator)
    } catch (exec) {
        CustomException('Error occurred while getting the element locator.', locator, exec)
    }
}

/**
 * @summary The method uses playwright expect and asserts the element is checked or unchecked.
 * @param {Page} page the page's object.
 * @param {string} locator the element locator.
 * @param {number} [timeout] the max amount of time to assert element is checked. Optional parameter.
 * @param {boolean} [shouldBeChecked] if value undefined or not passed by default method asserts element is checked. If value is false, then method asserts element is unchecked. Optional parameter.
 * @return {Promise<void>}
 *
 * 
 */
async function expectElementToBeChecked(page, locator, timeout, shouldBeChecked) {
    let elementLocator = await getElementLocator(page, locator)
    if (isKeyUndefined(timeout) && (isKeyUndefined(shouldBeChecked) || shouldBeChecked === true)) {
        await pwExpect(elementLocator, '[Failure Message]: Element is not checked.\n[Expected]: Element should be checked.').toBeChecked()
    } else if (!isKeyUndefined(timeout) && (isKeyUndefined(shouldBeChecked) || shouldBeChecked === true)) {
        await pwExpect(elementLocator, '[Failure Message]: Element is not checked.\n[Expected]: Element should be checked.').toBeChecked({timeout: timeout})
    } else if (isKeyUndefined(timeout) && shouldBeChecked === false) {
        await pwExpect(elementLocator, '[Failure Message]: Element is checked.\n[Expected]: Element should not be checked.').toBeChecked({checked: shouldBeChecked})
    } else if (!isKeyUndefined(timeout) && shouldBeChecked === false) {
        await pwExpect(elementLocator, '[Failure Message]: Element is checked.\n[Expected]: Element should not be checked.').toBeChecked({
            timeout: timeout,
            checked: shouldBeChecked
        })
    }
}

/**
 * @description The method uses playwright expect and asserts the element is disabled.
 * <pre>
 *     a. Element is disabled if it has "disabled" attribute or is disabled via 'aria-disabled'.
 *     b. Only native control elements such as HTML button, input, select, textarea, option, optgroup can be disabled by setting "disabled" attribute.
 *     c. "disabled" attribute on other elements is ignored by the browser.
 * </pre>
 * @param {Page} page the page's object.
 * @param {string} locator the element locator.
 * @param {number} [timeout] the max amount of time to assert element is disabled. Optional parameter.
 * @return {Promise<void>}
 *
 * 
 */
async function expectElementToBeDisabled(page, locator, timeout) {
    let elementLocator = await getElementLocator(page, locator)
    if (isKeyUndefined(timeout))
        await pwExpect(elementLocator, '[Failure Message]: Element is not disabled.\n[Expected]: Element should be disabled.').toBeDisabled()
    else
        await pwExpect(elementLocator, '[Failure Message]: Element is not disabled.\n[Expected]: Element should be disabled.').toBeDisabled({timeout: timeout})
}

/**
 * @description The method uses playwright expect and asserts the element is not disabled.
 * <pre>
 *     a. Element is disabled if it has "disabled" attribute or is disabled via 'aria-disabled'.
 *     b. Only native control elements such as HTML button, input, select, textarea, option, optgroup can be disabled by setting "disabled" attribute.
 *     c. "disabled" attribute on other elements is ignored by the browser.
 * </pre>
 * @param {Page} page the page's object.
 * @param {string} locator the element locator.
 * @param {number} [timeout] the max amount of time to assert element is disabled. Optional parameter.
 * @return {Promise<void>}
 *
 * 
 */
async function expectElementToBeNotDisabled(page, locator, timeout) {
    let elementLocator = await getElementLocator(page, locator)
    if (isKeyUndefined(timeout))
        await pwExpect(elementLocator, '[Failure Message]: Element is disabled.\n[Expected]: Element should not be disabled.').not.toBeDisabled()
    else
        await pwExpect(elementLocator, '[Failure Message]: Element is disabled.\n[Expected]: Element should not be disabled.').not.toBeDisabled({timeout: timeout})
}

/**
 * @summary The method uses playwright expect and asserts the element is editable.
 * @param {Page} page the page's object.
 * @param {string} locator the element locator.
 * @param {number} [timeout] the max amount of time to assert element is editable. Optional parameter.
 * @return {Promise<void>}
 *
 * 
 */
async function expectElementToBeEditable(page, locator, timeout) {
    let elementLocator = await getElementLocator(page, locator)
    if (isKeyUndefined(timeout))
        await pwExpect(elementLocator, '[Failure Message]: Element is not editable.\n[Expected]: Element should be editable.').toBeEditable()
    else
        await pwExpect(elementLocator, '[Failure Message]: Element is not editable.\n[Expected]: Element should be editable.').toBeEditable({timeout: timeout})
}

/**
 * @summary The method uses playwright expect and asserts the element is not editable.
 * @param {Page} page the page's object.
 * @param {string} locator the element locator.
 * @param {number} [timeout] the max amount of time to assert element is editable. Optional parameter.
 * @return {Promise<void>}
 *
 * 
 */
async function expectElementToBeNotEditable(page, locator, timeout) {
    let elementLocator = await getElementLocator(page, locator)
    if (isKeyUndefined(timeout))
        await pwExpect(elementLocator, '[Failure Message]: Element is editable.\n[Expected]: Element should be not editable.').not.toBeEditable()
    else
        await pwExpect(elementLocator, '[Failure Message]: Element is editable.\n[Expected]: Element should be not editable.').not.toBeEditable({timeout: timeout})
}

/**
 * @description The method uses playwright expect and asserts the element is empty. That is it ensures the locator points to an empty editable element or to a DOM node that has no text.
 * @param {Page} page the page's object.
 * @param {string} locator the element locator.
 * @param {number} [timeout] the max amount of time to assert element is empty. Optional parameter.
 * @return {Promise<void>}
 *
 * 
 */
async function expectElementToBeEmpty(page, locator, timeout) {
    let elementLocator = await getElementLocator(page, locator)
    if (isKeyUndefined(timeout))
        await pwExpect(elementLocator, '[Failure Message]: Element is not empty.\n[Expected]: Element should be empty.').toBeEmpty()
    else
        await pwExpect(elementLocator, '[Failure Message]: Element is not empty.\n[Expected]: Element should be empty.').toBeEmpty({timeout: timeout})
}

/**
 * @description The method uses playwright expect and asserts the element is not empty. That is it ensures the locator points to an empty editable element or to a DOM node that has text.
 * @param {Page} page the page's object.
 * @param {string} locator the element locator.
 * @param {number} [timeout] the max amount of time to assert element is not empty. Optional parameter.
 * @return {Promise<void>}
 *
 * 
 */
async function expectElementToBeNotEmpty(page, locator, timeout) {
    let elementLocator = await getElementLocator(page, locator)
    if (isKeyUndefined(timeout))
        await pwExpect(elementLocator, '[Failure Message]: Element is empty.\n[Expected]: Element should not be empty.').not.toBeEmpty()
    else
        await pwExpect(elementLocator, '[Failure Message]: Element is empty.\n[Expected]: Element should not be empty.').not.toBeEmpty({timeout: timeout})
}

/**
 * @description The method uses playwright expect and asserts the element is enabled.
 * @param {Page} page the page's object.
 * @param {string} locator the element locator.
 * @param {number} [timeout] the max amount of time to assert element is enabled. Optional parameter.
 * @return {Promise<void>}
 *
 * 
 */
async function expectElementToBeEnabled(page, locator, timeout) {
    let elementLocator = await getElementLocator(page, locator)
    if (isKeyUndefined(timeout))
        await pwExpect(elementLocator, '[Failure Message]: Element is not enabled.\n[Expected]: Element should be enabled.').toBeEnabled()
    else
        await pwExpect(elementLocator, '[Failure Message]: Element is not enabled.\n[Expected]: Element should be enabled.').toBeEnabled({timeout: timeout})
}

/**
 * @description The method uses playwright expect and asserts the element is not enabled.
 * @param {Page} page the page's object.
 * @param {string} locator the element locator.
 * @param {number} [timeout] the max amount of time to assert element is not enabled. Optional parameter.
 * @return {Promise<void>}
 *
 * 
 */
async function expectElementToBeNotEnabled(page, locator, timeout) {
    let elementLocator = await getElementLocator(page, locator)
    if (isKeyUndefined(timeout))
        await pwExpect(elementLocator, '[Failure Message]: Element is enabled.\n[Expected]: Element should not be enabled.').not.toBeEnabled()
    else
        await pwExpect(elementLocator, '[Failure Message]: Element is enabled.\n[Expected]: Element should not be enabled.').not.toBeEnabled({timeout: timeout})
}

/**
 * @description The method uses playwright expect and asserts the element is focused.
 * @param {Page} page the page's object.
 * @param {string} locator the element locator.
 * @param {number} [timeout] the max amount of time to assert element is focused. Optional parameter.
 * @return {Promise<void>}
 *
 * 
 */
async function expectElementToBeFocused(page, locator, timeout) {
    let elementLocator = await getElementLocator(page, locator)
    if (isKeyUndefined(timeout))
        await pwExpect(elementLocator, '[Failure Message]: Element is not focused.\n[Expected]: Element should be focused.').toBeFocused()
    else
        await pwExpect(elementLocator, '[Failure Message]: Element is not focused.\n[Expected]: Element should be focused.').toBeFocused({timeout: timeout})
}

/**
 * @description The method uses playwright expect and asserts the element is not focused.
 * @param {Page} page the page's object.
 * @param {string} locator the element locator.
 * @param {number} [timeout] the max amount of time to assert element is not focused. Optional parameter.
 * @return {Promise<void>}
 *
 * 
 */
async function expectElementToBeNotFocused(page, locator, timeout) {
    let elementLocator = await getElementLocator(page, locator)
    if (isKeyUndefined(timeout))
        await pwExpect(elementLocator, '[Failure Message]: Element is focused.\n[Expected]: Element should not be focused.').not.toBeFocused()
    else
        await pwExpect(elementLocator, '[Failure Message]: Element is focused.\n[Expected]: Element should not be focused.').not.toBeFocused({timeout: timeout})
}

/**
 * @description The method uses playwright expect and asserts the element is hidden.
 * @param {Page} page the page's object.
 * @param {string} locator the element locator.
 * @param {number} [timeout] the max amount of time to assert element is hidden. Optional parameter.
 * @return {Promise<void>}
 *
 * 
 */
async function expectElementToBeHidden(page, locator, timeout) {
    let elementLocator = await getElementLocator(page, locator)
    if (isKeyUndefined(timeout))
        await pwExpect(elementLocator, '[Failure Message]: Element is not hidden.\n[Expected]: Element should be hidden.').toBeHidden()
    else
        await pwExpect(elementLocator, '[Failure Message]: Element is not hidden.\n[Expected]: Element should be hidden.').toBeHidden({timeout: timeout})
}

/**
 * @description The method uses playwright expect and asserts the element is not hidden.
 * @param {Page} page the page's object.
 * @param {string} locator the element locator.
 * @param {number} [timeout] the max amount of time to assert element is not hidden. Optional parameter.
 * @return {Promise<void>}
 *
 * 
 */
async function expectElementToBeNotHidden(page, locator, timeout) {
    let elementLocator = await getElementLocator(page, locator)
    if (isKeyUndefined(timeout))
        await pwExpect(elementLocator, '[Failure Message]: Element is hidden.\n[Expected]: Element should not be hidden.').not.toBeHidden()
    else
        await pwExpect(elementLocator, '[Failure Message]: Element is hidden.\n[Expected]: Element should not be hidden.').not.toBeHidden({timeout: timeout})
}

/**
 * @description The method uses playwright expect and asserts the element is visible.
 * @param {Page} page the page's object.
 * @param {string} locator the element locator.
 * @param {number} [timeout] the max amount of time to assert element is visible. Optional parameter.
 * @return {Promise<void>}
 *
 * 
 */
async function expectElementToBeVisible(page, locator, timeout) {
    let elementLocator = await getElementLocator(page, locator)
    if (isKeyUndefined(timeout))
        await pwExpect(elementLocator, '[Failure Message]: Element is not visible.\n[Expected]: Element should be visible.').toBeVisible()
    else
        await pwExpect(elementLocator, '[Failure Message]: Element is not visible.\n[Expected]: Element should be visible.').toBeVisible({timeout: timeout})
}

/**
 * @description The method uses playwright expect and asserts the element is not visible.
 * @param {Page} page the page's object.
 * @param {string} locator the element locator.
 * @param {number} [timeout] the max amount of time to assert element is not visible. Optional parameter.
 * @return {Promise<void>}
 *
 * 
 */
async function expectElementToBeNotVisible(page, locator, timeout) {
    let elementLocator = await getElementLocator(page, locator)
    if (isKeyUndefined(timeout))
        await pwExpect(elementLocator, '[Failure Message]: Element is visible.\n[Expected]: Element should not be visible.').not.toBeVisible()
    else
        await pwExpect(elementLocator, '[Failure Message]: Element is visible.\n[Expected]: Element should not be visible.').not.toBeVisible({timeout: timeout})
}

/**
 * @summary The method uses playwright expect and asserts the element contains the text.
 * @param {Page} page the page's object.
 * @param {string} locator the element locator.
 * @param {number} [timeout] the max amount of time to assert element contains the text. Optional parameter.
 * @param {string, Array<string|RegExp>, RegExp} expected the expected substring or regex or list of those.
 * @param {boolean} [shouldUseInnerText] whether to use element.innerText instead of element.textContent when retrieving DOM node text. Optional parameter.
 * @return {Promise<void>}
 *
 * 
 */
async function expectElementToContainText(page, locator, expected, timeout, shouldUseInnerText) {
    let elementLocator = await getElementLocator(page, locator)
    if (isKeyUndefined(shouldUseInnerText))
        shouldUseInnerText = false
    else
        shouldUseInnerText = true

    if (isKeyUndefined(timeout) && shouldUseInnerText === true) {
        await pwExpect(elementLocator, '[Failure Message]: InnerText | Element does not contain text : ' + expected + '\n[Expected]: InnerText | Element should contain text:' + expected).toContainText(expected, {useInnerText: shouldUseInnerText})
    } else if (!isKeyUndefined(timeout) && shouldUseInnerText === true) {
        await pwExpect(elementLocator, '[Failure Message]: InnerText | Element does not contain text : ' + expected + '\n[Expected]: InnerText | Element should contain text:' + expected).toContainText(expected, {
            timeout: timeout,
            useInnerText: shouldUseInnerText
        })
    } else if (isKeyUndefined(timeout) && shouldUseInnerText === false) {
        await pwExpect(elementLocator, '[Failure Message]: TextContent | Element does not contain text : ' + expected + '\n[Expected]: TextContent | Element should contain text:' + expected).toContainText(expected, {useInnerText: shouldUseInnerText})
    } else if (!isKeyUndefined(timeout) && shouldUseInnerText === false) {
        await pwExpect(elementLocator, '[Failure Message]: TextContent | Element does not contain text : ' + expected + '\n[Expected]: TextContent | Element should contain text:' + expected).toContainText(expected, {
            timeout: timeout,
            useInnerText: shouldUseInnerText
        })
    }
}

/**
 * @summary The method uses playwright expect and asserts the element does not contains the text.
 * @param {Page} page the page's object.
 * @param {string} locator the element locator.
 * @param {number} [timeout] the max amount of time to assert element does not contains the text. Optional parameter.
 * @param {string, Array<string|RegExp>, RegExp} expected the expected substring or regex or list of those.
 * @param {boolean} [shouldUseInnerText] whether to use element.innerText instead of element.textContent when retrieving DOM node text. Optional parameter.
 * @return {Promise<void>}
 *
 * 
 */
async function expectElementToNotContainText(page, locator, expected, timeout, shouldUseInnerText) {
    let elementLocator = await getElementLocator(page, locator)
    if (isKeyUndefined(shouldUseInnerText))
        shouldUseInnerText = false
    else
        shouldUseInnerText = true

    if (isKeyUndefined(timeout) && shouldUseInnerText === true) {
        await pwExpect(elementLocator, '[Failure Message]: InnerText | Element contains text : ' + expected + '\n[Expected]: InnerText | Element should not contain text:' + expected).not.toContainText(expected, {useInnerText: shouldUseInnerText})
    } else if (!isKeyUndefined(timeout) && shouldUseInnerText === true) {
        await pwExpect(elementLocator, '[Failure Message]: InnerText | Element contains text : ' + expected + '\n[Expected]: InnerText | Element should not contain text:' + expected).not.toContainText(expected, {
            timeout: timeout,
            useInnerText: shouldUseInnerText
        })
    } else if (isKeyUndefined(timeout) && shouldUseInnerText === false) {
        await pwExpect(elementLocator, '[Failure Message]: TextContent | Element contains text : ' + expected + '\n[Expected]: TextContent | Element should not contain text:' + expected).not.toContainText(expected, {useInnerText: shouldUseInnerText})
    } else if (!isKeyUndefined(timeout) && shouldUseInnerText === false) {
        await pwExpect(elementLocator, '[Failure Message]: TextContent | Element contains text : ' + expected + '\n[Expected]: TextContent | Element should not contain text:' + expected).not.toContainText(expected, {
            timeout: timeout,
            useInnerText: shouldUseInnerText
        })
    }
}

/**
 * @summary The method uses playwright expect and asserts the element attribute key has the value.
 * @param {Page} page the page's object.
 * @param {string} locator the element locator.
 * @param {number} [timeout] the max amount of time to assert element has attribute. Optional parameter.
 * @param {string} attributeKey the attribute key.
 * @param {string, RegExp} attributeValue the expected attribute value.
 * @return {Promise<void>}
 *
 * 
 */
async function expectElementToHaveAttribute(page, locator, attributeKey, attributeValue, timeout) {
    let elementLocator = await getElementLocator(page, locator)
    if (isKeyUndefined(timeout))
        await pwExpect(elementLocator, '[Failure Message]: Element attribute, ' + attributeKey + ', does not have value:' + attributeValue + '\n[Expected]: Element attribute, ' + attributeKey + ', should  have value:' + attributeValue).toHaveAttribute(attributeKey, attributeValue)
    else
        await pwExpect(elementLocator, '[Failure Message]: Element attribute, ' + attributeKey + ', does not have value:' + attributeValue + '\n[Expected]: Element attribute, ' + attributeKey + ', should  have value:' + attributeValue).toHaveAttribute(attributeKey, attributeValue, {timeout: timeout})
}

/**
 * @summary The method uses playwright expect and asserts the element has the exact number of DOM nodes.
 * @param {Page} page the page's object.
 * @param {string} locator the element locator.
 * @param {number} [timeout] the max amount of time to assert element has count. Optional parameter.
 * @param {number} expectedCount the expected count.
 * @return {Promise<void>}
 *
 * 
 */
async function expectElementToHaveCount(page, locator, expectedCount, timeout) {
    let elementLocator = await getElementLocator(page, locator)
    if (isKeyUndefined(timeout))
        await pwExpect(elementLocator, '[Failure Message]: Element does not have count: ' + expectedCount + '\n[Expected]: Element should have count: ' + expectedCount).toHaveCount(expectedCount)
    else
        await pwExpect(elementLocator, '[Failure Message]: Element does not have count: ' + expectedCount + '\n[Expected]: Element should have count: ' + expectedCount).toHaveCount(expectedCount, {timeout: timeout})
}

/**
 * @summary The method uses playwright expect and asserts the element does not have the exact number of DOM nodes.
 * @param {Page} page the page's object.
 * @param {string} locator the element locator.
 * @param {number} [timeout] the max amount of time to assert element does not have the count. Optional parameter.
 * @param {number} expectedCount the expected count.
 * @return {Promise<void>}
 *
 * 
 */
async function expectElementToNotHaveCount(page, locator, expectedCount, timeout) {
    let elementLocator = await getElementLocator(page, locator)
    if (isKeyUndefined(timeout))
        await pwExpect(elementLocator, '[Failure Message]: Element has count: ' + expectedCount + '\n[Expected]: Element should not have count: ' + expectedCount).not.toHaveCount(expectedCount)
    else
        await pwExpect(elementLocator, '[Failure Message]: Element has count: ' + expectedCount + '\n[Expected]: Element should not have count: ' + expectedCount).not.toHaveCount(expectedCount, {timeout: timeout})
}

/**
 * @summary The method uses playwright expect and asserts the element has css.
 * @param {Page} page the page's object.
 * @param {string} locator the element locator.
 * @param {number} [timeout] the max amount of time to assert element has css. Optional parameter.
 * @param {string} cssPropertyKey the css property key.
 * @param {string, RegExp} cssPropertyValue the css property value.
 * @return {Promise<void>}
 *
 * 
 */
async function expectElementToHaveCSS(page, locator, cssPropertyKey, cssPropertyValue, timeout) {
    let elementLocator = await getElementLocator(page, locator)
    if (isKeyUndefined(timeout))
        await pwExpect(elementLocator, '[Failure Message]: Element CSS property, ' + cssPropertyKey + ', does not have value:' + cssPropertyValue + '\n[Expected]: Element CSS property, ' + cssPropertyKey + ', should have value:' + cssPropertyValue).toHaveCSS(cssPropertyKey, cssPropertyValue)
    else
        await pwExpect(elementLocator, '[Failure Message]: Element CSS property, ' + cssPropertyKey + ', does not have value:' + cssPropertyValue + '\n[Expected]: Element CSS property, ' + cssPropertyKey + ', should have value:' + cssPropertyValue).toHaveCSS(cssPropertyKey, cssPropertyValue, {timeout: timeout})
}

/**
 * @description The method uses playwright expect and asserts the element does not have css.
 * Ensures the locator resolves to an element with the given computed CSS style.
 * @param {Page} page the page's object.
 * @param {string} locator the element locator.
 * @param {number} [timeout] the max amount of time to assert element does not have css. Optional parameter.
 * @param {string} cssPropertyKey the css property key.
 * @param {string, RegExp} cssPropertyValue the css property value.
 * @return {Promise<void>}
 *
 * 
 */
async function expectElementToNotHaveCSS(page, locator, cssPropertyKey, cssPropertyValue, timeout) {
    let elementLocator = await getElementLocator(page, locator)
    if (isKeyUndefined(timeout))
        await pwExpect(elementLocator, '[Failure Message]: Element CSS property, ' + cssPropertyKey + ', has value:' + cssPropertyValue + '\n[Expected]: Element CSS property, ' + cssPropertyKey + ', should not have value:' + cssPropertyValue).not.toHaveCSS(cssPropertyKey, cssPropertyValue)
    else
        await pwExpect(elementLocator, '[Failure Message]: Element CSS property, ' + cssPropertyKey + ', has value:' + cssPropertyValue + '\n[Expected]: Element CSS property, ' + cssPropertyKey + ', should  have value:' + cssPropertyValue).not.toHaveCSS(cssPropertyKey, cssPropertyValue, {timeout: timeout})
}

/**
 * @description The method uses playwright expect and asserts the element has js property.Ensures the Locator points to an element with given JavaScript property.
 * Note that this property can be of a primitive type as well as a plain serializable JavaScript object.
 * @param {Page} page the page's object.
 * @param {string} locator the element locator.
 * @param {number} [timeout] the max amount of time to assert element has js property. Optional parameter.
 * @param {string} propertyKey the js property key.
 * @param {string, RegExp} propertyValue the property value.
 * @return {Promise<void>}
 *
 * 
 */
async function expectElementToHaveJSProperty(page, locator, propertyKey, propertyValue, timeout) {
    let elementLocator = await getElementLocator(page, locator)
    if (isKeyUndefined(timeout))
        await pwExpect(elementLocator, '[Failure Message]: Element JS property, ' + propertyKey + ', does not have value:' + propertyValue + '\n[Expected]: Element JS property, ' + propertyKey + ', should  have value:' + propertyValue).toHaveJSProperty(propertyKey, propertyValue)
    else
        await pwExpect(elementLocator, '[Failure Message]: Element JS property, ' + propertyKey + ', does not have value:' + propertyValue + '\n[Expected]: Element JS property, ' + propertyKey + ', should  have value:' + propertyValue).toHaveJSProperty(propertyKey, propertyValue, {timeout: timeout})
}

/**
 * @description The method uses playwright expect and asserts the element does not have js property.Ensures the Locator points to an element with given JavaScript property.
 * Note that this property can be of a primitive type as well as a plain serializable JavaScript object.
 * @param {Page} page the page's object.
 * @param {string} locator the element locator.
 * @param {number} [timeout] the max amount of time to assert element does not js property. Optional parameter.
 * @param {string} propertyKey the js property key.
 * @param {string, RegExp} propertyValue the property value.
 * @return {Promise<void>}
 *
 * 
 */
async function expectElementToNotHaveJSProperty(page, locator, propertyKey, propertyValue, timeout) {
    let elementLocator = await getElementLocator(page, locator)
    if (isKeyUndefined(timeout))
        await pwExpect(elementLocator, '[Failure Message]: Element JS property, ' + propertyKey + ', has value:' + propertyValue + '\n[Expected]: Element JS property, ' + propertyKey + ', should not have value:' + propertyValue).not.toHaveJSProperty(propertyKey, propertyValue)
    else
        await pwExpect(elementLocator, '[Failure Message]: Element JS property, ' + propertyKey + ', has value:' + propertyValue + '\n[Expected]: Element JS property, ' + propertyKey + ', should not have value:' + propertyValue).not.toHaveJSProperty(propertyKey, propertyValue, {timeout: timeout})
}

/**
 * @summary The method uses playwright expect and asserts the element has the text.
 * @param {Page} page the page's object.
 * @param {string} locator the element locator.
 * @param {number} [timeout] the max amount of time to assert element has the text. Optional parameter.
 * @param {string, Array<string|RegExp>, RegExp} expected the expected substring or regex or list of those.
 * @param {boolean} [shouldUseInnerText] whether to use element.innerText instead of element.textContent when retrieving DOM node text. Optional parameter.
 * @return {Promise<void>}
 *
 * 
 */
async function expectElementToHaveText(page, locator, expected, timeout, shouldUseInnerText) {
    let elementLocator = await getElementLocator(page, locator)
    if (isKeyUndefined(shouldUseInnerText))
        shouldUseInnerText = false
    else
        shouldUseInnerText = true

    if (isKeyUndefined(timeout) && shouldUseInnerText === true) {
        await pwExpect(elementLocator, '[Failure Message]: InnerText | Element does not have text : ' + expected + '\n[Expected]: InnerText | Element should have text:' + expected).toHaveText(expected, {useInnerText: shouldUseInnerText})
    } else if (!isKeyUndefined(timeout) && shouldUseInnerText === true) {
        await pwExpect(elementLocator, '[Failure Message]: InnerText | Element does not have text : ' + expected + '\n[Expected]: InnerText | Element should have text:' + expected).toHaveText(expected, {
            timeout: timeout,
            useInnerText: shouldUseInnerText
        })
    } else if (isKeyUndefined(timeout) && shouldUseInnerText === false) {
        await pwExpect(elementLocator, '[Failure Message]: TextContent | Element does not have text : ' + expected + '\n[Expected]: TextContent | Element should have text:' + expected).toHaveText(expected, {useInnerText: shouldUseInnerText})
    } else if (!isKeyUndefined(timeout) && shouldUseInnerText === false) {
        await pwExpect(elementLocator, '[Failure Message]: TextContent | Element does not have text : ' + expected + '\n[Expected]: TextContent | Element should have text:' + expected).toHaveText(expected, {
            timeout: timeout,
            useInnerText: shouldUseInnerText
        })
    }
}

/**
 * @summary The method uses playwright expect and asserts the element does not have the text.
 * @param {Page} page the page's object.
 * @param {string} locator the element locator.
 * @param {number} [timeout] the max amount of time to assert element does not have the text. Optional parameter.
 * @param {string, Array<string|RegExp>, RegExp} expected the expected substring or regex or list of those.
 * @param {boolean} [shouldUseInnerText] whether to use element.innerText instead of element.textContent when retrieving DOM node text. Optional parameter.
 * @return {Promise<void>}
 *
 * 
 */
async function expectElementToNotHaveText(page, locator, expected, timeout, shouldUseInnerText) {
    let elementLocator = await getElementLocator(page, locator)
    if (isKeyUndefined(shouldUseInnerText))
        shouldUseInnerText = false
    else
        shouldUseInnerText = true

    if (isKeyUndefined(timeout) && shouldUseInnerText === true) {
        await pwExpect(elementLocator, '[Failure Message]: InnerText | Element has text : ' + expected + '\n[Expected]: InnerText | Element should not have text:' + expected).not.toHaveText(expected, {useInnerText: shouldUseInnerText})
    } else if (!isKeyUndefined(timeout) && shouldUseInnerText === true) {
        await pwExpect(elementLocator, '[Failure Message]: InnerText | Element has text : ' + expected + '\n[Expected]: InnerText | Element should not have text:' + expected).not.toHaveText(expected, {
            timeout: timeout,
            useInnerText: shouldUseInnerText
        })
    } else if (isKeyUndefined(timeout) && shouldUseInnerText === false) {
        await pwExpect(elementLocator, '[Failure Message]: TextContent | Element has text : ' + expected + '\n[Expected]: TextContent | Element should not have text:' + expected).not.toHaveText(expected, {useInnerText: shouldUseInnerText})
    } else if (!isKeyUndefined(timeout) && shouldUseInnerText === false) {
        await pwExpect(elementLocator, '[Failure Message]: TextContent | Element has text : ' + expected + '\n[Expected]: TextContent | Element should not have text:' + expected).not.toHaveText(expected, {
            timeout: timeout,
            useInnerText: shouldUseInnerText
        })
    }
}

/**
 * @summary The method uses playwright expect and asserts the element has the given input value..
 * @param {Page} page the page's object.
 * @param {string} locator the element locator.
 * @param {number} [timeout] the max amount of time to assert element has the value. Optional parameter.
 * @param {string, Array<string|RegExp>, RegExp} expected the expected substring or regex or list of those.
 * @return {Promise<void>}
 *
 * 
 */
async function expectElementToHaveValue(page, locator, expected, timeout) {
    let elementLocator = await getElementLocator(page, locator)
    if (isKeyUndefined(timeout))
        await pwExpect(elementLocator, '[Failure Message]: Element does not have value: ' + expected + '\n[Expected]: Element should have value: ' + expected).toHaveValue(expected)
    else
        await pwExpect(elementLocator, '[Failure Message]: Element does not have value: ' + expected + '\n[Expected]: Element should have value: ' + expected).toHaveValue(expected, {timeout: timeout})
}

/**
 * @summary The method uses playwright expect and asserts the element does not have the given input value..
 * @param {Page} page the page's object.
 * @param {string} locator the element locator.
 * @param {number} [timeout] the max amount of time to assert element does not the value. Optional parameter.
 * @param {string, Array<string|RegExp>, RegExp} expected the expected substring or regex or list of those.
 * @return {Promise<void>}
 *
 * 
 */
async function expectElementToNotHaveValue(page, locator, expected, timeout) {
    let elementLocator = await getElementLocator(page, locator)
    if (isKeyUndefined(timeout))
        await pwExpect(elementLocator, '[Failure Message]: Element has value: ' + expected + '\n[Expected]: Element should not have value: ' + expected).not.toHaveValue(expected)
    else
        await pwExpect(elementLocator, '[Failure Message]: Element has value: ' + expected + '\n[Expected]: Element should not have value: ' + expected).not.toHaveValue(expected, {timeout: timeout})
}

/**
 * @summary The method uses playwright expect and asserts the page has the given title.
 * @param {Page} page the page's object.
 * @param {number} [timeout] the max amount of time to assert page has title. Optional parameter.
 * @param {string, RegExp} titleOrRegExp the expected title.
 * @return {Promise<void>}
 *
 * 
 */
async function expectPageHasTitle(page, titleOrRegExp, timeout) {
    if (isKeyUndefined(timeout))
        await pwExpect(page, '[Failure Message]: Page does not have title: ' + titleOrRegExp + '\n[Expected]: Page should have title: ' + titleOrRegExp).toHaveTitle(titleOrRegExp)
    else
        await pwExpect(page, '[Failure Message]: Page does not have title: ' + titleOrRegExp + '\n[Expected]: Page should have title: ' + titleOrRegExp).toHaveTitle(titleOrRegExp, {timeout: timeout})
}

/**
 * @summary The method uses playwright expect and asserts the page does have the given title.
 * @param {Page} page the page's object.
 * @param {number} [timeout] the max amount of time to assert page does not have title. Optional parameter.
 * @param {string, RegExp} titleOrRegExp the expected title.
 * @return {Promise<void>}
 *
 * 
 */
async function expectPageDoesNotHaveTitle(page, titleOrRegExp, timeout) {
    if (isKeyUndefined(timeout))
        await pwExpect(page, '[Failure Message]: Page has title: ' + titleOrRegExp + '\n[Expected]: Page should not have title: ' + titleOrRegExp).not.toHaveTitle(titleOrRegExp)
    else
        await pwExpect(page, '[Failure Message]: Page has title: ' + titleOrRegExp + '\n[Expected]: Page should not have title: ' + titleOrRegExp).not.toHaveTitle(titleOrRegExp, {timeout: timeout})
}

/**
 * @summary The method uses playwright expect and asserts the page is navigated to the given url.
 * @param {Page} page the page's object.
 * @param {number} [timeout] the max amount of time to assert page has url. Optional parameter.
 * @param {string, RegExp} urlOrRegExp the expected url.
 * @return {Promise<void>}
 *
 * 
 */
async function expectPageHasUrl(page, urlOrRegExp, timeout) {
    if (isKeyUndefined(timeout))
        await pwExpect(page, '[Failure Message]: Page is not navigated to url: ' + urlOrRegExp + '\n[Expected]: Page should have been navigated to: ' + urlOrRegExp).toHaveURL(urlOrRegExp)
    else
        await pwExpect(page, '[Failure Message]: Page is not navigated to url: ' + urlOrRegExp + '\n[Expected]: Page should have been navigated to: ' + urlOrRegExp).toHaveURL(urlOrRegExp, {timeout: timeout})
}

/**
 * @summary The method uses playwright expect and asserts the page is not navigated to the given url.
 * @param {Page} page the page's object.
 * @param {number} [timeout] the max amount of time to assert page has url. Optional parameter.
 * @param {string, RegExp} urlOrRegExp the expected url.
 * @return {Promise<void>}
 *
 * 
 */
async function expectPageDoesNotHaveUrl(page, urlOrRegExp, timeout) {
    if (isKeyUndefined(timeout))
        await pwExpect(page, '[Failure Message]: Page is navigated to url: ' + urlOrRegExp + '\n[Expected]: Page should not have been navigated to: ' + urlOrRegExp).not.toHaveURL(urlOrRegExp)
    else
        await pwExpect(page, '[Failure Message]: Page is navigated to url: ' + urlOrRegExp + '\n[Expected]: Page should not have been navigated to: ' + urlOrRegExp).not.toHaveURL(urlOrRegExp, {timeout: timeout})
}

/**
 * @summary The method gets the element from Iframe and runs defined action. await helpers.iframeAction(page,frameLocator,iLocator,'type',text);
 *
 * @param {Page} page the page's object.
 * @param {string} iLocator locator inside the iframe.
 * @param {Array} ...args Array
 * 
 * */
async function expectListOfElements(page, locator, args) {
    const listOfElements = await getListOfElements(page, locator)
    const count = await listOfElements.count()
    for (let i = 0; i < count; i++) {
        const element = await listOfElements.nth(i)
        await element.click({trial: true})
        expect(await element.innerText()).to.contain(args[i], "Values are not matched");
    }
}

module.exports = {
    isVisible,
    clickElement,
    getUserWithFunds,
    getText,
    gotoPage,
    waitForElementToBePresent,
    waitForElementToBeVisible,
    inputText,
    clearAndInputText,
    expectValuesEqual,
    expectIncludes,
    expectValueIsUndefined,
    expectFail,
    expectStringContains,
    expectValueIsNotNull,
    expectArraysEqual,
    expectValueIsNull,
    expectValueIsTrue,
    expectValuesNotEqual,
    expectValueIsWithin,
    expectValueIsEmpty,
    expectValueIsFalse,
    getElementText,
    getElementInnerText,
    logError,
    logMessage,
    logInfo,
    logWarning,
    logDebug,
    logSuccess,
    getElementAttributeValue,
    selectFromDropDownByValue,
    selectFromDropDownByIndex,
    inputTextByPageFill,
    waitForElementToBeNotPresent,
    selectFromDropDownByLabel,
    waitForElementToBeHidden,
    waitForTimeout,
    waitForLoadState,
    waitForNetworkIdleState,
    waitForDomContentLoadedState,
    waitForCommitState,
    getListOfElements,
    clickElementByDispatchEvent,
    focusOnElement,
    doubleClickElement,
    inputValueByType,
    verifyElementEnabled,
    clickElementByElementHandle,
    getElementHandle,
    getElementHandles,
    refreshPage,
    generateRandomEmail,
    tickCheckBox,
    generateRandomNumber,
    navigateTo,
    generateRandomNumberBetween,
    checkIfNumberStartsWithZeroAndGetANewOne,
    randAlphaString,
    randNumberString,
    expectValueIsNotEmpty,
    pressEnter,
    getInputValue,
    isElementVisible,
    getCountryCodeBasedOnEnv,
    getCountryDialPrefixBasedOnEnv,
    sleep,
    expectValueToBeAbove,
    removeNonNumericCharacter,
    formatDate,
    getIFrameElement,
    iframeAction,
    getCountryName,
    isElementDisabled,
    verifyElementIsDisabled,
    isElementChecked,
    verifyElementIsChecked,
    verifyElementIsUnChecked,
    checkRadioOrCheckbox,
    uncheckRadioOrCheckbox,
    convertStringArrayToFloatArray,
    getMaxValueFromNumberArray,
    getMinValueFromNumberArray,
    getElementAttributeNames,
    getElementLocator,
    isKeyUndefined,
    expectElementToBeChecked,
    expectElementToBeDisabled,
    expectElementToBeNotDisabled,
    expectElementToBeEditable,
    expectElementToBeNotEditable,
    expectElementToBeEmpty,
    expectElementToBeNotEmpty,
    expectElementToBeEnabled,
    expectElementToBeNotEnabled,
    expectElementToBeFocused,
    expectElementToBeNotFocused,
    expectElementToBeHidden,
    expectElementToBeNotHidden,
    expectElementToBeVisible,
    expectElementToBeNotVisible,
    expectElementToContainText,
    expectElementToNotContainText,
    expectElementToHaveAttribute,
    expectElementToHaveCount,
    expectElementToNotHaveCount,
    expectElementToHaveCSS,
    expectElementToNotHaveCSS,
    expectElementToHaveJSProperty,
    expectElementToNotHaveJSProperty,
    expectElementToHaveText,
    expectElementToNotHaveText,
    expectElementToHaveValue,
    expectElementToNotHaveValue,
    expectPageHasTitle,
    expectPageDoesNotHaveTitle,
    expectPageHasUrl,
    expectPageDoesNotHaveUrl,
    expectListOfElements
};
