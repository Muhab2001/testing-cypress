/// <reference types="Cypress"/>

describe("My First Test", () => {
  it("Visit the lovely website!", () => {
    cy.visit("http://localhost:3000/");
    cy.contains("Learn")
    cy.contains("Examples")
    
  });
});
