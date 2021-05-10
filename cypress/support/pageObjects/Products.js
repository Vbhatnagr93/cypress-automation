class ProductPage
{
checkoutButton(){
    return cy.contains('Checkout')
}
}

export default ProductPage; //js exports the class to all files in our framework