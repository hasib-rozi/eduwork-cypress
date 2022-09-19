/// <reference types="cypress" />

describe('Working with inputs', () => {
    it('Visit the website', () => {
        cy.visit('http://zero.webappsecurity.com/login.html')
        cy.url().should('include', 'login.html')
    })

    it('Should fill username', () => {
        cy.get('#user_login').clear()
        cy.get('#user_login').type('username')
    })
    it('Should fill password', () => {
        cy.get('input[name="user_password"]').clear()
        cy.get('input[name="user_password"]').type('password')
    })
    it('Should fill checkbox', () => {
        cy.get('[type="checkbox"]').check()
        cy.get('[type="checkbox"]').should('be.checked')
    })
})