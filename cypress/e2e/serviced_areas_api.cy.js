describe("Serviced areas API test", () => {
  it("Gets a list of articles", () => {
    cy.request(
      "GET",
      "http://localhost:3000/api/services/acknowledgments/serviced_areas"
    ).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("results");
    });
  });

  context("Add serviced areas", () => {
    it("Adds serviced areas for an existing service acknowledgment.", () => {
      const sa_id = "6739b8c1cf1789416418bc57";
      const serviced_areas = [
        {
          area_name: "area 1",
          time_in: new Date(),
          time_out: new Date(),
          acknowledged_by: "person 1",
          remarks: "Hello world.",
        },
        {
          area_name: "area 2",
          time_in: new Date(),
          time_out: new Date(),
          acknowledged_by: "person 2",
          remarks: "",
        },
        {
          area_name: "area 3",
          time_in: new Date(),
          time_out: new Date(),
          acknowledged_by: "person 3",
          remarks: "STSWENG group 9",
        },
      ];

      cy.request({
        method: "POST",
        url: "http://localhost:3000/api/services/acknowledgments/serviced_areas", // baseUrl is prepend to URL
        body: {
          sa_id,
          serviced_areas,
        },
      }).then((response) => {
        expect(response.status).to.eq(201);
      });
    });

    it("Adds a service for an nonexisting service invoice.", () => {
      const sa_id = "66fe3c7888c42f8278a5ed5f";
      const serviced_areas = [
        {
          area_name: "area 4",
          time_in: new Date(),
          time_out: new Date(),
          acknowledged_by: "person 4",
          remarks: "Adriel Fancubit",
        },
        {
          area_name: "area 5",
          time_in: new Date(),
          time_out: new Date(),
          acknowledged_by: "person 5",
          remarks: "Airelle Maagma",
        },
      ];

      cy.request({
        method: "POST",
        url: "http://localhost:3000/api/services/acknowledgments/serviced_areas", // baseUrl is prepend to URL
        body: {
          sa_id,
          serviced_areas,
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(500);
      });
    });
  });
});
