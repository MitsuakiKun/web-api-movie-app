let movies;

describe('Sorting Test', () => {

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
  });

  it('Should sort by vote average in descending order', () => {
    cy.get('#sort-select').click().get("li").contains('Descending Rating').click();
    cy.get('.MuiCardHeader-content').should('have.length.greaterThan', 1).then(($cards) => {
      const ratings = $cards.map((index, card) => {
        const ratingElement = card.querySelector('svg[data-testid="StarRateIcon"] + .MuiTypography-root');
        return ratingElement ? parseFloat(ratingElement.textContent.trim()) : null;
      });
      const filteredRatings = ratings.filter((rating) => rating !== null);
      expect([...filteredRatings]).to.deep.equal([...filteredRatings].sort((a, b) => b - a));
    });
  });

  it('Should sort by vote average in ascending order', () => {
    cy.get('#sort-select').click().get("li").contains('Ascending Rating').click();
    cy.get('.MuiCardHeader-content').should('have.length.greaterThan', 1).then(($cards) => {
      const ratings = $cards.map((index, card) => {
        const ratingElement = card.querySelector('svg[data-testid="StarRateIcon"] + .MuiTypography-root');
        return ratingElement ? parseFloat(ratingElement.textContent.trim()) : null;
      });
      const filteredRatings = ratings.filter((rating) => rating !== null);
      expect([...filteredRatings]).to.deep.equal([...filteredRatings].sort((a, b) => a - b));
    });
  });

  it('Should sort by release date in descending order', () => {
    cy.get('#sort-select').click().get("li").contains('Descending Publication Date').click();
    cy.get('.MuiCardHeader-content').then(($cards) => {
      const releaseDates = $cards.map((index, card) => new Date(card.querySelector('svg[data-testid="CalendarIconIcon"] + .MuiTypography-root')).getTime());
      expect([...releaseDates]).to.deep.equal([...releaseDates].sort((a, b) => b - a));
    });
  });
  
  it('Should sort by release date in ascending order', () => {
    cy.get('#sort-select').click().get("li").contains('Ascending Publication Date').click();
    cy.get('.MuiCardHeader-content').then(($cards) => {
      const releaseDates = $cards.map((index, card) => new Date(card.querySelector('svg[data-testid="CalendarIconIcon"] + .MuiTypography-root')).getTime());
      expect([...releaseDates]).to.deep.equal([...releaseDates].sort((a, b) => a - b));
    });
  });
  
});