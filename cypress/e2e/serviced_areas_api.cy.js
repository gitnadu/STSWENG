describe("Serviced areas API test", () => {
  it("Gets a list of articles", () => {
    cy.request(
      "GET",
      "http://localhost:3000/api/customers/acknowledgements/servicedAreas/67480b22bdf9203b43c8c784"
    ).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("servicedAreas");
    });
  });

  context("Add serviced areas", () => {
    it("Adds serviced areas for an existing service acknowledgment.", () => {

      const sa_id="67480b22bdf9203b43c8c784"
      const area_name= "Paranaque"
      const time_in= "2024-11-28T03:02:00.000Z"
      const time_out= "2024-11-28T04:01:00.000Z"
      const acknowledged_by= "Adriel Fancubit"
      const remarks= "Rads"

      cy.request({
        method: "POST",
        url: "http://localhost:3000/api/customers/acknowledgements/servicedAreas", // baseUrl is prepend to URL
        body: {
          sa_id, area_name, time_in, time_out, acknowledged_by, remarks
        },
      }).then((response) => {
        expect([404, 500, 405, 200, 201]).to.include(response.status);
      });
    });

    it("Adds a service for an nonexisting service invoice.", () => {
      const sa_id = "6747a82795e3774b076b9b10";
      const area_name= "Paranaque"
      const time_in= "2024-11-28T03:02:00.000Z"
      const time_out= "2024-11-28T04:01:00.000Z"
      const acknowledged_by= "Adriel Fancubit"
      const remarks= "Rads"

      cy.request({
        method: "POST",
        url: "http://localhost:3000/api/customers/acknowledgements/servicedAreas", // baseUrl is prepend to URL
        body: {
          sa_id, area_name, time_in, time_out, acknowledged_by, remarks
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect([404, 500, 405]).to.include(response.status);
      });
    });
  });
});
