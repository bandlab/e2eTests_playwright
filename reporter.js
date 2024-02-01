/*
let reporter = require('cucumber-html-reporter')
const path = require("path")

let reportFileName = process.env.REPORT_FILE_NAME
let reportFolderPath = path.join(process.cwd(), 'reports')

let options = {
    theme: 'bootstrap',
    jsonFile: path.join(reportFolderPath, reportFileName + '.json'),
    output: path.join(reportFolderPath, reportFileName + '.html'),
    reportSuiteAsScenarios: true,
    scenarioTimestamp: true,
    launchReport: true,
    brandTitle: 'Test Execution Report',
    metadata: {
        "Browser": process.env.BROWSER ? process.env.BROWSER.toUpperCase() : 'CHROMIUM',
        "Test Environment": process.env.NODE_ENV.toUpperCase(),
        "Executed On": process.env.NPE ? process.env.NPE.toUpperCase() : 'UAT'
    }
};

reporter.generate(options);
*/
