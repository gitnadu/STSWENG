describe("Service invoice API test", () => {
  it("Gets a list of service invoices", () => {
    cy.request("GET", "http://localhost:3000/api/customers/invoices/67480899bdf9203b43c8c6cc").then(
      (response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("invoices");
      }
    );
  });

  context("Add a service invoice", () => {
    it("Adds a service invoice for an existing customer.", () => {
      const service_invoice = {
        customer_id: "67480899bdf9203b43c8c6cc",
        tin: 1234567890,
        terms: "Monthly",
        date: "2024-02-11T00:00:00.000Z",
        pwd_id_no: "3272382187",
        business_style: "Residential",
      };

      cy.request({
        method: "POST",
        url: "http://localhost:3000/api/customers/invoices", // baseUrl is prepend to URL
        body: service_invoice,
      }).then((response) => {
        expect(response.status).to.eq(200);
      });
    });

    it("Adds a service for a nonexisting customer.", () => {
      const service_invoice = {
        customer_id: "67372cde8115ac6e61f121123e647",
        tin: 1234567890,
        terms: "Monthly",
        date: "2024-02-11T00:00:00.000Z",
        pwd_id_no: "3272382187",
        business_style: "Residential",
      };

      cy.request({
        method: "POST",
        url: "http://localhost:3000/api/customers/invoices", // baseUrl is prepend to URL
        body: service_invoice,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(500);
      });
    });
  });
});
