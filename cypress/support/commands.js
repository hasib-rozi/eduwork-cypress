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

Cypress.Commands.add('login', (username, password) => {
    cy.clearCookies()
    cy.clearLocalStorage()
    cy.get('#user_login').type('username')
    cy.get('#user_password').type('password', { sensitive: true })
    cy.get('input[name="submit"]').click()
})

Cypress.Commands.add('clickLink', (label) => {
  cy.get('a').contains('Pay Bill').click()
})

Cypress.Commands.add('Payment', (sp_payee, sp_account, sp_amount, sp_date, sp_description) => {
  cy.clearCookies()
  cy.clearLocalStorage()
  cy.get('#sp_payee').select('Apple').should('have.value', 'apple')
  cy.get('#sp_account').select('Savings').should('have.value', '1')
  cy.get('#sp_amount').type('100')
  cy.get('#sp_date').type('2022-08-01')
  cy.get('#sp_description').type('I want to pay my monthly bill')
  cy.get('input[name="submit"]').click()
})