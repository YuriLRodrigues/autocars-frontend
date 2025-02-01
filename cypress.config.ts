import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setupNodeEvents(on, config) {},
    viewportWidth: 1920,
    viewportHeight: 1080,
    supportFile: false,
  },
  env: {
    apiUrl: 'http://localhost:3333',
  },
})
