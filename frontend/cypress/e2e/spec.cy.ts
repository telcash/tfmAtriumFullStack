describe('My First Test', () => {
  beforeEach('Checks home page title', () => {
    cy.visit('/');
  });
  it('has the correct title', () => {
    cy.title().should('equal', 'charliesabores');
  });
});
