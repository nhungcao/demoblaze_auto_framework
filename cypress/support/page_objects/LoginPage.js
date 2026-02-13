export class LoginPage {
    static get LOGIN_NAV_LINK() { return '#login2'; }
    static get USERNAME_INPUT() { return '#loginusername'; }
    static get PASSWORD_INPUT() { return '#loginpassword'; }
    static get LOGIN_BUTTON() { return 'button[onclick="logIn()"]'; }

    openLoginModal() {
        cy.get(LoginPage.LOGIN_NAV_LINK).click();
        cy.get('#logInModal', { timeout: 10000 }).should('be.visible');
        return this;
    }

    enterUsername(username) {
        if (username) {
            cy.get(LoginPage.USERNAME_INPUT).should('be.visible').clear().type(username);
        }
        return this;
    }

    enterPassword(password) {
        if (password) {
            cy.get(LoginPage.PASSWORD_INPUT).should('be.visible').clear().type(password);
        }
        return this;
    }

    clickLogin() {
        cy.get(LoginPage.LOGIN_BUTTON).click();
        return this;
    }
}
export const loginPage = new LoginPage();