// cypress/support/utils/cart-helper.js

/* function to listen to product API calls */
export const listenToProductApi = () => {
    return cy.intercept('POST', '**/view').as('productApi');
};

/* function to get captured data from the intercepted API call */
export const getCapturedData = () => {
    return cy.wait('@productApi').its('response.body');
};