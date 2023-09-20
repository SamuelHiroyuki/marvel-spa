describe("HeroesList", () => {
    it("should navigate to the next page", () => {
        cy.visit("/")

        cy.get('a[data-testid="next-page-button"]').click()

        cy.url().should("include", "?page=2")
    })

    it("should not navigate to the previous page when in the first page", () => {
        cy.visit("/")

        cy.get('button[data-testid="previous-page-button"]').should('be.disabled')
        cy.get('button[data-testid="previous-page-button"]').click({ force: true })

        cy.url().should("not.include", "?page=")
    })

    it("should be able to change the ordering", () => {
        cy.visit("/")

        cy.get('a[data-testid="orderBy-button"]').click()
        cy.url().should("include", "?orderBy=desc")

        cy.get('a[data-testid="orderBy-button"]').click()
        cy.url().should("include", "?orderBy=asc")
    })

    it("should navigate to a character page", async () => {
        cy.visit("/")

        cy.get("li[data-testid='HeroesList__item-0']").click()

        cy.get("h2").then(h2 => {
            cy.title().should("eq", `Marvel Search Heroes | ${h2.text()}`)
        })
    })
})