import { defineConfig } from 'orval'

export default defineConfig({
  'auto-cars': {
    input: {
      // target: 'https://yuri-rodrigues-autocars-backend.pd8edx.easypanel.host/swagger/docs/swagger.json',
      target: 'http://localhost:3333/swagger/docs/swagger.json',
      validation: false,
    },
    output: {
      mode: 'tags-split',
      prettier: true,
      target: 'src/http/orval-generation/routes',
      schemas: 'src/http/orval-generation/schemas',
      client: 'react-query',
      httpClient: 'fetch',
      clean: true,
      mock: true,
      override: {
        fetch: {
          includeHttpResponseReturnType: false,
        },
        query: {
          useQuery: true,
          useInfinite: true,
          options: {
            networkMode: 'always',
          },
        },
        mutator: {
          path: './src/http/custom-instance-fetch.ts',
          name: 'customFetch',
        },
      },
    },
    // hooks: {
    //   afterAllFilesWrite: 'npx eslint --fix ./src',
    // },
  },
})
