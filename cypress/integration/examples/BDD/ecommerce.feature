Feature: End to end Ecommerce validation

    application regression

    Scenario: Ecommerce products delivery
    @Regression
    Given I open Ecommerce Page
    When I add items to Cart 
    And Validate the total prices
    Then select the country submit and verify Thank you


    Scenario:  Filling the form to shop
    @Smoke
    Given I open Ecommerce Page
    When I fill the form details
    |name | gender |
    |bobz | Male   |
    Then Validate the form behavior
    And select the shop Page