import { defineConfig } from "cypress";

export default defineConfig({
  video: true,
  videoCompression: 32,
  screenshotOnRunFailure: true,
  trashAssetsBeforeRuns: true,
  
  e2e: {
    setupNodeEvents(on, config) { // eslint-disable-line
      // implement node event listeners here
    },
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});
