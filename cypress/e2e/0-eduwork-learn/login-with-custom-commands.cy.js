/// <reference types="cypress" />

describe('Login with custom commands', function() {
    it('Should try to login', () => {
        cy.visit('http://zero.webappsecurity.com/login.html')

        cy.fixture("user").then(user => {
            const username = user.username
            const password = user.password

            cy.login(username, password)

            cy.get('.alert-error').contains('Login and/or password are wrong')
        })
    })
})