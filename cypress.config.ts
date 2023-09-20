
import { defineConfig } from "cypress";

export default defineConfig({
    component: {
        specPattern: "app/**/*.cy.{js,jsx,ts,tsx}",
        devServer: {
            framework: "next",
            bundler: "webpack",
        },
    },
    e2e: {
        specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
        baseUrl: "http://localhost:3000/",
        supportFile: false,
    },
});