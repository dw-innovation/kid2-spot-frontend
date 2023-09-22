describe("Natural Language Input Validation Error", () => {
  it("handles API errors gracefully after user searches for cafes in Bonn", () => {
    cy.fixture("imrRequestHotelsBonn.json").as("imrRequestHotelsBonn");

    cy.intercept(
      {
        method: "POST",
        url: "https://kid2spotnlpapi.lab-dw.com/transform-sentence-to-imr",
      },
      {
        statusCode: 200,
        fixture: "imrRequestHotelsBonn.json",
      }
    ).as("imrRequest");

    cy.intercept(
      {
        method: "POST",
        url: "https://kid2osmapi.lab-dw.com/validate-imr",
      },
      {
        statusCode: 500,
      }
    ).as("validateRequest");

    cy.visit("http://localhost:3000/");

    cy.get("textarea").type("find all cafes in bonn");

    cy.get("button[type='submit']").click();

    cy.wait("@imrRequest").its("response.statusCode").should("eq", 200);

    cy.wait("@validateRequest").its("response.statusCode").should("eq", 500);

    cy.get('div[role="dialog"]')
      .should("be.visible")
      .and("contain.text", "Something went wrong!");
  });
});

describe("Natural Language Input Named Area Selection", () => {
  it("gets named area suggestions for Bonn", () => {
    cy.fixture("imrRequestHotelsBonn.json").as("imrRequestHotelsBonn");

    cy.intercept(
      {
        method: "POST",
        url: "https://kid2spotnlpapi.lab-dw.com/transform-sentence-to-imr",
      },
      {
        statusCode: 200,
        fixture: "imrRequestHotelsBonn.json",
      }
    ).as("imrRequest");

    cy.intercept(
      {
        method: "POST",
        url: "https://kid2osmapi.lab-dw.com/validate-imr",
      },
      {
        statusCode: 200,
      }
    ).as("validateRequest");

    cy.intercept(
      {
        method: "POST",
        url: "https://kid2osmapi.lab-dw.com/run-osm-query",
      },
      {
        statusCode: 200,
        fixture: "osmRequestHotelsBonn.json",
      }
    ).as("osmRequest");

    cy.visit("http://localhost:3000/");

    cy.get("textarea").type("find all cafes in bonn");

    cy.get("button[type='submit']").click();

    cy.wait("@imrRequest").its("response.statusCode").should("eq", 200);

    cy.wait("@validateRequest").its("response.statusCode").should("eq", 200);

    cy.get("div").should(
      "contain.text",
      "Bonn, North Rhine-Westphalia, Germany"
    );
    cy.contains("button", "Continue").click();

    cy.get(".leaflet-container").should("exist");

    cy.get(".leaflet-gl-layer").should("have.length.greaterThan", 0);

    cy.get(".leaflet-interactive").should("have.length.greaterThan", 0);
  });
});
