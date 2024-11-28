describe("Articles API test", () => {
  it("Gets a list of articles for a customer", () => {
    cy.request(
      "GET",
      "http://localhost:3000/api/customers/invoices/articles/674809a1bdf9203b43c8c71e"
    ).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("articles");
    });
  });

  context("Add an article", () => {
    it("Adds a article for an existing service invoice.", () => {
      const si_id = "674809a1bdf9203b43c8c71e";
      const quantity= 1
      const unit= 1
      const article_name= "1"
      const unit_price= 1
      const amount= 1

      cy.request({
        method: "POST",
        url: "http://localhost:3000/api/customers/invoices/articles", // baseUrl is prepend to URL
        body: {
          si_id,
          quantity,
          unit,
          article_name,
          unit_price,
          amount
        },
      }).then((response) => {
        expect([404, 500, 405]).to.include(response.status);
      });
    });

    it("Adds a service for an nonexisting service invoice.", () => {
      const invoice = {
        business_style: "SERVICE INVOICE",
        customer_id: "6747a82795e3774b076b9bc9",
        date: "2024-02-11",
        pwd_id_no: "112121211",
        terms: "11",
        tin: "111111111"
      }

      cy.request({
        method: "POST",
        url: "http://localhost:3000/api/customers/invoices", // baseUrl is prepend to URL
        body: {
          invoice
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect([404, 500, 405]).to.include(response.status);
      });
    });
  });
});
