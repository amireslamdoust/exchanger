describe('test convert works', () => {
  it('check number and convert', () => {
    cy.visit('/')
    cy.get('[data-cy="price-input-input_price"]').type('50')
    cy.get('[data-cy="price-input-output_price"]').should('not.have.value', '50')
    cy.get('[data-cy="convert-action"]').click()
    cy.get('[data-cy="USD-balance"]').contains('250')
  })
})
