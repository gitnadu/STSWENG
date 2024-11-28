describe("Contracts API test", () => {


  context("Update a contract", () => {
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
