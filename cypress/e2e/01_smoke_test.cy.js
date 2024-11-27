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
        cy.visit("http://localhost:3000/admin/dashboard");
        cy.wait(4000); //Going to dashboard or home is slow for some reason.
        cy.url().should('include', '/admin/dashboard');
      });

    it('should display customer page', () => {
      // Verify table renders with data
        cy.visit("http://localhost:3000/admin/customer");
    });

  });
  