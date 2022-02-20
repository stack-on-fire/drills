describe("JS drills", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });
  it("shows demo drill", () => {
    cy.get("h2").should(
      "have.text",
      "⚡️Drills⚡️Become JavaScript professional"
    );
  });
  it("has correct & functioning buttons buttons", () => {
    cy.get("[data-cy=prettier]").click();
    cy.get("[data-cy=hints]").click();
    cy.get("[data-cy=hints]").click();
    cy.get("[data-cy=hints]").click();
    cy.get("[data-cy=tester]").should("be.disabled");
  });
  it("can solve the problem", () => {
    cy.get(".cm-content").click().clear();
    cy.get(".cm-activeLine")
      .click()
      .type(
        `const doubleNumber = (number) => {
      return number*2;
    `,
        { force: true, delay: 10 }
      );
    cy.get(".cm-content")
      .children()
      .last()
      .click()
      .type(
        `;export default doubleNumber;
    `
      );

    cy.get("[data-cy=prettier]").click();
    cy.get("[data-cy=tester]").should("be.disabled");
    cy.get("button").contains("Run").click();
    cy.get("[data-cy=tester]").should("be.enabled");
    cy.wait(2000);
    cy.get("[data-cy=tester]").click({ force: true });
    cy.get("[data-cy=tester-toast]").should("be.visible");
  });
});
