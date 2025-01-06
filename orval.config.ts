import { defineConfig } from 'orval'

export default defineConfig({
  'auto-cars': {
    input: 'http://localhost:3333/swagger/docs/swagger.json',
    output: {
      mode: 'tags',
      target: 'src/http/orval-generation/routes',
      schemas: 'src/http/orval-generation/schemas',
      client: 'react-query',
      httpClient: 'axios',
      baseUrl: 'http://localhost:3333/',
      override: {
        mutator: {
          path: './src/http/custom-instance.ts',
          name: 'customInstance',
        },
      },
    },
    // hooks: {
    //   afterAllFilesWrite: 'eslint --fix .',
    // },
  },
})
