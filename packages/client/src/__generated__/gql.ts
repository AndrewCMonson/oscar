/* eslint-disable */
import * as types from "./graphql";
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
  "\n  mutation handleConversationMessage($message: String!, $projectId: String!) {\n  handleConversationMessage(message: $message, projectId: $projectId) {\n  content\n  role\n    }\n  }\n":
    types.HandleConversationMessageDocument,
  "\n  query GetUser($auth0Sub: String!){\n    user(auth0Sub: $auth0Sub){\n      id\n      username\n      email\n      projects {\n        id\n        name\n        conversation {\n          id\n          messages {\n            id\n            content\n            role\n            createdAt\n            name\n          }\n        }\n      }\n    }\n  }\n":
    types.GetUserDocument,
  "\n  query GetProjectsByUserId($auth0Sub: String!){\n    getProjectsByUserId(auth0Sub: $auth0Sub){\n      id\n      name\n      description\n      type\n      conversation {\n        id\n        messages {\n          id\n          content\n          createdAt\n          role\n          user {\n            id\n            username\n          }\n        }\n      }\n    }\n  }\n":
    types.GetProjectsByUserIdDocument,
  "\n  query GetProject($projectId: ID!){\n    project(id: $projectId){\n      id\n      name\n      description\n      type\n      conversation {\n        id\n        messages {\n          id\n          content\n          createdAt\n          role\n          user {\n            id\n            username\n          }\n        }\n      }\n    }\n  }\n":
    types.GetProjectDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation handleConversationMessage($message: String!, $projectId: String!) {\n  handleConversationMessage(message: $message, projectId: $projectId) {\n  content\n  role\n    }\n  }\n",
): (typeof documents)["\n  mutation handleConversationMessage($message: String!, $projectId: String!) {\n  handleConversationMessage(message: $message, projectId: $projectId) {\n  content\n  role\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query GetUser($auth0Sub: String!){\n    user(auth0Sub: $auth0Sub){\n      id\n      username\n      email\n      projects {\n        id\n        name\n        conversation {\n          id\n          messages {\n            id\n            content\n            role\n            createdAt\n            name\n          }\n        }\n      }\n    }\n  }\n",
): (typeof documents)["\n  query GetUser($auth0Sub: String!){\n    user(auth0Sub: $auth0Sub){\n      id\n      username\n      email\n      projects {\n        id\n        name\n        conversation {\n          id\n          messages {\n            id\n            content\n            role\n            createdAt\n            name\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query GetProjectsByUserId($auth0Sub: String!){\n    getProjectsByUserId(auth0Sub: $auth0Sub){\n      id\n      name\n      description\n      type\n      conversation {\n        id\n        messages {\n          id\n          content\n          createdAt\n          role\n          user {\n            id\n            username\n          }\n        }\n      }\n    }\n  }\n",
): (typeof documents)["\n  query GetProjectsByUserId($auth0Sub: String!){\n    getProjectsByUserId(auth0Sub: $auth0Sub){\n      id\n      name\n      description\n      type\n      conversation {\n        id\n        messages {\n          id\n          content\n          createdAt\n          role\n          user {\n            id\n            username\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query GetProject($projectId: ID!){\n    project(id: $projectId){\n      id\n      name\n      description\n      type\n      conversation {\n        id\n        messages {\n          id\n          content\n          createdAt\n          role\n          user {\n            id\n            username\n          }\n        }\n      }\n    }\n  }\n",
): (typeof documents)["\n  query GetProject($projectId: ID!){\n    project(id: $projectId){\n      id\n      name\n      description\n      type\n      conversation {\n        id\n        messages {\n          id\n          content\n          createdAt\n          role\n          user {\n            id\n            username\n          }\n        }\n      }\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
