describe("login page", () => {
  it("Valid user login", () => {
    cy.visit("http://localhost:3000");
    cy.getByData("username").type("Adriel");
    cy.getByData("password").type("Fancubit");
    cy.getByData("submit-button").click();
    cy.wait(1000); //Going to dashboard or home is slow for some reason.
    cy.location("pathname").should("eq", "/admin/dashboard");
  });

  it("Invalid user login", () => {
    cy.visit("http://localhost:3000");
    cy.getByData("username").type("Edric");
    cy.getByData("password").type("Jensen");
    cy.getByData("submit-button").click();
    cy.getByData("error-pop-up").should("exist");
    cy.location("pathname").should("eq", "/");
  });
});
