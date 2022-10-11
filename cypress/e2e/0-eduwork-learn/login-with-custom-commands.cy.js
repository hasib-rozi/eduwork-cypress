/// <reference types="cypress" />

describe('Login with custom commands', function() {
    it('Should try to login', () => {
        cy.visit('http://zero.webappsecurity.com/login.html')

        cy.fixture("user").then(user => {
            const username = user.username
            const password = user.password

            cy.login(username, password)

            cy.url().should('include', '/bank/account-summary.html')

            cy.get('a').contains('Pay Bills').click()
        })
    })

    it('Should pay the bills', () => {
        cy.fixture("pay-bills").then(payment => {
            const payee = payment.payee
            const account = payment.account
            const amount = payment.amount
            const date = payment.date
            const description = payment.description
            
            cy.Payment(payee, account, amount, date, description)
            
            cy.clickLink('Pay Bill')

            cy.get('.span-header').contains('The payment was successfully submitted.')
        })
    })
})