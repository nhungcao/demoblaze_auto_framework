import { loginPage } from '../../support/page_objects/LoginPage';

describe('Demoblaze - Login Module Tests', () => {
    
    beforeEach(() => {
        // Visit the baseUrl defined in cypress.config.js
        cy.visit('/');
        
        // Load test data from fixture file
        cy.fixture('users').as('user');
        
        // Open modal before each test case
        loginPage.openLoginModal();
    });

    it('FUNC-01: Login with valid credetials', function() {
        loginPage
            .enterUsername(this.user.validUser.username)
            .enterPassword(this.user.validUser.password)
            .clickLogin();

        cy.get('#logInModal').should('not.be.visible');

        // Verification: Check if Navbar updates to show Logout
        cy.get('#logout2', { timeout: 10000 }).should('be.visible');
    });

    it('NEGA-01: Login with invalid password', function() {
        loginPage
            .enterUsername(this.user.invalidPasswordUser.username)
            .enterPassword(this.user.invalidPasswordUser.password)
            .clickLogin();

        // Verification: check error on native window alerts
        cy.on('window:alert', (message) => {
            expect(message).to.contains('Wrong password');
        });
    });
});