describe("Navigation", () => {
    it("should navigate to my-favorites page", () => {
        cy.visit("/")

        cy.get("input[data-navigation='switch']").click()

        cy.title().should("eq", 'Marvel Search Heroes | Seus favoritos')
    })

    it("should redirect to 404 page when character page does not exist", async () => {
        cy.visit("/characters/HeróiQueNãoExiste")

        cy.title().should("eq", 'Marvel Search Heroes | Page not found')
    })
})