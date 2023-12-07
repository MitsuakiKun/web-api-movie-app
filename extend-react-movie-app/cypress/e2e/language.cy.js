import { filterByGenre } from "../support/e2e";
let movies;

describe('Language Switching', () => {

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

  beforeEach(() => {
    cy.visit('/');
    cy.wait(1000); 
  });

  it('Should switch to Japanese', () => {
    cy.get('button').contains('日本語').click(); // Assuming you have a test ID for the Japanese button
    cy.get("h3").contains('映画を探索'); // Verify that the page content reflects the change to Japanese
  });


  it('Should switch to English and find genres', () => { 
    cy.get('button').contains('English').click();// Assuming you have a test ID for the English button
    cy.get("h3").contains('Discover Movies'); // Verify that the page content reflects the change to English
    

    const selectedGenreId = 35;
    const selectedGenreText = "Comedy";
    const matchingMovies = filterByGenre(movies, selectedGenreId);
    cy.get("#genre-select").click();
    cy.get("li").contains(selectedGenreText).click();
    cy.get(".MuiCardHeader-content").should(
      "have.length",
      matchingMovies.length
    );
    cy.get(".MuiCardHeader-content").each(($card, index) => {
      cy.wrap($card).find("p").contains(matchingMovies[index].title);
    });
  });

  it('Should switch to Japanese and navigate', () => {
    cy.get('button').contains('日本語').click();
    cy.get('button').contains('お気に入り').click();
    cy.url().should('include', '/movies/favorites');
    cy.get("h3").contains('お気に入りの映画');
    // Repeat for other navigation links
  });

  it('Should switch language and perform search Mission in Possible in Japanese', () => {
    cy.get('button').contains('日本語').click();
    const searchString = "ミッション";
    cy.get("#filled-search").clear().type(searchString); // Enter m in text box
    cy.get(".MuiCardHeader-content").should("have.length", 1);
  });

  it('Should persist language setting across pages', () => {
    cy.get('button').contains('日本語').click();
    cy.get('button').contains('お気に入り').click();
    cy.url().should('include', '/movies/favorites');
    cy.get('button').contains('ホーム').click();
    cy.get("h3").contains('映画を探索');
  });

  it('Should find the title of Mission Impossible in Movie detail page', () => {
    cy.get('button').contains('More info...').click();
    cy.get('button').contains('日本語').click();
    cy.get("h3").contains('ミッション：インポッシブル');
  });
    

});