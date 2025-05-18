import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:4000/graphql",
  documents: "./src/lib/graphql/**/*.{ts,tsx}",
  generates: {
    "./generated/": {
      preset: "client",
      plugins: []
    },
    "./schema.graphql": {
      plugins: ["schema-ast"]
    }
  }
};

export default config;
