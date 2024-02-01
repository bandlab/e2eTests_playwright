Feature: Boost a Post Feature

  Scenario Outline: Boost a Non-music Post
    Given login with <username> and <password>
    When create a text post
    And I click the boost button
    When I check the Boost Campaign Details
    And complete the Boost payment process

  Examples:
    |username| |password|
    |moryani | | test@1234|

