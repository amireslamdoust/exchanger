describe('test convert works', () => {
  it('successfully render ', () => {
    cy.visit('/')
    cy.contains('Your Balance')
  })

  it('check number', () => {
    cy.visit('/')
    cy.get('[data-cy="price-input-input_price"]').type('50')
    cy.get('[data-cy="price-input-output_price"]').should('not.have.value', '50')
    cy.get('[data-cy="convert-action"]').click()
    cy.get('[data-cy="USD-balance"]').contains('250')
  })

  it('swap action', () => {
    cy.visit('/')
    cy.get('[data-cy="price-input-input_price"]').type('50')
    cy.get('[data-cy="price-input-output_price"]').should('not.have.value', '50')
    cy.get('[data-cy="swap"]').click()
    cy.get('[data-cy="price-input-input_price"]').should('have.value', '50')
    cy.get('[data-cy="price-input-output_price"]').should('not.have.value', '50')
    cy.get('[data-cy="convert-action"]').click()
  })

  it('over balance error', () => {
    cy.visit('/')
    cy.get('[data-cy="price-input-input_price"]').type('400')
    cy.get('[data-cy="price-input-output_price"]').should('not.have.value', '50')
    cy.get('[data-cy="price-input-input_price"]').should('have.class', 'border-red-300')
    cy.get('[data-cy="convert-action"]').should('have.class', 'bg-gray-600')
    cy.get('[data-cy="convert-action"]').should('be.disabled')
    cy.get('[data-cy="USD-balance"]').contains('300')
  })

  it('callAPI', () => {
    cy.visit('/')
    cy.wait(1000 * 12)
    cy.get('[data-cy="convertRate.GBP').should('have.attr', 'data-cy-value').and('not.equal', '0')
  })
})
