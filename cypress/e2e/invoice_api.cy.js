describe("Invoice API test", () => {
  it("Gets an invoice", () => {
    const customer_id = "67372ace8115ac6e61f3e612";

    cy.request(
      "GET",
      `http://localhost:3000/api/customers/invoices/${customer_id}`
    ).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("invoices");
    });
  });

  context("Add a invoice", () => {
    it("Adds an invoice for an existing customer.", () => {
      const customer_id = "673c31c5931e94eac95b34bb";
      const date_obj = new Date("2024-11-10");

      const invoice = {
        customer_id: customer_id,
        date: date_obj,
        tin: 12345678910,
        terms: 1,
        pwd_id_no: 123456789,
        business_style: "services",
      };

      cy.request({
        method: "POST",
        url: "http://localhost:3000/api/customers/invoices", // baseUrl is prepend to URL
        body: invoice,
      }).then((response) => {
        expect(response.status).to.eq(201);
      });
    });
  });

  context("Edits an invoice", () => {
    it("Edits an invoice for an existing customer.", () => {
      const customer_id = "673c31c5931e94eac95b34bb";
      const date_obj = new Date("2024-11-11");

      const invoice = {
        customer_id: customer_id,
        date: date_obj,
        tin: 123456789,
        terms: 1,
        pwd_id_no: 987654321,
        business_style: "services",
      };

      cy.request({
        method: "POST",
        url: `http://localhost:3000/api/customers/invoices`, // baseUrl is prepend to URL
        failOnStatusCode: false,
        body: invoice,
      }).then((response) => {
        expect(response.status).to.eq(200);
      });
    });
  });

  context("Deletes an invoice", () => {
    it("Deletes an invoice for an existing customer.", () => {
      const customer_id = "673c31c5931e94eac95b34bb";

      cy.request({
        method: "DELETE",
        url: `http://localhost:3000/api/customers/invoices/${customer_id}`, // baseUrl is prepend to URL
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(200);
      });
    });
  });
});
