describe("Proposals API test", () => {
  it("Gets a proposal", () => {
    const customer_id = "6733674a2a3854bb7a102ebd";

    cy.request(
      "GET",
      `http://localhost:3000/api/customers/proposals/${customer_id}`
    ).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("proposals");
    });
  });

  context("Add a proposal", () => {
    it("Adds a proposal for an existing customer.", () => {
      const customer_id = "673c31c5931e94eac95b34bb";

      const proposal = {
        customer_id: customer_id,
        product: "Product 2",
        quotation_total: 123,
        frequency: 700,
        file: null,
      };

      cy.request({
        method: "POST",
        url: "http://localhost:3000/api/customers/proposals", // baseUrl is prepend to URL
        body: proposal,
      }).then((response) => {
        expect(response.status).to.eq(201);
      });
    });

    it("Adds a contract for a nonexisting customer.", () => {
      const proposal = {
        customer_id: "64b8d2a7f4c3e35b6a8f97b1",
        product: "Product 2",
        quotation_total: 321,
        frequency: 500,
        file: null,
      };

      cy.request({
        method: "POST",
        url: "http://localhost:3000/api/customers/proposals", // baseUrl is prepend to URL
        body: proposal,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(404);
      });
    });
  });

  context("Edits a proposal", () => {
    it("Edits a contract for an existing proposal.", () => {
      const customer_id = "673c31c5931e94eac95b34bb";

      const proposal = {
        customer_id: customer_id,
        product: "Product 2",
        quotation_total: 213,
        frequency: 900,
      };

      cy.request({
        method: "POST",
        url: `http://localhost:3000/api/customers/contracts`, // baseUrl is prepend to URL
        failOnStatusCode: false,
        body: proposal,
      }).then((response) => {
        expect(response.status).to.eq(200);
      });
    });
  });

  context("Deletes a contract", () => {
    it("Deletes a contract for an existing customer.", () => {
      const customer_id = "673c31c5931e94eac95b34bb";

      cy.request({
        method: "DELETE",
        url: `http://localhost:3000/api/customers/proposals/${customer_id}`, // baseUrl is prepend to URL
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(200);
      });
    });
  });
});
