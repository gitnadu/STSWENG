describe("Proposal API test", () => {
  it("Gets a list of proposals", () => {
    cy.request("GET", "http://localhost:3000/api/customers/proposals/67480899bdf9203b43c8c6cc").then(
      (response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("proposals");
      }
    );
  });

  context("Update a proposal", () => {
    it("Adds a proposal for an existing customer.", () => {
      const proposal = {
        "customer_id": "67480899bdf9203b43c8c6cc",
        "product": "Product 3",
        "quotation_total": 1,
        "frequency": "112121212121",
        "file": null
      };

      cy.request({
        method: "POST",
        url: "http://localhost:3000/api/customers/proposals", // baseUrl is prepend to URL
        body: proposal,
      }).then((response) => {
        expect(response.status).to.eq(200);
      });
    });

    it("Adds a proposal for a nonexisting customer.", () => {
      const proposal = {
        "customer_id": "67372cde811115ac6e61f3e648",
        "product": "Product 3",
        "quotation_total": 1,
        "frequency": "112121212121",
        "file": null
      };

      cy.request({
        method: "POST",
        url: "http://localhost:3000/api/customers/proposals", // baseUrl is prepend to URL
        body: proposal,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(500);
      });
    });
  });
});
