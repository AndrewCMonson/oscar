import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:3005/graphql",
  documents: ["./packages/client/src/**/*.{ts,tsx}"],
  overwrite: true,
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
