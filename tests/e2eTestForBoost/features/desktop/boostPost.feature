Feature: Boost a Post Feature

  Scenario: Boost a non-music Post
    Given I login as Alice
    When I create a text post
    And I click the Boost button
    When I set the Budget & Duration for my Boost Campaign
    And I complete the Boost payment process
    When I click on the Campaign Dashboard button
    Then Boost Post campaign is shown on Boost Dashboard
    And when I click on the Boost button again to check the Campaign is created
    Then Campaign Performance page should be displayed with status In-Review
    And I delete the post created for clean-up