const { BeforeAll } = require('@cucumber/cucumber')
const {Feeds} = require("../pages/boostPage");
const {OrderSummary, campaignDashboard} = require("../pages/OrderSummary");
const {Boost, BoostPost, Login} = require("../pages/login");
const {CampaignPerformance} = require("../pages/campaignPerformance");

BeforeAll(async function () {
      const {Login} = require("../pages/login")
      const {Feeds} = require("../pages/feeds")
      const {BoostPage}=require("../pages/boostPage")
      const {OrderSummary}=require("../pages/orderSummary")
      const {campaignDashboard} = require("../pages/campaignDashboard")

      global.loginPage= new Login()
      global.feedPage= new Feeds()
      global.boostPage= new BoostPage()
      global.orderSummaryPage= new OrderSummary()
      global.campaignDashboardPage= new campaignDashboard()
      global.campaignPerformancePage= new CampaignPerformance()
})