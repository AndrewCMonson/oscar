/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

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
    "\n  mutation handleConversationMessage($message: String!, $projectId: String) {\n    handleConversationMessage(message: $message, projectId: $projectId) {\n      content\n      role\n      projectId\n    }\n  }\n": types.HandleConversationMessageDocument,
    "\n  mutation updateUserPreferences(\n    $auth0sub: String!\n    $preferences: UserPreferencesInput!\n  ) {\n    updateUserPreferences(auth0sub: $auth0sub, preferences: $preferences) {\n      userId\n      tone\n      responseStyle\n      preferredLanguage\n      chatModel\n      timezone\n    }\n  }\n": types.UpdateUserPreferencesDocument,
    "\n  mutation createProject(\n    $name: String!\n    $description: String!\n    $type: ProjectType!\n  ) {\n    createProject(name: $name, description: $description, type: $type) {\n      id\n      name\n    }\n  }\n": types.CreateProjectDocument,
    "\n  mutation deleteProject($id: ID!) {\n    deleteProject(id: $id)\n  }\n": types.DeleteProjectDocument,
    "\n  query user($auth0Sub: String!) {\n    user(auth0Sub: $auth0Sub) {\n      id\n      username\n      email\n      projects {\n        id\n        name\n        conversation {\n          id\n          messages {\n            id\n            content\n            role\n            createdAt\n            name\n          }\n        }\n      }\n      preferences {\n        chatModel\n        tone\n        responseStyle\n        preferredLanguage\n        timezone\n        integrations {\n          type\n          enabled\n          apiToken\n          baseUrl\n          workspace\n        }\n      }\n    }\n  }\n": types.UserDocument,
    "\n  query GetProjectsByUserId($auth0Sub: String!) {\n    getProjectsByUserId(auth0Sub: $auth0Sub) {\n      id\n      name\n      description\n      type\n      conversation {\n        id\n        messages {\n          id\n          content\n          createdAt\n          role\n          user {\n            id\n            username\n          }\n        }\n      }\n    }\n  }\n": types.GetProjectsByUserIdDocument,
    "\n  query getProject($projectId: ID!) {\n    project(id: $projectId) {\n      id\n      name\n      description\n      type\n      conversation {\n        id\n        messages {\n          id\n          content\n          createdAt\n          role\n          user {\n            id\n            username\n          }\n        }\n      }\n    }\n  }\n": types.GetProjectDocument,
    "\n  query getRepositories {\n    getRepositories {\n      repositories {\n        id\n        name\n        description\n        url\n        language\n        isPrivate\n        forks\n        topics\n        lastPush\n        stars\n      }\n    }\n  }\n": types.GetRepositoriesDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation handleConversationMessage($message: String!, $projectId: String) {\n    handleConversationMessage(message: $message, projectId: $projectId) {\n      content\n      role\n      projectId\n    }\n  }\n"): (typeof documents)["\n  mutation handleConversationMessage($message: String!, $projectId: String) {\n    handleConversationMessage(message: $message, projectId: $projectId) {\n      content\n      role\n      projectId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateUserPreferences(\n    $auth0sub: String!\n    $preferences: UserPreferencesInput!\n  ) {\n    updateUserPreferences(auth0sub: $auth0sub, preferences: $preferences) {\n      userId\n      tone\n      responseStyle\n      preferredLanguage\n      chatModel\n      timezone\n    }\n  }\n"): (typeof documents)["\n  mutation updateUserPreferences(\n    $auth0sub: String!\n    $preferences: UserPreferencesInput!\n  ) {\n    updateUserPreferences(auth0sub: $auth0sub, preferences: $preferences) {\n      userId\n      tone\n      responseStyle\n      preferredLanguage\n      chatModel\n      timezone\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createProject(\n    $name: String!\n    $description: String!\n    $type: ProjectType!\n  ) {\n    createProject(name: $name, description: $description, type: $type) {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation createProject(\n    $name: String!\n    $description: String!\n    $type: ProjectType!\n  ) {\n    createProject(name: $name, description: $description, type: $type) {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteProject($id: ID!) {\n    deleteProject(id: $id)\n  }\n"): (typeof documents)["\n  mutation deleteProject($id: ID!) {\n    deleteProject(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query user($auth0Sub: String!) {\n    user(auth0Sub: $auth0Sub) {\n      id\n      username\n      email\n      projects {\n        id\n        name\n        conversation {\n          id\n          messages {\n            id\n            content\n            role\n            createdAt\n            name\n          }\n        }\n      }\n      preferences {\n        chatModel\n        tone\n        responseStyle\n        preferredLanguage\n        timezone\n        integrations {\n          type\n          enabled\n          apiToken\n          baseUrl\n          workspace\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query user($auth0Sub: String!) {\n    user(auth0Sub: $auth0Sub) {\n      id\n      username\n      email\n      projects {\n        id\n        name\n        conversation {\n          id\n          messages {\n            id\n            content\n            role\n            createdAt\n            name\n          }\n        }\n      }\n      preferences {\n        chatModel\n        tone\n        responseStyle\n        preferredLanguage\n        timezone\n        integrations {\n          type\n          enabled\n          apiToken\n          baseUrl\n          workspace\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetProjectsByUserId($auth0Sub: String!) {\n    getProjectsByUserId(auth0Sub: $auth0Sub) {\n      id\n      name\n      description\n      type\n      conversation {\n        id\n        messages {\n          id\n          content\n          createdAt\n          role\n          user {\n            id\n            username\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetProjectsByUserId($auth0Sub: String!) {\n    getProjectsByUserId(auth0Sub: $auth0Sub) {\n      id\n      name\n      description\n      type\n      conversation {\n        id\n        messages {\n          id\n          content\n          createdAt\n          role\n          user {\n            id\n            username\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getProject($projectId: ID!) {\n    project(id: $projectId) {\n      id\n      name\n      description\n      type\n      conversation {\n        id\n        messages {\n          id\n          content\n          createdAt\n          role\n          user {\n            id\n            username\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getProject($projectId: ID!) {\n    project(id: $projectId) {\n      id\n      name\n      description\n      type\n      conversation {\n        id\n        messages {\n          id\n          content\n          createdAt\n          role\n          user {\n            id\n            username\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getRepositories {\n    getRepositories {\n      repositories {\n        id\n        name\n        description\n        url\n        language\n        isPrivate\n        forks\n        topics\n        lastPush\n        stars\n      }\n    }\n  }\n"): (typeof documents)["\n  query getRepositories {\n    getRepositories {\n      repositories {\n        id\n        name\n        description\n        url\n        language\n        isPrivate\n        forks\n        topics\n        lastPush\n        stars\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;