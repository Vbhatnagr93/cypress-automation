/// <reference types="Cypress" />

describe('checkbox test case', function(){

    it('should make sure checkbox is checked', function(){
    
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
    cy.get('#checkBoxOption1').check().should('be.checked').and('have.value', 'option1')
    cy.get('#checkBoxOption1').uncheck().should('not.be.checked') //uncheck and assert
    cy.get('input[type="checkbox"]').check(['option2', 'option3']) //multiple checkboxes
    
    })
})