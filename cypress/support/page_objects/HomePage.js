// cypress/support/page_objects/HomePage.js
export class HomePage {
    // Selectors for categories
    static get CAT_PHONES() { return 'a[onclick="byCat(\'phone\')"]'; }
    static get CAT_LAPTOPS() { return 'a[onclick="byCat(\'notebook\')"]'; }
    static get CAT_MONITORS() { return 'a[onclick="byCat(\'monitor\')"]'; }
    static get PRODUCT_NAME_LINK() { return '.hrefch'; }
    static get ADD_TO_CART_BTN() { return '.btn-success'; }

    selectCategory(type) {
        // Intercept category filter API call
        cy.intercept('POST', '**/bycat').as('categoryFilter');

        // Map category types to selectors
        const categories = {
            'Phones': HomePage.CAT_PHONES,
            'Laptops': HomePage.CAT_LAPTOPS,
            'Monitors': HomePage.CAT_MONITORS
        };
        // select category
        cy.get(categories[type]).should('be.visible').click();

        // wait for category filter API response
        cy.wait('@categoryFilter', { timeout: 10000 })
        .its('response.statusCode')
        .should('eq', 200);

        // verify at least one product is displayed
        cy.get('#tbodyid .card').should('have.length.at.least', 1);

        return this;
    }

    selectProduct(name) {
        // Intercept product details API call
        cy.intercept('POST', '**/view').as('productDetails');
        
        // select product by name
        cy.contains(HomePage.PRODUCT_NAME_LINK, name).should('be.visible').click();

        // wait for product details API response
        cy.wait('@productDetails', { timeout: 10000 })
        .its('response.statusCode')
        .should('eq', 200); 

        // verify product detail page is loaded
        cy.url().should('include', 'prod.html');
        cy.get('.btn-success').should('be.visible');

        return this;

    }

    addToCart() {
        cy.intercept('POST', '**/addtocart').as('addToCartAPI');
        cy.get(HomePage.ADD_TO_CART_BTN).click();  
        cy.wait('@addToCartAPI').its('response.statusCode').should('eq', 200);      
        cy.on('window:alert', (str) => {
            expect(str).to.equal('Product added');
        });
        return this;
    }
}
export const homePage = new HomePage();