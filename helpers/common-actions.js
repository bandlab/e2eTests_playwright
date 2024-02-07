const envconfig = require('../envConfigs')[process.env.NODE_ENV];

const {
    DEFAULT_TIMEOUT
} = require(`./${envconfig.e2eConst}`);
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
    await  waitForTimeout(page,10000);
    const visible = await page.isVisible(locator)
    return expect(visible).to.equal(true, '\n[Failure Message]: Element is not visible. \n[Locator]: ' + locator);
}
async function clickElement(page, locator) {
    try {
        return await page.locator(locator).click()
    } catch (exec) {
        CustomException('Failed to click the element', locator, exec)
    }
}
async function doubleClickElement(page, locator) {
    try {
        return await page.locator(locator).dblclick()
    } catch (exec) {
        CustomException('Failed to double click the element', locator, exec)
    }
}
async function clickElementByDispatchEvent(page, locator) {
    try {
        return await page.dispatchEvent(locator, 'click')
    } catch (exec) {
        CustomException('Failed to click the element by dispatch event', locator, exec)
    }
}
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
async function clearAndInputText(page, locator, inputText) {
    try {
        let element = await page.locator(locator)
        await element.fill('')
        return await element.fill(inputText)
    } catch (exec) {
        CustomException('Failed to clear and input text.', locator, exec)
    }
}

async function inputText(page, locator, inputText) {
    try {
        await page.locator(locator).fill(inputText)
    } catch (exec) {
        CustomException('Failed to input text, ' + inputText, locator, exec)
    }
}

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
async function waitForTimeout(page, timeout) {
    await page.waitForTimeout(timeout)
}

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
async function getElementText(page, locator) {
    try {
        return await page.locator(locator).textContent()
    } catch (exec) {
        CustomException('Failed to fetch element text.', locator, exec)
    }
}
async function getElementInnerText(page, locator) {
    try {
        return await page.locator(locator).innerText()
    } catch (exec) {
        CustomException('Failed to fetch element inner-text.', locator, exec)
    }
}
async function getElementAttributeValue(page, locator, attributeName) {
    try {
        return await page.locator(locator).getAttribute(attributeName)
    } catch (exec) {
        CustomException('Failed to fetch attribute value for ' + attributeName, locator, exec)
    }
}
async function selectFromDropDownByValue(page, locator, value) {
    try {
        return await page.locator(locator).selectOption({value: value})
    } catch (exec) {
        CustomException('Failed to select from drop down by value, ' + value, locator, exec)
    }
}
async function selectFromDropDownByLabel(page, locator, label) {
    try {
        return await page.locator(locator).selectOption({label: label})
    } catch (exec) {
        CustomException('Failed to select from drop down by label, ' + label, locator, exec)
    }
}
async function selectFromDropDownByIndex(page, locator, index) {
    try {
        return await page.locator(locator).selectOption({index: index})
    } catch (exec) {
        CustomException('Failed to select from drop down by index, ' + index, locator, exec)
    }
}
async function inputTextByPageFill(page, locator, text) {
    try {
        await page.fill(locator, text)
    } catch (exec) {
        CustomException('Failed to input text, ' + text, locator, exec)
    }
}
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
function expectStringContains(string, stringToCheck, customMessage) {
    if (customMessage === undefined) {
        expect(string, '\n[Failure Message]: ' + string + ' does not contain string ' + stringToCheck + '\n').to.have.string(stringToCheck);
    } else {
        expect(string, '\n[Failure Message]: ' + customMessage + '\n').to.have.string(stringToCheck);
    }
}
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
function expectFail(failureMessage) {
    expect.fail(failureMessage)
}

function expectIncludes(objectToSearchIn, valueToSearch, customMessage) {
    if (customMessage === undefined) {
        expect(objectToSearchIn, '\n[Failure Message]: ' + objectToSearchIn + ' does not includes value ' + valueToSearch + '\n').to.include(valueToSearch)
    } else {
        expect(objectToSearchIn, '\n[Failure Message]: ' + customMessage + '\n').to.include(valueToSearch)
    }
}

function logWarning(message) {
    if (message)
        console.warn("[WARN]: ".gray + message.brightYellow);
}

function logError(message) {
    if (message)
        console.error("[ERROR]: ".gray + message.brightRed);
}


