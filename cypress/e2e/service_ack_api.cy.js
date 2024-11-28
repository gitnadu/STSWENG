describe("Service acknowledgment API test", () => {

  context("Add a service acknowledgment", () => {
  

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
