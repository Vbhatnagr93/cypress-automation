/// <reference types="Cypress" />

describe('My first test suite', function()
{
it('My first test case', function(){
//test step
cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/")
cy.get('.search-keyword').type('Ca')
cy.wait(2000)
//get acts as findelement
cy.get('.product:visible').should('have.length', 4) 
cy.get('.products').as('productLocator') //aliasing

cy.get('@productLocator').find('.product').should('have.length', 4) //parent child chaining
cy.get('@productLocator').find('.product').eq(1).contains('ADD TO CART').click() //make sure the element at index 1 contains ADD TO CART and click it

cy.get('@productLocator').find('.product').each(($el, index, $list) => {
const textVeg = $el.find('h4.product-name').text()
if(textVeg.includes("Cashews")){
    $el.find('button').click()
} 
})

//assert if logo text is correctly displayed
cy.get('.brand').should('have.text', 'GREENKART')
})


})