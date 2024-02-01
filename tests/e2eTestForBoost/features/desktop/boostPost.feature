Feature: Boost a Post Feature

  Scenario Outline: Boost a Non-music Post
    Given Login with <username> and <password>
    When Create a text post
    And I click the boost button
    When I check the Boost Campaign Details
    And Complete the Boost payment process

  Examples:
    |username| |password|
    |moryani | | test@1234|

