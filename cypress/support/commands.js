// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.overwrite('type', (originalFn, element, text, options) => {
    if (options && options.sensitive) {
      // turn off original log
      options.log = false
      // create our own log with masked message
      Cypress.log({
        $el: element,
        name: 'type',
        message: '*'.repeat(text.length),
      })
    }
  
    return originalFn(element, text, options)
  })
// Login custom command
Cypress.Commands.add('login', (username, password) => {
    cy.clearCookies()
    cy.clearLocalStorage()
    cy.get('#user_login').type('username')
    cy.get('#user_password').type('password', { sensitive: true }) // Enable asterisk password on test runner
    cy.get('[type ="checkbox"]').check()
    cy.get('input[name="submit"]').click()
})
// Pay Bills custom command
Cypress.Commands.add('Payment', (sp_payee, sp_account, sp_amount, sp_date, sp_description) => {
  cy.get('#sp_payee').select('Apple').should('have.value', 'apple')
  cy.get('#sp_account').select('Checking').should('have.value', '2')
  cy.get('#sp_amount').type('100')
  cy.get('#sp_date').click()
  cy.contains('5').click()
  cy.get('#sp_description').type('I want to pay my monthly bill')
  cy.get('#pay_saved_payees').click()
})