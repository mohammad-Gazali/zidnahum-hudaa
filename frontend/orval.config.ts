import { defineConfig } from 'orval';

export default defineConfig({
  zidnahumApi: {
    input: {
      target: 'http://127.0.0.1:8000/docs/schema/',
    },
    output: {
      client: 'angular',
      target: 'src/app/shared/services/api',
      mode: 'tags',
      schemas: {
        path: 'src/app/shared/services/api/models',
      },
      indexFiles: true,
      clean: true,
    },
  },
});
