/// <reference types="Cypress" />

describe('My first test suite', function()
{
it('My first test case', function(){
//test step
cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/")
cy.get('.search-keyword').type('Ca')
cy.wait(2000)
//get acts as findelement

cy.get('.products').as('productLocator') //aliasing


cy.get('@productLocator').find('.product').each(($el, index, $list) => {
const textVeg = $el.find('h4.product-name').text()
if(textVeg.includes("Cashews")){
    $el.find('button').click()
}
}) 

cy.get('.cart-icon > img').click()
cy.contains('PROCEED TO CHECKOUT').click()
cy.contains('Place Order').click()

})

it('handles visible & invisible elements', function(){
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
    cy.get('#displayed-text').should('be.visible')
    cy.get('#hide-textbox').click()
    cy.get('#displayed-text').should('not.be.visible') 
    cy.get('#show-textbox').click()
    cy.get('#displayed-text').should('be.visible')

})

it('handles alerts and popups', function(){
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
    cy.get('#alertbtn').click()
    cy.get('input[id="confirmbtn"]').click() 
    //window:alert
    cy.on('window:alert', (str) => 
    {
        //Mocha
        expect(str).to.equal('Hello , share this practice page and share your knowledge')

    })
})

it('handles child tab in same tab', function(){
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
    cy.get('#opentab').invoke('removeAttr', 'target').click() 
    

cy.go('back')

cy.url().should('include', 'AutomationPractice')

})


})