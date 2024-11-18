describe("Services API test", () => {
  it("Gets a list of services", () => {
    cy.request("GET", "http://localhost:3000/api/services").then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("results");
    });
  });

  context("Add a service", () => {
    it("Adds a service for an existing customer.", () => {
      const date_obj = new Date("2024-09-02");

      const service = {
        customer_id: "67372ace8115ac6e61f3e610",
        date: date_obj,
      };

      cy.request({
        method: "POST",
        url: "http://localhost:3000/api/services", // baseUrl is prepend to URL
        body: service,
      }).then((response) => {
        expect(response.status).to.eq(201);
      });
    });

    it("Adds a service for a nonexisting customer.", () => {
      const date_obj = new Date("2022-09-04");

      const service = {
        customer_id: "655a2f30cd9f63a3e89f7b12",
        date: date_obj,
      };

      cy.request({
        method: "POST",
        url: "http://localhost:3000/api/services", // baseUrl is prepend to URL
        body: service,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(500);
      });
    });
  });
});
