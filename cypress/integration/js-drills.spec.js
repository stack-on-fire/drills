describe("Landing page test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/js");
  });
  it("shows drill collections", () => {
    cy.visit("http://localhost:3000/js");
    cy.get("[data-cy=drill-collections]").within(() => {
      cy.get("h2").should("have.text", "Collections");
      cy.get("[data-cy=collections-list]")
        .children()
        .should("have.length.at.least", 1);
    });
  });
  it("shows new drills", () => {
    cy.visit("http://localhost:3000/js");
    cy.get("[data-cy=new-drills]").within(() => {
      cy.get("h2").should("have.text", "New drills");
      cy.get("[data-cy=new-drills-list]")
        .children()
        .should("have.length.at.least", 1);
    });
  });
});