function logInfo(message) {
    if (message)
        console.info("[INFO]: ".gray + message.cyan);
}
function logSuccess(message) {
    if (message)
        console.info("[SUCCESS]: ".gray + message.green);
}
function logDebug(message) {
    if (message)
        console.debug("[DEBUG]: ".gray + message.yellow);
}
function logMessage(message) {
    if (message)
        console.info("[MESSAGE]: ".blue.bold + message.blue.bold);
}

function CustomException(failureMessage, locator, exception) {
    if (typeof locator !== 'undefined')
        throw new Error(('\n[Failure Message]: ' + failureMessage + '\n[Locator]: ' + locator + '\n[Details]: ' + exception).brightRed)
    else
        throw new Error(('\n[Failure Message]: ' + failureMessage + '\n[Details]: ' + exception).brightRed)
}

async function getListOfElements(page, locator) {
    try {
        return await page.locator(locator)
    } catch (exec) {
        CustomException('Failed to get the elements list.', locator, exec)
    }
}
async function verifyElementEnabled(page, locator) {
    try {
        expectValueIsTrue(await page.locator(locator).isEnabled(), 'Element is not enabled.')
    } catch (exec) {
        CustomException('Element is not enabled.', locator, exec)
    }
}
async function getElementHandle(page, locator) {
    try {
        return await page.$(locator)
    } catch (exec) {
        CustomException('Failed to get the element', locator, exec)
    }
}
async function getElementHandles(page, locator) {
    try {
        return await page.$$(locator)
    } catch (exec) {
        CustomException('Failed to get the elements list', locator, exec)
    }
}
async function clickElementByElementHandle(page, locator) {
    try {
        let elementHandle = await getElementHandle(page, locator)
        await elementHandle.focus()
        await elementHandle.click()
    } catch (exec) {
        CustomException('Failed to click element by ElementHandle', locator, exec)
    }
}
async function refreshPage(page) {
    try {
        return await page.reload()
    } catch (exec) {
        CustomException('Failed refresh the page', undefined, exec)
    }
}
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

async function tickCheckBox(page, locator) {
    try {
        await page.check(locator)
    } catch (exec) {
        CustomException('Failed to tick checkbox element', locator, exec)
    }
}


async function generateRandomNumber(length) {
    return Math.floor(Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1));
}
async function navigateTo(page, url, path) {
    if ((typeof path) === 'undefined')
        await page.goto(url)
    else
        await page.goto(url + path)
}
function checkIfNumberStartsWithZeroAndGetANewOne(number) {
    if (number.startsWith('0')) {
        logWarning('Phone number, ' + number + ', starts with 0. Getting a new one')
        number = '9' + number.substr(1)
    }
    return number
}

function randAlphaString(length) {
    let ans = '';
    let arr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    for (let i = length; i > 0; i--) {
        ans += arr[Math.floor(Math.random() * arr.length)];
    }
    return ans;
}

function randNumberString(length) {
    let result = '';
    let numbers = '0123456789';
    let numbersLength = numbers.length;
    for (let i = 0; i < length; i++) {
        result += numbers.charAt(Math.floor(Math.random() * numbersLength));
    }
    return result;
}

async function pressEnter() {
    await page.keyboard.down('Enter')
    await page.keyboard.up('Enter')
}

async function generateRandomNumberBetween(min, max) {
    return Math.floor((Math.random() * max) + 1);
}


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
async function getInputValue(page, locator) {
    return await page.locator(locator).inputValue()
}

function removeNonNumericCharacter(string) {
    return string.replace(/\D/g, '');
}

function formatDate(dateToFormat, dateFormat) {
    return moment(dateToFormat).format(dateFormat)
}

async function sleep(timeout) {
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
    await sleep(timeout);
}
function expectValueToBeAbove(actualValue, expectedValue, customMessage) {
    if (customMessage === undefined) {
        expect(actualValue, '\n[Failure Message]: Actual and expected values are not equal.\nActual value: ' + actualValue + '\nExpected value: ' + expectedValue + '\n').to.be.above(expectedValue)
    } else {
        expect(actualValue, '\n[Failure Message]: ' + customMessage + '\n').to.equal(expectedValue)
    }
}
async function getIFrameElement(page, frameLocator, iLocator) {
    try {
        const fLocator = await page.frameLocator(frameLocator);
        return await fLocator.locator(iLocator);
    } catch (exec) {
        CustomException('Failed to find locator', framelocator, iLocator, exec)
    }
}
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
async function verifyElementIsDisabled(page, locator, timeout) {
    if (!await isElementDisabled(page, locator, timeout))
        expectFail('[Failure Message]: The element is not disabled.\n[Expected value]: The element should be disabled.\n[Locator]: ' + locator)
}
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

