// cypress/support/page_objects/CartPage.js
export class CartPage {
    static get CART_NAV_LINK() { return '#cartur'; }
    static get DELETE_LINK() { return 'a:contains("Delete")'; }
    static get PLACE_ORDER_BTN() { return 'button.btn-success'; }
    static get TABLE_ROWS() { return '#tbodyid tr'; }

    visit() {
        cy.get(CartPage.CART_NAV_LINK).click();
        cy.wait('@getCartData').its('response.statusCode').should('eq', 200);
        cy.url().should('include', 'cart.html');
        return this;
    }

    deleteProduct() {
        cy.get(CartPage.DELETE_LINK).first().click();
        return this;
    }

    verifyProductVisible(productName) {
        cy.get(CartPage.TABLE_ROWS).should('contain', productName);
        return this;
    }

    verifyProductDetails(productName, expectedPrice) {
        //  find the table row that contains the product name
        cy.contains(CartPage.TABLE_ROWS, productName, {timeout: 10000}).should('be.visible').within(() => {
            // check product title
            cy.get('td').eq(1).should('have.text', productName);
            
            //check product price
            cy.get('td').eq(2).should('have.text', expectedPrice);
            
            // check delete link is visible
            cy.get('td').contains('Delete').should('be.visible');
        });
        return this;
    }
}
export const cartPage = new CartPage();