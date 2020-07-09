describe('test convert works', () => {
  it('callAPI', () => {
    cy.visit('/')
    cy.wait(1000 * 12)
    cy.get('[data-cy="convertRate.GBP').should('have.attr', 'data-cy-value').and('not.equal', '0')
  })
})