async function verifyElementIsChecked(page, locator, timeout) {
    if (!await isElementChecked(page, locator, timeout))
        expectFail('[Failure Message]: The element is not checked.\n[Expected value]: Element should be checked.\n[Locator]: ' + locator)
}

async function verifyElementIsUnChecked(page, locator, timeout) {
    if (await isElementChecked(page, locator, timeout))
        expectFail('[Failure Message]: The element is checked.\n[Expected value]: Element should not be checked.\n[Locator]: ' + locator)
}

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

function convertStringArrayToFloatArray(stringArray) {
    return stringArray.map(Number)
}

function getMaxValueFromNumberArray(array) {
    return Math.max.apply(Math, array)
}
function getMinValueFromNumberArray(array) {
    return Math.min.apply(Math, array)
}

async function getElementAttributeNames(page, locator) {
    try {
        let element = await page.locator(locator)
        return await element.evaluate(async (el) => el.getAttributeNames())
    } catch (exec) {
        CustomException('Error occurred while fetching the attribute names of the element.', locator, exec)
    }
}

function isKeyUndefined(key) {
    return typeof (key) === 'undefined'
}

async function getElementLocator(page, locator) {
    try {
        return await page.locator(locator)
    } catch (exec) {
        CustomException('Error occurred while getting the element locator.', locator, exec)
    }
}
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

async function expectElementToBeDisabled(page, locator, timeout) {
    let elementLocator = await getElementLocator(page, locator)
    if (isKeyUndefined(timeout))
        await pwExpect(elementLocator, '[Failure Message]: Element is not disabled.\n[Expected]: Element should be disabled.').toBeDisabled()
    else
        await pwExpect(elementLocator, '[Failure Message]: Element is not disabled.\n[Expected]: Element should be disabled.').toBeDisabled({timeout: timeout})
}

async function expectElementToBeNotDisabled(page, locator, timeout) {
    let elementLocator = await getElementLocator(page, locator)
    if (isKeyUndefined(timeout))
        await pwExpect(elementLocator, '[Failure Message]: Element is disabled.\n[Expected]: Element should not be disabled.').not.toBeDisabled()
    else
        await pwExpect(elementLocator, '[Failure Message]: Element is disabled.\n[Expected]: Element should not be disabled.').not.toBeDisabled({timeout: timeout})
}

async function expectElementToBeEditable(page, locator, timeout) {
    let elementLocator = await getElementLocator(page, locator)
    if (isKeyUndefined(timeout))
        await pwExpect(elementLocator, '[Failure Message]: Element is not editable.\n[Expected]: Element should be editable.').toBeEditable()
    else
        await pwExpect(elementLocator, '[Failure Message]: Element is not editable.\n[Expected]: Element should be editable.').toBeEditable({timeout: timeout})
}
async function expectElementToBeNotEditable(page, locator, timeout) {
    let elementLocator = await getElementLocator(page, locator)
    if (isKeyUndefined(timeout))
        await pwExpect(elementLocator, '[Failure Message]: Element is editable.\n[Expected]: Element should be not editable.').not.toBeEditable()
    else
        await pwExpect(elementLocator, '[Failure Message]: Element is editable.\n[Expected]: Element should be not editable.').not.toBeEditable({timeout: timeout})
}

async function expectElementToBeEmpty(page, locator, timeout) {
    let elementLocator = await getElementLocator(page, locator)
    if (isKeyUndefined(timeout))
        await pwExpect(elementLocator, '[Failure Message]: Element is not empty.\n[Expected]: Element should be empty.').toBeEmpty()
    else
        await pwExpect(elementLocator, '[Failure Message]: Element is not empty.\n[Expected]: Element should be empty.').toBeEmpty({timeout: timeout})
}

async function expectElementToBeNotEmpty(page, locator, timeout) {
    let elementLocator = await getElementLocator(page, locator)
    if (isKeyUndefined(timeout))
        await pwExpect(elementLocator, '[Failure Message]: Element is empty.\n[Expected]: Element should not be empty.').not.toBeEmpty()
    else
        await pwExpect(elementLocator, '[Failure Message]: Element is empty.\n[Expected]: Element should not be empty.').not.toBeEmpty({timeout: timeout})
}

