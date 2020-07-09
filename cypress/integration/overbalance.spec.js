describe('test convert works', () => {
  it('over balance error', () => {
    cy.visit('/')
    cy.get('[data-cy="price-input-input_price"]').type('400')
    cy.get('[data-cy="price-input-output_price"]').should('not.have.value', '50')
    cy.get('[data-cy="price-input-input_price"]').should('have.class', 'border-red-300')
    cy.get('[data-cy="convert-action"]').should('have.class', 'bg-gray-600')
    cy.get('[data-cy="convert-action"]').should('be.disabled')
    cy.get('[data-cy="USD-balance"]').contains('300')
  })
})
