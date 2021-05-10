describe('Dropdown test case', function(){

    it('should select dropdown', function(){
        //static dropdowns
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
        cy.get('select').select('option2').should('have.value', 'option2') //for static dropdown, you can select Value attribute (value ="somethin") or name (<option>somethin</option>)

        //dynamic dropdowns
        cy.get('#autocomplete').type('ind')
        cy.get('.ui-menu-item div').each(($el, index, $list) => {
            if($el.text() ==="India")
            {
                $el.click()
            }

        })

        cy.get('#autocomplete').should('have.value', 'India') //assert if value is correct

    })
})