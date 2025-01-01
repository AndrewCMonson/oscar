
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:3005/graphql",
  documents: "packages/client/src/utils/graphql/",
  generates: {
    "packages/types/src/gql/": {
      preset: "client",
      plugins: [
        "typescript-resolvers",
        "typescript-document-nodes",
      ],
    },
    "packages/types/src/gql/graphql.ts": {
      plugins: [
        "typescript",
        "typescript-resolvers",
        "typescript-document-nodes",
      ],
      config: {
        contextType: "../apiTypes/index#MiddlewareContext",
        useIndexSignature: true,
      },
    },
  },
};

export default config;
