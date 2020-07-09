describe('test convert works', () => {
  it('swap action', () => {
    cy.visit('/')
    cy.get('[data-cy="price-input-input_price"]').type('50')
    cy.get('[data-cy="price-input-output_price"]').should('not.have.value', '50')
    cy.get('[data-cy="swap"]').click()
    cy.get('[data-cy="price-input-input_price"]').should('have.value', '50')
    cy.get('[data-cy="price-input-output_price"]').should('not.have.value', '50')
    cy.get('[data-cy="convert-action"]').click()
  })
})