async function expectElementToBeEnabled(page, locator, timeout) {
    let elementLocator = await getElementLocator(page, locator)
    if (isKeyUndefined(timeout))
        await pwExpect(elementLocator, '[Failure Message]: Element is not enabled.\n[Expected]: Element should be enabled.').toBeEnabled()
    else
        await pwExpect(elementLocator, '[Failure Message]: Element is not enabled.\n[Expected]: Element should be enabled.').toBeEnabled({timeout: timeout})
}
async function expectElementToBeNotEnabled(page, locator, timeout) {
    let elementLocator = await getElementLocator(page, locator)
    if (isKeyUndefined(timeout))
        await pwExpect(elementLocator, '[Failure Message]: Element is enabled.\n[Expected]: Element should not be enabled.').not.toBeEnabled()
    else
        await pwExpect(elementLocator, '[Failure Message]: Element is enabled.\n[Expected]: Element should not be enabled.').not.toBeEnabled({timeout: timeout})
}
async function expectElementToBeFocused(page, locator, timeout) {
    let elementLocator = await getElementLocator(page, locator)
    if (isKeyUndefined(timeout))
        await pwExpect(elementLocator, '[Failure Message]: Element is not focused.\n[Expected]: Element should be focused.').toBeFocused()
    else
        await pwExpect(elementLocator, '[Failure Message]: Element is not focused.\n[Expected]: Element should be focused.').toBeFocused({timeout: timeout})
}
async function expectElementToBeNotFocused(page, locator, timeout) {
    let elementLocator = await getElementLocator(page, locator)
    if (isKeyUndefined(timeout))
        await pwExpect(elementLocator, '[Failure Message]: Element is focused.\n[Expected]: Element should not be focused.').not.toBeFocused()
    else
        await pwExpect(elementLocator, '[Failure Message]: Element is focused.\n[Expected]: Element should not be focused.').not.toBeFocused({timeout: timeout})
}
async function expectElementToBeHidden(page, locator, timeout) {
    let elementLocator = await getElementLocator(page, locator)
    if (isKeyUndefined(timeout))
        await pwExpect(elementLocator, '[Failure Message]: Element is not hidden.\n[Expected]: Element should be hidden.').toBeHidden()
    else
        await pwExpect(elementLocator, '[Failure Message]: Element is not hidden.\n[Expected]: Element should be hidden.').toBeHidden({timeout: timeout})
}
async function expectElementToBeNotHidden(page, locator, timeout) {
    let elementLocator = await getElementLocator(page, locator)
    if (isKeyUndefined(timeout))
        await pwExpect(elementLocator, '[Failure Message]: Element is hidden.\n[Expected]: Element should not be hidden.').not.toBeHidden()
    else
        await pwExpect(elementLocator, '[Failure Message]: Element is hidden.\n[Expected]: Element should not be hidden.').not.toBeHidden({timeout: timeout})
}
async function expectElementToBeVisible(page, locator, timeout) {
    let elementLocator = await getElementLocator(page, locator)
    if (isKeyUndefined(timeout))
        await pwExpect(elementLocator, '[Failure Message]: Element is not visible.\n[Expected]: Element should be visible.').toBeVisible()
    else
        await pwExpect(elementLocator, '[Failure Message]: Element is not visible.\n[Expected]: Element should be visible.').toBeVisible({timeout: timeout})
}
async function expectElementToBeNotVisible(page, locator, timeout) {
    let elementLocator = await getElementLocator(page, locator)
    if (isKeyUndefined(timeout))
        await pwExpect(elementLocator, '[Failure Message]: Element is visible.\n[Expected]: Element should not be visible.').not.toBeVisible()
    else
        await pwExpect(elementLocator, '[Failure Message]: Element is visible.\n[Expected]: Element should not be visible.').not.toBeVisible({timeout: timeout})
}
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
async function expectElementToHaveAttribute(page, locator, attributeKey, attributeValue, timeout) {
    let elementLocator = await getElementLocator(page, locator)
    if (isKeyUndefined(timeout))
        await pwExpect(elementLocator, '[Failure Message]: Element attribute, ' + attributeKey + ', does not have value:' + attributeValue + '\n[Expected]: Element attribute, ' + attributeKey + ', should  have value:' + attributeValue).toHaveAttribute(attributeKey, attributeValue)
    else
        await pwExpect(elementLocator, '[Failure Message]: Element attribute, ' + attributeKey + ', does not have value:' + attributeValue + '\n[Expected]: Element attribute, ' + attributeKey + ', should  have value:' + attributeValue).toHaveAttribute(attributeKey, attributeValue, {timeout: timeout})
}
async function expectElementToHaveCount(page, locator, expectedCount, timeout) {
    let elementLocator = await getElementLocator(page, locator)
    if (isKeyUndefined(timeout))
        await pwExpect(elementLocator, '[Failure Message]: Element does not have count: ' + expectedCount + '\n[Expected]: Element should have count: ' + expectedCount).toHaveCount(expectedCount)
    else
        await pwExpect(elementLocator, '[Failure Message]: Element does not have count: ' + expectedCount + '\n[Expected]: Element should have count: ' + expectedCount).toHaveCount(expectedCount, {timeout: timeout})
}
async function expectElementToNotHaveCount(page, locator, expectedCount, timeout) {
    let elementLocator = await getElementLocator(page, locator)
    if (isKeyUndefined(timeout))
        await pwExpect(elementLocator, '[Failure Message]: Element has count: ' + expectedCount + '\n[Expected]: Element should not have count: ' + expectedCount).not.toHaveCount(expectedCount)
    else
        await pwExpect(elementLocator, '[Failure Message]: Element has count: ' + expectedCount + '\n[Expected]: Element should not have count: ' + expectedCount).not.toHaveCount(expectedCount, {timeout: timeout})
}
async function expectElementToHaveCSS(page, locator, cssPropertyKey, cssPropertyValue, timeout) {
    let elementLocator = await getElementLocator(page, locator)
    if (isKeyUndefined(timeout))
        await pwExpect(elementLocator, '[Failure Message]: Element CSS property, ' + cssPropertyKey + ', does not have value:' + cssPropertyValue + '\n[Expected]: Element CSS property, ' + cssPropertyKey + ', should have value:' + cssPropertyValue).toHaveCSS(cssPropertyKey, cssPropertyValue)
    else
        await pwExpect(elementLocator, '[Failure Message]: Element CSS property, ' + cssPropertyKey + ', does not have value:' + cssPropertyValue + '\n[Expected]: Element CSS property, ' + cssPropertyKey + ', should have value:' + cssPropertyValue).toHaveCSS(cssPropertyKey, cssPropertyValue, {timeout: timeout})
}
async function expectElementToNotHaveCSS(page, locator, cssPropertyKey, cssPropertyValue, timeout) {
    let elementLocator = await getElementLocator(page, locator)
    if (isKeyUndefined(timeout))
        await pwExpect(elementLocator, '[Failure Message]: Element CSS property, ' + cssPropertyKey + ', has value:' + cssPropertyValue + '\n[Expected]: Element CSS property, ' + cssPropertyKey + ', should not have value:' + cssPropertyValue).not.toHaveCSS(cssPropertyKey, cssPropertyValue)
    else
        await pwExpect(elementLocator, '[Failure Message]: Element CSS property, ' + cssPropertyKey + ', has value:' + cssPropertyValue + '\n[Expected]: Element CSS property, ' + cssPropertyKey + ', should  have value:' + cssPropertyValue).not.toHaveCSS(cssPropertyKey, cssPropertyValue, {timeout: timeout})
}
async function expectElementToHaveJSProperty(page, locator, propertyKey, propertyValue, timeout) {
    let elementLocator = await getElementLocator(page, locator)
    if (isKeyUndefined(timeout))
        await pwExpect(elementLocator, '[Failure Message]: Element JS property, ' + propertyKey + ', does not have value:' + propertyValue + '\n[Expected]: Element JS property, ' + propertyKey + ', should  have value:' + propertyValue).toHaveJSProperty(propertyKey, propertyValue)
    else
        await pwExpect(elementLocator, '[Failure Message]: Element JS property, ' + propertyKey + ', does not have value:' + propertyValue + '\n[Expected]: Element JS property, ' + propertyKey + ', should  have value:' + propertyValue).toHaveJSProperty(propertyKey, propertyValue, {timeout: timeout})
}

