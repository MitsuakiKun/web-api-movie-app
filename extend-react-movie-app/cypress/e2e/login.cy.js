let movies;

// I couldn't use the authentication with Cypress Browser.
// So, This testcases only works before login.

describe('Login Test', () => {
    before(() => {
        // Get movies from TMDB and store them locally.
        cy.request(
          `https://api.themoviedb.org/3/discover/movie?api_key=${Cypress.env(
            "TMDB_KEY"
          )}&language=en-US&include_adult=false&include_video=false&page=1`
        )
          .its("body")
          .then((response) => {
            movies = response.results;
          });
      });

    it('should not access first page without login', () => {
      // Visit the login page
      cy.visit('/');
  
      // Assert that the login page is loaded
      cy.contains('Login Page');
  
      cy.get('button').contains('Login with @mail.wit.ie Google Account').click();

      cy.wait(1000);
      cy.url().should('include', '/login');
    });
  
    it('should not access homepage without login', () => {
      // Visit a page that requires authentication
      cy.visit('/');
  
      // Assert that the user is redirected to the login page
      cy.url().should('include', '/login');

      cy.get('button').contains('Home').click();

      cy.url().should('include', '/login');
    });

    it('should not access favorite page without login', () => {
      // Visit a page that requires authentication
      cy.visit('/');

      cy.get('button').contains('Favorites').click();

      cy.url().should('include', '/login');
    });

    it('should not access upcoming page without login', () => {
      // Visit a page that requires authentication
      cy.visit('/');

      cy.get('button').contains('Upcoming').click();

      cy.url().should('include', '/login');
    });
  });
  