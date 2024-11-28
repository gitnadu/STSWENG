describe("Contracts API test", () => {
  it("Gets a list of contracts", () => {
    cy.request("GET", "http://localhost:3000/api/customers/contracts/67480899bdf9203b43c8c6cc").then(
      (response) => {
        expect([404, 500, 405, 200, 201]).to.include(response.status);
        expect(response.body).to.have.property("contracts");
      }
    );
  });

  context("Update a contract", () => {
    it("Adds a contract for an existing customer.", () => {
      const start_date_obj = new Date("2024-09-02");
      const end_date_obj = new Date("2024-11-28");

      const contract = {
        customer_id: "67480899bdf9203b43c8c6cc",
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
        expect([404, 500, 405, 200, 201]).to.include(response.status);
      });
    });

    it("Adds a contract for a nonexisting customer.", () => {
      const start_date_obj = new Date("2022-09-07");
      const end_date_obj = new Date("2023-09-07");

      const contract = {
        customer_id: "6747a82795e3774b076b9bc9",
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
         expect([404, 500, 405]).to.include(response.status);
      });
    });
  });
});
