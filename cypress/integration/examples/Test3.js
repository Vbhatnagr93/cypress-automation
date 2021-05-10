/// <reference types="Cypress" />
/// <reference types="cypress-iframe" />
import 'cypress-iframe'

describe('My Second Test Suite', function () {

    it('Handling web tables', function () {

        //Check boxes
        cy.visit(Cypress.env('url') + "/AutomationPractice/")

        cy.get('tr td:nth-child(2)').each(($e1, index, $list) => {

            const text = $e1.text()
            if (text.includes("Python")) {

                cy.get("tr td:nth-child(2)").eq(index).next().then(function (price) //next is jquery so we need then to resolve the promise
                {
                    const priceText = price.text()
                    expect(priceText).to.equal('25')
                })
            }

        })

    })

    it('performs mouse hover', function () {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
        //cy.get('div.mouse-hover-content').invoke('show') //jquery method to show hidden elements

        cy.contains('Top').click({ force: true })
        cy.url().should('include', '#top')


    })

    it('should handle opening in separate window', function () {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
        cy.get('#opentab').then(function (el) {

            const url = el.prop('href')
            cy.log(url)
            cy.visit(url)
        }) //prop to get the value of a property

    })

    it('should handle iframes', function () {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
        cy.frameLoaded('#courses-iframe') 
        cy.iframe().get("a[href*='mentorship']").eq(0).click()  
        cy.iframe().find("h1[class*='pricing-title']").should('have.length', 2)

    })


})