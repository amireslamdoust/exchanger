describe('test page load', () => {
  it('successfully render ', () => {
    cy.visit('/')
    cy.contains('Your Balance')
  })
})
