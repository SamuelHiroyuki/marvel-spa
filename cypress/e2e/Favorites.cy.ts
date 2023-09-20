describe("Favorites", () => {
    it("should be able to favorite a character", () => {
        cy.visit("/")

        cy.get('li[data-testid="HeroesList__item-0"]').within(() => {
            cy.get('button[data-checked="false"]').should("exist")
            cy.get('button').click()
            cy.get('button[data-checked="true"]').should("exist")
        });
    })

    it("should be able to unfavorite a character", () => {
        cy.visit("/")

        cy.get('li[data-testid="HeroesList__item-0"]').within(() => {
            cy.get('button[data-checked="false"]').should("exist")
            cy.get('button').click()
            cy.get('button[data-checked="true"]').should("exist")
            cy.get('button').click()
            cy.get('button[data-checked="false"]').should("exist")
        });
    })

    it("should show the favorithe character in the my-favorites page", () => {
        cy.visit("/")

        cy.get('li[data-testid="HeroesList__item-0"]').within(() => {
            cy.get('button[data-checked="false"]').should("exist")
            cy.get('button').click()
        });


        cy.get("input[data-navigation='switch']").click()

        cy.title().should("eq", 'Marvel Search Heroes | Seus favoritos')

        cy.get('ul[role="list"]').should('have.length', 1);
    })
})