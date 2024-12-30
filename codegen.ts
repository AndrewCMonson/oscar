import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:3005/graphql",
  documents: ["./packages/client/src/**/*.{ts,tsx}"],
  overwrite: true,
  // this assumes that all your source files are in a top-level `src/` directory - you might need to adjust this to your file structure
  generates: {
    "./packages/types/src/__generatedTypes__/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        gqlTagName: "gql",
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
