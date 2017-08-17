Feature: Web automation test for Yoti

  Scenario: Successful sign in with valid email address and password
    Given I navigate to home page
    When When I sign in with valid credentials
    Then I should be successfuly logged in

  Scenario: User should be able to search product
    Given I navigate to home page
    When I search for product "blouse"
    Then I should see one item displayed in search result page

  Scenario: User should see failed authentication message displayed for unsuccessful login
    Given I navigate to home page
    When When I sign in with invalid credentials
    Then I should see authentication failed alert displayed

  Scenario: User should be able to create new account
    Given I am on login page
    And I choose to create an account with valid email
    When I enter valid values on the registration page
    And I click register
    Then I should be logged in as a new user

  Scenario: validate correct item are added to basket
    Given I navigate to home page
    And I search for product "printed"
    When I add the 1st item to cart
    Then I should see item added to my shopping cart



