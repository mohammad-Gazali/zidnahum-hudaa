import { defineConfig } from 'orval';

export default defineConfig({
  zidnahumApi: {
    input: {
      target: 'http://127.0.0.1:8000/docs/schema/',
      validation: false,
    },
    output: {
      client: 'angular',
      target: 'src/app/shared/services/api',
      mode: 'tags-split',
      schemas: {
        path: 'src/app/shared/services/api/models',
      },
      indexFiles: true,
      clean: true,
    },
  },
});