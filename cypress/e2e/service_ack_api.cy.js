describe("Service acknowledgment API test", () => {
  it("Gets a list of service acknowledgments", () => {
    cy.request(
      "GET",
      "http://localhost:3000/api/customers/acknowledgements/67480899bdf9203b43c8c6cc"
    ).then((response) => {
      expect([404, 500, 405, 200, 201]).to.include(response.status);
      expect(response.body).to.have.property("acknowledgments");
    });
  });

  context("Add a service acknowledgment", () => {
    it("Adds a service invoice for an existing customer.", () => {
      const service_acknowledgment = {
        customer_id: "67480899bdf9203b43c8c6cc",
      };

      cy.request({
        method: "POST",
        url: "http://localhost:3000/api/customers/acknowledgements", // baseUrl is prepend to URL
        body: service_acknowledgment,
      }).then((response) => {
        expect(response.status).to.eq(200);
      });
    });

    it("Adds a service for a nonexisting customer.", () => {
      const service_acknowledgment = {
        service_id: "6747a82795e3774b076b9bc9",
      };

      cy.request({
        method: "POST",
        url: "http://localhost:3000/api/customers/services/acknowledgments", // baseUrl is prepend to URL
        body: service_acknowledgment,
        failOnStatusCode: false,
      }).then((response) => {
        expect([404, 500, 405]).to.include(response.status);
      });
    });
  });
});
