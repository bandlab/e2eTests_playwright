const { BeforeAll } = require('@cucumber/cucumber')
const {Feeds} = require("../pages/boostPage");
const {OrderSummary, campaignDashboard} = require("../pages/OrderSummary");
const {Boost, BoostPost} = require("../pages/boostPost");

BeforeAll(async function () {
      const {BoostPost} = require("../pages/boostPost")
      const {Feeds} = require("../pages/feeds")
      const {BoostPage}=require("../pages/boostPage")
      const {OrderSummary}=require("../pages/orderSummary")
      const {campaignDashboard} = require("../pages/campaignDashboard")

      global.boostPostPage = new BoostPost()
      global.myFeedPage=new Feeds()
      global.boostPage=new BoostPage()
      global.orderSummaryPage=new OrderSummary()
      global.campaignDashboardPage=new campaignDashboard()
})