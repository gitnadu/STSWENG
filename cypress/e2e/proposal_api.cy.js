describe("Proposal API test", () => {

  context("Update a proposal", () => {

    it("Adds a proposal for a nonexisting customer.", () => {
      const proposal = {
        "customer_id": "6747a82795e3774b076b9bc9",
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
        expect([404, 500, 405]).to.include(response.status);
      });
    });
  });
});
