const MOCK_DATA_FIXTURE = "stan_titles_mock_data";

const env = Cypress.env();

context("Stan TV Coding Challenge app", () => {
  it("works properly", () => {
    cy.intercept("getStanTitles", { delay: 1000, fixture: MOCK_DATA_FIXTURE }).as("fetchStanTitles");

    cy.visit(`http://localhost:${env.PORT}`);

    cy.wait("@fetchStanTitles");

    // Stan titles should be fetched in carousel
    cy.get("[aria-label='Carousel']").within(() => {
      cy.get("img").should("exist");
    });

    // hover over carousel slide
    cy.get("[aria-label='Carousel'] li").eq(0).trigger("mouseover");

    // first slide should be selected
    cy.get("[aria-label='Carousel'] li").eq(0).invoke("attr", "aria-selected").should("eq", "true");
    cy.get("[aria-label='Carousel'] li").eq(1).invoke("attr", "aria-selected").should("eq", "false");

    // navigate right using arrow keys
    cy.get("body").type("{rightArrow}");

    // second slide should be selected
    cy.get("[aria-label='Carousel'] li").eq(0).invoke("attr", "aria-selected").should("eq", "false");
    cy.get("[aria-label='Carousel'] li").eq(1).invoke("attr", "aria-selected").should("eq", "true");

    // navigate left using arrow keys
    cy.get("body").type("{leftArrow}");

    // first slide should be selected again
    cy.get("[aria-label='Carousel'] li").eq(0).invoke("attr", "aria-selected").should("eq", "true");
    cy.get("[aria-label='Carousel'] li").eq(1).invoke("attr", "aria-selected").should("eq", "false");

    // go to program
    cy.get("body").type("{enter}");

    cy.fixture(MOCK_DATA_FIXTURE).then((programs) => {
      const selectedProgram = programs[0];

      // program details should have program title
      cy.get("h2").should("contain", selectedProgram.title);

      // program details should have misc. program info
      cy.get("h3")
        .should("contain", selectedProgram.rating)
        .and("contain", selectedProgram.year)
        .and("contain", selectedProgram.genre)
        .and("contain", selectedProgram.language);

      // program details should have program description
      cy.get("p").should("contain", selectedProgram.description);
    });
  });
});
