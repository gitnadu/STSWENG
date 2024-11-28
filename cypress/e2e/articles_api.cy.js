describe("Articles API test", () => {
  it("Gets a list of articles", () => {
    cy.request(
      "GET",
      "http://localhost:3000/api/services/invoices/articles"
    ).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("results");
    });
  });

  context("Add an article", () => {
    it("Adds a article for an existing service invoice.", () => {
      const si_id = "6738792ce8c6142b6e35c152";
      const articles = [
        {
          quantity: 35,
          unit: 50,
          article_name: "article 1",
          unit_price: 100,
          amount: 50,
        },
        {
          quantity: 25,
          unit: 35,
          article_name: "article 2",
          unit_price: 150,
          amount: 50,
        },
        {
          quantity: 200,
          unit: 300,
          article_name: "article 3",
          unit_price: 100,
          amount: 120,
        },
      ];

      cy.request({
        method: "POST",
        url: "http://localhost:3000/api/services/invoices/articles", // baseUrl is prepend to URL
        body: {
          si_id,
          articles,
        },
      }).then((response) => {
        expect(response.status).to.eq(201);
      });
    });

    it("Adds a service for an nonexisting service invoice.", () => {
      const si_id = "66fe3c7888c42f8278a5ed5f";
      const articles = [
        {
          quantity: 12,
          unit: 30,
          article_name: "article 4",
          unit_price: 50,
          amount: 30,
        },
        {
          quantity: 30,
          unit: 20,
          article_name: "article 5",
          unit_price: 60,
          amount: 30,
        },
      ];

      cy.request({
        method: "POST",
        url: "http://localhost:3000/api/services/invoices/articles", // baseUrl is prepend to URL
        body: {
          si_id,
          articles,
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(500);
      });
    });
  });
});
