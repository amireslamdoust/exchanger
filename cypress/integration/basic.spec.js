describe('test convert works', () => {
  it('successfully render ', () => {
    cy.visit('/')
    cy.contains('Your Balance')
  })
})
