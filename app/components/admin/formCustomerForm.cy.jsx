import React from 'react'
import 'tailwindcss/tailwind.css'; //For CSS tailwind to be used in Cypress, import the CSS file.
import CustomerForm from './customerForm'



describe('<CustomerForm />', () => {
  it('Fill in all of the fields correctly.', () => {
    // see: https://on.cypress.io/mounting-react
    cy.viewport(1280, 720); // Set the viewport to 1280x720 (HD)
    cy.mount(<CustomerForm />)

    cy.getByData("input_client_name").type("DLSU Manila");
    cy.getByData("input_contact_person").type("Andrei Palonpon");
    cy.getByData("input_email_address").type("andrei_palonpon@dlsu.edu.ph");
    cy.getByData("input_address").type("2401 Taft Avenue, Manila");
    cy.getByData("input_status").select("Ongoing");
    cy.getByData("input_type").select("Industrial");
    cy.getByData("input_services_hygenic_pest_control").click();
    cy.getByData("input_contact_number").type("09199650046");
    cy.getByData("submit_button").click();
    //cy.log(cy.location());
  })

  it('Fill in a contact number incorrectly.', () => {
    // see: https://on.cypress.io/mounting-react
    cy.viewport(1280, 720); // Set the viewport to 1280x720 (HD)
    cy.mount(<CustomerForm />)

    cy.getByData("input_client_name").type("Multi-Pest Services Corp.");
    cy.getByData("input_contact_person").type("Norma B. Salazar");
    cy.getByData("input_email_address").type("multipest14@yahoo.com");
    cy.getByData("input_address").type("Mandaluyong City, NCR");
    cy.getByData("input_status").select("Ongoing");
    cy.getByData("input_type").select("Service");
    cy.getByData("input_services_hygenic_pest_control").click();
    cy.getByData("input_contact_number").type("6319693");
    cy.getByData("submit_button").click();
    cy.getByData("error_contact_number").should("exist").contains("Please follow one of the following formats:");
  });

  it('Fill in an email address incorrectly.', () => {
    // see: https://on.cypress.io/mounting-react
    cy.viewport(1280, 720); // Set the viewport to 1280x720 (HD)
    cy.mount(<CustomerForm />)

    cy.getByData("input_client_name").type("Multi-Pest Services Corp.");
    cy.getByData("input_contact_person").type("Norma B. Salazar");
    cy.getByData("input_email_address").type("multipest@");
    cy.getByData("input_address").type("Mandaluyong City, NCR");
    cy.getByData("input_status").select("Ongoing");
    cy.getByData("input_type").select("Service");
    cy.getByData("input_services_hygenic_pest_control").click();
    cy.getByData("input_contact_number").type("0263196933");
    cy.getByData("submit_button").click();
    cy.getByData("error_email_address").should("exist").should("have.text", "Please enter a properly formatted email address.");
  })

  it("Fill in some of the fields.", () => {
    cy.viewport(1280, 720); // Set the viewport to 1280x720 (HD)
    cy.mount(<CustomerForm />);

    cy.getByData("input_client_name").type("DLSU Laguna");
    cy.getByData("input_address").type("Laguna Boulevard, LTI Spine Road, Barangays Biñan and Malamig, Biñan City, Laguna");
    cy.getByData("input_type").select("Service");
    cy.getByData("input_services_termite_control").click();
    cy.getByData("input_services_rodent_control").click();
    cy.getByData("input_contact_number").type("09199650046");
    cy.getByData("submit_button").click();
    cy.getByData("error_contact_person").should("exist").should("have.text","Please enter this field.");
    cy.getByData("error_email_address").should("exist").should("have.text","Please enter this field.");
    cy.getByData("error_status").should("exist").should("have.text","Please enter this field.");
  });

  it("Do not fill in all fields.", () => {
    cy.viewport(1280, 720); // Set the viewport to 1280x720 (HD)
    cy.mount(<CustomerForm />);

    cy.getByData("submit_button").click();
    cy.getByData("error_client_name").should("exist").should("have.text","Please enter this field.");
    cy.getByData("error_contact_person").should("exist").should("have.text","Please enter this field.");
    cy.getByData("error_email_address").should("exist").should("have.text","Please enter this field.");
    cy.getByData("error_address").should("exist").should("have.text","Please enter this field.");
    cy.getByData("error_services").should("exist").should("have.text","Please enter this field.");
    cy.getByData("error_status").should("exist").should("have.text","Please enter this field.");
    cy.getByData("error_type").should("exist").should("have.text","Please enter this field.");
    cy.getByData("error_contact_number").should("exist").should("have.text","Please enter this field.");
  });
})