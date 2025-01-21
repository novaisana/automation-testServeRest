const { defineConfig } = require('cypress');


module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
    }
  },
  
  reporter: 'mochawesome',
  reporterOptions: {
    reporterEnabled: 'mochawesome',
    mochawesomeReporterOptions: {
      reportDir: 'cypress/reports/mocha',
      quiet: true,
      overwrite: false,
      html: false,
      json: true
    }
  }
});