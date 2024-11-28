describe("Service invoice API test", () => {
  it("Gets a list of service invoices", () => {
    cy.request("GET", "http://localhost:3000/api/services/invoices").then(
      (response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("results");
      }
    );
  });

  context("Add a service invoice", () => {
    it("Adds a service invoice for an existing customer.", () => {
      const service_invoice = {
        service_id: "66fe3c7888c42f8278a5ed5f",
        tin: 1234567890,
        terms: "Monthly",
        pwd_id_no: "3272382187",
        business_style: "Residential",
      };

      cy.request({
        method: "POST",
        url: "http://localhost:3000/api/services/invoices", // baseUrl is prepend to URL
        body: service_invoice,
      }).then((response) => {
        expect(response.status).to.eq(201);
      });
    });

    it("Adds a service for a nonexisting customer.", () => {
      const service_invoice = {
        service_id: "64b8f2c8a9e12d4fa769b831",
        tin: 1234567890,
        terms: "Monthly",
        pwd_id_no: "3272382187",
        business_style: "Residential",
      };

      cy.request({
        method: "POST",
        url: "http://localhost:3000/api/services/invoices", // baseUrl is prepend to URL
        body: service_invoice,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(500);
      });
    });
  });
});
