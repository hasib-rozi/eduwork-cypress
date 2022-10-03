/// <reference types="cypress" />

describe('Login with fixtures data', function() {
    it('Should try to login', () => {
        cy.visit('http://zero.webappsecurity.com/login.html')

        cy.fixture("user").then(user => {
            const username = user.username
            const password = user.password

            cy.get('#user_login').type(username)
            cy.get('#user_password').type(password)
            
            cy.get('input[name="submit"]').click()

            cy.get('.alert-error').contains('Login and/or password are wrong')
        })
    })
    
    it('Should click forgot password', () => {
        cy.visit('http://zero.webappsecurity.com/forgot-password.html')
        cy.url().should('include', '/forgot-password.html')

        cy.get('#user_email')
          .type('user@email.com')
          .should('have.value', 'user@email.com')

        cy.get('input[name="submit"]').click()

        cy.get('.page-header').contains('Forgotten Password')
    })
})