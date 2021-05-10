/// <reference types="Cypress" />
import HomePage from '../../support/pageObjects/HomePage'
import ProductPage from '../../support/pageObjects/Products'

describe('My first test suite', function()
{
    before(function(){

        cy.fixture('example').then(function(data)
        {
            this.data = data 
        }) //searches for example.json

    })

    it('My first test case', function(){
        const homePage = new HomePage() 
        const Product = new ProductPage()
        cy.visit('https://www.rahulshettyacademy.com/angularpractice/')
        homePage.getEditBox().type(this.data.name) //pulls name from data object
        homePage.getGender().select(this.data.gender)
        homePage.getTwoWayDataBinding().should('have.value', this.data.name) //verify name value in two way data binding
        homePage.getEditBox().should('have.attr', 'minlength', '2') //should check attribute and its value
        homePage.getEnterpreneur().should('be.disabled') //check if radio button is disabled or not
        //cy.pause(); //debug
        
        homePage.getShopTab().click()
 
        this.data.productName.forEach(function(element){ //javascript foreach traverses through each item in array and clicks on each item listed in example.json
            cy.selectProduct(element)
        })
        
       Product.checkoutButton().click()
       var sum = 0

       cy.get('tr td:nth-child(4) strong').each(($el, index, $list) => {
           const amount = $el.text()
           var res = amount.split(" ") //var can be reused, const cannot be
           //cy.log(res) //[₹., 50000], [₹., 65000]
           res = res[1].trim()
           sum = Number(sum)+Number(res) //convert res,sum from string to number
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
       cy.contains('Checkout').click()
       cy.get('#country').type('India')
       // cy.wait(8000)
       //Cypress.config('defaultCommandTimeout', 9000) //set a config only for a certain test case
       cy.get('.suggestions > ul > li > a').click()
       cy.get('#checkbox2').click({force: true})
       cy.get("input[type='submit']").click()
       cy.get('.alert').should('include.text', 'Success! Thank you! Your order will be delivered in next few weeks :-).')
     
       


    })

})