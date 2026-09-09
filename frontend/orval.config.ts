import { defineConfig } from 'orval';

export default defineConfig({
  zidnahumApi: {
    input: {
      target: 'http://127.0.0.1:8000/docs/schema/',
    },
    output: {
      client: 'angular',
      target: 'src/app/shared/services/api/api.ts',
      mode: 'tags',
      formatter: 'prettier',
      namingConvention: 'kebab-case',
      schemas: 'src/app/shared/services/api/models',
      override: {
        angular: {
          baseUrl: { apiId: 'api' },
        },
      },
      indexFiles: true,
      clean: true,
    },
  },
});
