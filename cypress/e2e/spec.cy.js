/// <reference types="Cypress"/>

describe("My First Test", () => {
  it("Visit the lovely website!", () => {
    cy.visit("/");
    cy.contains("Learn")
    cy.contains("Examples")
    
  });
});
