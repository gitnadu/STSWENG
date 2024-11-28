describe("Contracts API test", () => {
  it("Gets a contract", () => {
    const customer_id = "67372ace8115ac6e61f3e612";

    cy.request(
      "GET",
      `http://localhost:3000/api/customers/contracts/${customer_id}`
    ).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("contracts");
    });
  });

  context("Add a contract", () => {
    it("Adds a contract for an existing customer.", () => {
      const start_date_obj = new Date("2024-09-02");
      const end_date_obj = new Date("2024-11-28");

      const contract = {
        customer_id: "67372cde8115ac6e61f3e647",
        services: ["Termite Control", "Rodent Control"],
        start_date: start_date_obj,
        end_date: end_date_obj,
        quotation_total: 12345,
        frequency: 123,
      };

      cy.request({
        method: "POST",
        url: "http://localhost:3000/api/customers/contracts", // baseUrl is prepend to URL
        body: contract,
      }).then((response) => {
        expect(response.status).to.eq(201);
      });
    });

    it("Adds a contract for a nonexisting customer.", () => {
      const start_date_obj = new Date("2022-09-07");
      const end_date_obj = new Date("2023-09-07");

      const contract = {
        customer_id: "64b8d2a7f4c3e35b6a8f97b1",
        services: ["Hygenic Pest Control", "Termite Control"],
        start_date: start_date_obj,
        end_date: end_date_obj,
        quotation_total: 54321,
        frequency: 690,
      };

      cy.request({
        method: "POST",
        url: "http://localhost:3000/api/customers/contracts", // baseUrl is prepend to URL
        body: contract,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(404);
      });
    });
  });

  context("Edits a contract", () => {
    it("Edits a contract for an existing customer.", () => {
      const customer_id = "67372ace8115ac6e61f3e610";

      const start_date_obj = new Date("2024-10-01");
      const end_date_obj = new Date("2024-10-29");

      const contract = {
        customer_id: customer_id,
        services: ["Termite Control", "Rodent Control"],
        start_date: start_date_obj,
        end_date: end_date_obj,
        quotation_total: 12345,
        frequency: 123,
      };

      cy.request({
        method: "POST",
        url: `http://localhost:3000/api/customers/contracts`, // baseUrl is prepend to URL
        failOnStatusCode: false,
        body: contract,
      }).then((response) => {
        expect(response.status).to.eq(200);
      });
    });
  });

  context("Deletes a contract", () => {
    it("Deletes a contract for an existing customer.", () => {
      const customer_id = "6747a82795e3774b076b9bc7";

      cy.request({
        method: "DELETE",
        url: `http://localhost:3000/api/customers/contracts/${customer_id}`, // baseUrl is prepend to URL
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(200);
      });
    });
  });
});
