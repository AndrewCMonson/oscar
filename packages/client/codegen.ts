
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:3005/graphql",
  documents: "./src/utils/graphql/",
  generates: {
    "../types/src/clientTypes/generated/": {
      preset: "client",
      plugins: [
      ],
    },
  },
};

export default config;
