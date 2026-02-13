Demoblaze E2E Automation Framework
A Cypress-based testing framework for the Demoblaze e-commerce platform, utilizing the Page Object Model (POM) and Smart Waiting strategies to ensure high stability on CI/CD environments.

1. Framework Structure & Rationale

├── cypress/
│   ├── e2e/             # Test scenarios (Business-driven)
│   ├── fixtures/        # Test data (products.json)
│   ├── support/
│   │   ├── page_objects/# UI Locators & Actions (POM)
│   │   └── helpers/     # API interception & data capture
└── cypress.config.js    # Global settings (BaseURL, Timeouts)

Why this design?

Page Object Model (POM): Centralizes UI locators to make scripts easier to maintain.

Smart Waiting: Replaces brittle cy.wait(number) with API interception (cy.intercept) and DOM-based assertions. This eliminates "flaky" tests on slow CI servers like GitHub Actions.

Decoupled Logic: Separation of test data (Fixtures), UI actions (Pages), and test steps (E2E) for better scalability.

2. How to Execute
Prerequisites
Node.js (v14+)

npm

Installation
Clone the repository.

Install dependencies:

Bash
npm install
Running Tests
1. Open Cypress Runner (GUI Mode):

Bash
npx cypress open
2. Run Headless (CLI Mode - Chrome):

Bash
npx cypress run --browser chrome
