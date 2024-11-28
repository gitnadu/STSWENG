describe("Acknowledgment API test", () => {
  it("Gets an acknowledgment", () => {
    const customer_id = "67478f8359fa621dbe9dc5ec";

    cy.request(
      "GET",
      `http://localhost:3000/api/customers/acknowledgements/${customer_id}`
    ).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("acknowledgments");
    });
  });

  context("Add an acknowledgment", () => {
    it("Adds an acknowledgment for an existing customer.", () => {
      const customer_id = "673c31c5931e94eac95b34bb";
      const date_obj = new Date("2024-11-10");

      const acknowledgment = {
        customer_id: customer_id,
        date: date_obj,
      };

      cy.request({
        method: "POST",
        url: "http://localhost:3000/api/customers/acknowledgements", // baseUrl is prepend to URL
        body: acknowledgment,
      }).then((response) => {
        expect(response.status).to.eq(201);
      });
    });
  });

  context("Edits an acknowledgment", () => {
    it("Edits an acknowledgment for an existing customer.", () => {
      const customer_id = "673c31c5931e94eac95b34bb";
      const date_obj = new Date("2024-11-23");

      const acknowledgment = {
        customer_id: customer_id,
        date: date_obj,
      };

      cy.request({
        method: "POST",
        url: `http://localhost:3000/api/customers/acknowledgements`, // baseUrl is prepend to URL
        failOnStatusCode: false,
        body: acknowledgment,
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
        url: `http://localhost:3000/api/customers/acknowledgements/${customer_id}`, // baseUrl is prepend to URL
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(200);
      });
    });
  });
});
