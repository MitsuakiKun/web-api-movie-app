let movies;
let movie;

describe('Movie Details Page', () => {
    before(() => {
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

    it('loads movie details and check production company', () => {
    
        cy.request(
            `https://api.themoviedb.org/3/movie/${
              movies[0].id
            }?api_key=${Cypress.env("TMDB_KEY")}`
          )
            .its("body")
            .then((movieDetails) => {
            movie = movieDetails;
      });

      cy.visit(`/movies/${movies[0].id}`);
      cy.get('h3').contains('Overview');
      // Check if production companies are visible
      cy.get('ul').contains('Production Companies');
      cy.get('.production-company-chip').should('have.length.greaterThan', 0);
      
      cy.get('.production-company-chip').first().click();

      // Check if the page has redirected to Google search
      cy.url().should('include', 'www.google.com');

    });

    it('should show similar movies', () => {
      cy.visit(`/movies/${movies[0].id}`);
      // Check if similar movies section is visible
      cy.get('h3').contains('Similar Movies');
  
      // Assuming there is at least one similar movie card
      cy.get('.MuiCardHeader-root').should('have.length.greaterThan', 0);
    });
  });
  