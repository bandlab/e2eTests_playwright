const common = `
  --require config/config.js 
  --require setup/assertions.js 
  --require setup/hooks.js 
  --require step-definitions/**/*.js
  --format html:./reports/cucumber_report.html 
  --format summary --format @cucumber/pretty-formatter 
  --no-strict 
  },
  `;



const e2eTestForBoost = `
 --require config/config.js 
  --require setup/assertions.js 
  --require setup/hooks.js 
  --require tests/e2eTestForBoost/base-setup/baseSetup.js
  --require tests/e2eTestForBoost/step-definitions/**/*.js
  --format json:./reports/${process.env.REPORT_FILE_NAME}.json
  --format summary --format @cucumber/pretty-formatter 
  --no-strict 
  },
  `;

module.exports = {
    default: `${common} features/**/*.feature`,

    //*********************** AutomationPractice DESKTOP **************************//
    e2eTestForBoost: `${e2eTestForBoost} tests/e2eTestForBoost/features/desktop/**/boostPost.feature`,

};