async function expectElementToNotHaveJSProperty(page, locator, propertyKey, propertyValue, timeout) {
    let elementLocator = await getElementLocator(page, locator)
    if (isKeyUndefined(timeout))
        await pwExpect(elementLocator, '[Failure Message]: Element JS property, ' + propertyKey + ', has value:' + propertyValue + '\n[Expected]: Element JS property, ' + propertyKey + ', should not have value:' + propertyValue).not.toHaveJSProperty(propertyKey, propertyValue)
    else
        await pwExpect(elementLocator, '[Failure Message]: Element JS property, ' + propertyKey + ', has value:' + propertyValue + '\n[Expected]: Element JS property, ' + propertyKey + ', should not have value:' + propertyValue).not.toHaveJSProperty(propertyKey, propertyValue, {timeout: timeout})
}
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
async function expectElementToHaveValue(page, locator, expected, timeout) {
    let elementLocator = await getElementLocator(page, locator)
    if (isKeyUndefined(timeout))
        await pwExpect(elementLocator, '[Failure Message]: Element does not have value: ' + expected + '\n[Expected]: Element should have value: ' + expected).toHaveValue(expected)
    else
        await pwExpect(elementLocator, '[Failure Message]: Element does not have value: ' + expected + '\n[Expected]: Element should have value: ' + expected).toHaveValue(expected, {timeout: timeout})
}
async function expectElementToNotHaveValue(page, locator, expected, timeout) {
    let elementLocator = await getElementLocator(page, locator)
    if (isKeyUndefined(timeout))
        await pwExpect(elementLocator, '[Failure Message]: Element has value: ' + expected + '\n[Expected]: Element should not have value: ' + expected).not.toHaveValue(expected)
    else
        await pwExpect(elementLocator, '[Failure Message]: Element has value: ' + expected + '\n[Expected]: Element should not have value: ' + expected).not.toHaveValue(expected, {timeout: timeout})
}
async function expectPageHasTitle(page, titleOrRegExp, timeout) {
    if (isKeyUndefined(timeout))
        await pwExpect(page, '[Failure Message]: Page does not have title: ' + titleOrRegExp + '\n[Expected]: Page should have title: ' + titleOrRegExp).toHaveTitle(titleOrRegExp)
    else
        await pwExpect(page, '[Failure Message]: Page does not have title: ' + titleOrRegExp + '\n[Expected]: Page should have title: ' + titleOrRegExp).toHaveTitle(titleOrRegExp, {timeout: timeout})
}
async function expectPageDoesNotHaveTitle(page, titleOrRegExp, timeout) {
    if (isKeyUndefined(timeout))
        await pwExpect(page, '[Failure Message]: Page has title: ' + titleOrRegExp + '\n[Expected]: Page should not have title: ' + titleOrRegExp).not.toHaveTitle(titleOrRegExp)
    else
        await pwExpect(page, '[Failure Message]: Page has title: ' + titleOrRegExp + '\n[Expected]: Page should not have title: ' + titleOrRegExp).not.toHaveTitle(titleOrRegExp, {timeout: timeout})
}


