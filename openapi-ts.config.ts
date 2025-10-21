import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  client: '@hey-api/client-fetch',
  input: './schemas/complete.json',
  output: {
    path: './src',
    format: 'prettier',
  },
  plugins: [
    '@hey-api/typescript',
    '@hey-api/client-fetch',
    '@hey-api/sdk',
  ],
  // Respect required fields from schema
  parser: {
    transforms: {
      // Respect the 'required' array from the OpenAPI schema
      propertiesRequiredByDefault: true,
    },
  },
});
