describe('Smoke Tests', () => {
    beforeEach(() => {
      // Visit the homepage before each test
      cy.visit('http://localhost:3000/');
    });
  
    it('should load the homepage successfully', () => {
      // Check that the logo is visible
      cy.get('.mr-2').should('be.visible');
    });
  
    it('should load the client home page successfully', () => {
        cy.visit('http://localhost:3000/client/home');

        // Verify the URL is correct
        cy.url().should('include', '/client/home');
    });

    
    it("should allow the user to login to admin dashboard", () => {
        cy.visit("http://localhost:3000");
        cy.get('input[type="text"][placeholder="Enter your username"]').type("Adriel");
        cy.get('input[type="password"][placeholder="Enter your password"]').type("Fancubit");
        cy.get('[data-test="submit-button"]').should('be.visible').click();             // Click the button
        cy.wait(10000); //Going to dashboard or home is slow for some reason.
      });

  });
  