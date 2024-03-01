const playwright = require('playwright');
const { chromium } = require('playwright');
const { BeforeAll, Before, After, AfterAll , Status, setDefaultTimeout } = require('@cucumber/cucumber');
const cucumber = require('../cucumber');
const helpers = require('../helpers/common-actions')


const options = {
  // If HEADLESS is not passed through env then it is set to false.
  headless: process.env.HEADLESS === 'true',
  slowMo: 100,
  args: ["--start-maximized"],
};
setDefaultTimeout(process.env.PWDEBUG ? -1 : 60 * 1000);
setDefaultTimeout(process.env.LONGTIMEOUT ? -1 : 60 * 10000);
// Create a global browser for the test session.
BeforeAll(async () => {

  //global.browser = await playwright[].launch(options);
  global.browser = await playwright[browser].launch(options);
});

// Create a fresh browser context for each test.
Before(async (scenario) => {
  global.context = await global.browser.newContext({viewport: null });
  await context.setHTTPCredentials({
    username: 'bandlab',
    password: 'uW2UJTN4RAx94mVS',
  });
  global.page = await global.context.newPage();
  await helpers.gotoPage(page,global.BASE_URL)
});

After(async function (scenario) {
  if (scenario.result.status === Status.FAILED) {
    var buffer = await global.page.screenshot({ path: `reports/${scenario.pickle.name}.png`, fullPage: true })
    this.attach(buffer, 'image/png');
  }
});

AfterAll(async () => {
  await global.browser.close();
});
