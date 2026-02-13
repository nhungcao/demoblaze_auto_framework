import { homePage } from '../../support/page_objects/HomePage';
import { cartPage } from '../../support/page_objects/CartPage';
import { listenToProductApi, getCapturedData } from '../../support/utils/cart_helper';

describe('Demoblaze - Cart Module Tests', () => {

    beforeEach(() => {
        cy.visit('/');
        cy.fixture('products').as('items');
    });

    it('FUNC-01: Check when add a Phone product to the cart', function() {
        const phoneName = this.items.phones[0].name;

        // listen to product API calls
        listenToProductApi();

        // select category and product
        homePage.selectCategory('Phones').selectProduct(phoneName);

        // get captured API data and verify in cart
        getCapturedData().as('apiData');

        //add to cart
        homePage.addToCart();

        //visit cart page
        cartPage.visit();

        // verify product is visible in cart

        cy.get('@apiData').then((apiData) => {
        cartPage.verifyProductDetails(apiData.title, apiData.price.toString());
        
        // check product image in cart
        cy.get('td img')
            .should('be.visible')
            .and('have.attr', 'src')
            .and('include', apiData.img);
        });
    });

    it('FUNC-02: Check when add a Laptop product to the cart', function() {
        const laptopName = this.items.laptops[0].name;
        // listen to product API calls
        listenToProductApi();

        // select category and product
        homePage.selectCategory('Laptops').selectProduct(laptopName);

        // get captured API data and verify in cart
        getCapturedData().then((apiData) => {
            homePage.addToCart();
            
            cartPage.visit();
            // verify product details in cart
            cartPage.verifyProductDetails(apiData.title, apiData.price.toString());
            
            // check product image in cart
            cy.get('td img').should('have.attr', 'src').and('include', apiData.img);
        });
    });

    it('FUNC-03: Check when add a Monitor product to the cart', function() {
        const monitorName = this.items.monitors[0].name;

        // listen to product API calls
        listenToProductApi();

        // select category and product
        homePage.selectCategory('Monitors').selectProduct(monitorName);

        // get captured API data and verify in cart
        getCapturedData().then((apiData) => {
            homePage.addToCart();
            
            cartPage.visit();
            // verify product details in cart
            cartPage.verifyProductDetails(apiData.title, apiData.price.toString());
            
            // check product image in cart
            cy.get('td img').should('have.attr', 'src').and('include', apiData.img);
        });
    });
});