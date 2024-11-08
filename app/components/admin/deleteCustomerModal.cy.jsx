import React from "react";
import "tailwindcss/tailwind.css"; //For CSS tailwind to be used in Cypress, import the CSS file.
import DeleteCustomerModal from "./DeleteCustomerModal";

describe("<DeleteCustomerModal />", () => {
    it("Mounts <DeleteCustomerModal />", () => {
        cy.mount(<DeleteCustomerModal />);
    });
});