import HomePage from '../../../../support/pageObjects/HomePage'
import ProductPage from '../../../../support/pageObjects/Products'

import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
const homePage = new HomePage(); 
const Product = new ProductPage();
let name; 

Given('I open Ecommerce Page', () => {
    cy.visit('https://www.rahulshettyacademy.com/angularpractice/')
})

When('I add items to Cart', function(){
    homePage.getShopTab().click()
 
    this.data.productName.forEach(function(element){ 
        cy.selectProduct(element)
    })

   Product.checkoutButton().click()
})

And('Validate the total prices', ()=> {
    var sum = 0
    cy.get('tr td:nth-child(4) strong').each(($el, index, $list) => {
        const amount = $el.text()
        var res = amount.split(" ")
        //cy.log(res) //[₹., 50000], [₹., 65000]
        res = res[1].trim()
        sum = Number(sum)+Number(res) 
        //cy.log(res) //50000, 60000
       
    }).then(function()
    {
     cy.log(sum)
    })
    cy.get('h3 strong').then(function(element){
        const amount = element.text()
        var res = amount.split(" ")
        var total = res[1].trim()
        expect(sum).to.equal(Number(total))
    })
})

    Then('select the country submit and verify Thank you', () =>{
        cy.contains('Checkout').click()
       cy.get('#country').type('India')
       // cy.wait(8000)
       //Cypress.config('defaultCommandTimeout', 9000) //set a config only for a certain test case
       cy.get('.suggestions > ul > li > a').click()
       cy.get('#checkbox2').click({force: true})
       cy.get("input[type='submit']").click()
       cy.get('.alert').should('include.text', 'Success! Thank you! Your order will be delivered in next few weeks :-).')
    })


    When('I fill the form details', function(dataTable){


        name = dataTable.rawTable[1][0]
        homePage.getEditBox().type(name) //convert datatable to multidimensional array
        homePage.getGender().select(dataTable.rawTable[1][1])
    }) 


    Then('Validate the form behavior', function(){
        homePage.getTwoWayDataBinding().should('have.value', name) //verify name value in two way data binding
        homePage.getEditBox().should('have.attr', 'minlength', '2')
        homePage.getEnterpreneur().should('be.disabled') 
    })


    And('select the shop Page', ()=>{
        homePage.getShopTab().click()
    })