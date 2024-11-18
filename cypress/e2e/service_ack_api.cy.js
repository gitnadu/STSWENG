describe("Service acknowledgment API test", () => {
  it("Gets a list of service acknowledgments", () => {
    cy.request(
      "GET",
      "http://localhost:3000/api/services/acknowledgments"
    ).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("results");
    });
  });

  context("Add a service acknowledgment", () => {
    it("Adds a service invoice for an existing customer.", () => {
      const service_acknowledgment = {
        service_id: "66fe3c7888c42f8278a5ed5f",
      };

      cy.request({
        method: "POST",
        url: "http://localhost:3000/api/services/acknowledgments", // baseUrl is prepend to URL
        body: service_acknowledgment,
      }).then((response) => {
        expect(response.status).to.eq(201);
      });
    });

    it("Adds a service for a nonexisting customer.", () => {
      const service_acknowledgment = {
        service_id: "655a30d5fa7e4b92c56e4f98",
      };

      cy.request({
        method: "POST",
        url: "http://localhost:3000/api/services/acknowledgments", // baseUrl is prepend to URL
        body: service_acknowledgment,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(500);
      });
    });
  });
});
