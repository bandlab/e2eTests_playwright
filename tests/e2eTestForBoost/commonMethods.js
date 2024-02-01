/**
 * @summary The method remove the country currency symbol from the balance amount and returns the balance.
 *
 * @param {string} balanceFromUI the account balance from the FE.
 * @return {string} the balance amount after removal of currency symbol.
 *
 * */
function getUserBalanceAmount(balanceFromUI) {
    if (env.includes('nigeria')) {
        return balanceFromUI.split('₦')[1].trim()
    } else if (env.includes('kenya')) {
        return balanceFromUI.split('KSh')[1].trim()
    } else if (env.includes('ethiopia')) {
        return balanceFromUI.split('ብር')[1].trim()
    } else if (env.includes('ghana')) {
        return balanceFromUI.split('GH₵')[1].trim()
    }

}

/**
 * This method replaces digits with required string
 * @param stringToReplace
 * @param replaceString
 * @returns {String}
 */
function replaceDigits(stringToReplace, replaceString) {
    return stringToReplace.replace(/[0-9]/g, replaceString)

}

/**
 * This method replaces string
 * @param stringToReplace
 * @param replaceString
 * @returns {*}
 */
function replaceSpaces(stringToReplace, replaceString) {

    return stringToReplace.replace(/\s+/g, replaceString)

}

/**
 * This function splits the numberic and alphabet character as per the separator provided
 *
 * e.g - stringToSplit = 16865 Italy - Hungary
 * returns = 16865, Italy - Hungary
 * @param stringToSplit
 * @param separator
 * @returns {Promise<string>} string of array with comma separated
 */
function splitNumberAndAlphChar(stringToSplit, separator) {
    return stringToSplit.match(/(\d+|[^\d]+)/g).join(',').split(separator)
}

module.exports = {
    getUserBalanceAmount, replaceDigits, replaceSpaces,

    getUserBalanceAmount, replaceDigits, replaceSpaces, splitNumberAndAlphChar
}