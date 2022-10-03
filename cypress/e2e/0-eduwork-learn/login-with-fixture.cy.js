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
})