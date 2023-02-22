describe("Navigation", () => {
    it("", () => {
        cy.visit("http://localhost:3000/");
        cy.get("h1").contains("KID2 Overpass Turbo Prototype");
    });
});
