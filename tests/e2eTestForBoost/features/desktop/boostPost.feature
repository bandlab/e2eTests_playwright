Feature: Boost a Post Feature

  Scenario Outline: Boost a Non-music Post
    Given I login with <username> and <password>
    When I create a text post
    And I click the Boost button
    When I check the Boost Campaign details
    And I complete the Boost payment process
    When I click on the Campaign Dashboard button
    Then Boost Post campaign is returned should be returned in the Campaign Dashboard

  Examples:
    |username| |password|
    |bandlabbackendtest@outlook.com | | testingbackend123|

