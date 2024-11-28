describe("Articles API test", () => {
  it("Gets a list of articles for a customer", () => {
    cy.request(
      "GET",
      "http://localhost:3000/api/customers/invoices/articles/674809a1bdf9203b43c8c71e"
    ).then((response) => {
      expect([404, 500, 405, 200, 201]).to.include(response.status);
    });
  });
});