async function expectPageHasUrl(page, urlOrRegExp, timeout) {
    if (isKeyUndefined(timeout))
        await pwExpect(page, '[Failure Message]: Page is not navigated to url: ' + urlOrRegExp + '\n[Expected]: Page should have been navigated to: ' + urlOrRegExp).toHaveURL(urlOrRegExp)
    else
        await pwExpect(page, '[Failure Message]: Page is not navigated to url: ' + urlOrRegExp + '\n[Expected]: Page should have been navigated to: ' + urlOrRegExp).toHaveURL(urlOrRegExp, {timeout: timeout})
}
async function expectPageDoesNotHaveUrl(page, urlOrRegExp, timeout) {
    if (isKeyUndefined(timeout))
        await pwExpect(page, '[Failure Message]: Page is navigated to url: ' + urlOrRegExp + '\n[Expected]: Page should not have been navigated to: ' + urlOrRegExp).not.toHaveURL(urlOrRegExp)
    else
        await pwExpect(page, '[Failure Message]: Page is navigated to url: ' + urlOrRegExp + '\n[Expected]: Page should not have been navigated to: ' + urlOrRegExp).not.toHaveURL(urlOrRegExp, {timeout: timeout})
}
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
    getText,
    gotoPage,
    clearAndInputText,
    waitForTimeout,
    waitForLoadState
};
