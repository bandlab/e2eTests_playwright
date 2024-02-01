const envconfig = require('../envConfigs')
global.env = process.env.NODE_ENV

Object.assign(global, {
  BASE_URL: envconfig[env],
  browser: process.env.BROWSER || 'chromium',
});

