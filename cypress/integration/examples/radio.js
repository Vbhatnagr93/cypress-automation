describe('radio test case', function(){

    it('should select radio', function(){

        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
        cy.get('[value="radio2"]').check().should('be.checked')

    })


})