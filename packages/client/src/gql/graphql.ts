/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  AccountNumber: { input: any; output: any; }
  BigInt: { input: any; output: any; }
  Byte: { input: any; output: any; }
  CountryCode: { input: any; output: any; }
  Cuid: { input: any; output: any; }
  Currency: { input: any; output: any; }
  DID: { input: any; output: any; }
  Date: { input: any; output: any; }
  DateTime: { input: any; output: any; }
  DateTimeISO: { input: any; output: any; }
  DeweyDecimal: { input: any; output: any; }
  Duration: { input: any; output: any; }
  EmailAddress: { input: any; output: any; }
  GUID: { input: any; output: any; }
  HSL: { input: any; output: any; }
  HSLA: { input: any; output: any; }
  HexColorCode: { input: any; output: any; }
  Hexadecimal: { input: any; output: any; }
  IBAN: { input: any; output: any; }
  IP: { input: any; output: any; }
  IPCPatent: { input: any; output: any; }
  IPv4: { input: any; output: any; }
  IPv6: { input: any; output: any; }
  ISBN: { input: any; output: any; }
  ISO8601Duration: { input: any; output: any; }
  JSON: { input: any; output: any; }
  JSONObject: { input: any; output: any; }
  JWT: { input: any; output: any; }
  LCCSubclass: { input: any; output: any; }
  Latitude: { input: any; output: any; }
  LocalDate: { input: any; output: any; }
  LocalDateTime: { input: any; output: any; }
  LocalEndTime: { input: any; output: any; }
  LocalTime: { input: any; output: any; }
  Locale: { input: any; output: any; }
  Long: { input: any; output: any; }
  Longitude: { input: any; output: any; }
  MAC: { input: any; output: any; }
  NegativeFloat: { input: any; output: any; }
  NegativeInt: { input: any; output: any; }
  NonEmptyString: { input: any; output: any; }
  NonNegativeFloat: { input: any; output: any; }
  NonNegativeInt: { input: any; output: any; }
  NonPositiveFloat: { input: any; output: any; }
  NonPositiveInt: { input: any; output: any; }
  ObjectID: { input: any; output: any; }
  PhoneNumber: { input: any; output: any; }
  Port: { input: any; output: any; }
  PositiveFloat: { input: any; output: any; }
  PositiveInt: { input: any; output: any; }
  PostalCode: { input: any; output: any; }
  RGB: { input: any; output: any; }
  RGBA: { input: any; output: any; }
  RoutingNumber: { input: any; output: any; }
  SESSN: { input: any; output: any; }
  SafeInt: { input: any; output: any; }
  SemVer: { input: any; output: any; }
  Time: { input: any; output: any; }
  TimeZone: { input: any; output: any; }
  Timestamp: { input: any; output: any; }
  URL: { input: any; output: any; }
  USCurrency: { input: any; output: any; }
  UUID: { input: any; output: any; }
  UnsignedFloat: { input: any; output: any; }
  UnsignedInt: { input: any; output: any; }
  UtcOffset: { input: any; output: any; }
  Void: { input: any; output: any; }
};

export type Assistant = {
  __typename?: 'Assistant';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  globalContext?: Maybe<GlobalContext>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export enum AssistantAction {
  CreateCalendarEvent = 'CREATE_CALENDAR_EVENT',
  CreateDocumentation = 'CREATE_DOCUMENTATION',
  CreateProject = 'CREATE_PROJECT',
  CreateTask = 'CREATE_TASK',
  None = 'NONE'
}

export type AssistantResponse = {
  __typename?: 'AssistantResponse';
  content?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Scalars['String']['output']>;
};

export type Conversation = {
  __typename?: 'Conversation';
  assistant?: Maybe<Assistant>;
  assistantId?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  messages?: Maybe<Array<Maybe<Message>>>;
  project?: Maybe<Project>;
  projectId?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  user?: Maybe<User>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type ConversationResponse = {
  __typename?: 'ConversationResponse';
  content?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  projectId?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Scalars['String']['output']>;
};

export type FormattedMessage = {
  __typename?: 'FormattedMessage';
  content: Scalars['String']['output'];
  data?: Maybe<MessageSubData>;
  name: Scalars['String']['output'];
  role: Scalars['String']['output'];
};

export type GlobalContext = {
  __typename?: 'GlobalContext';
  assistant?: Maybe<Assistant>;
  assistantId?: Maybe<Scalars['String']['output']>;
  contextData?: Maybe<Array<Maybe<GlobalContextMessage>>>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type GlobalContextMessage = {
  __typename?: 'GlobalContextMessage';
  content?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  globalContext?: Maybe<GlobalContext>;
  globalContextId?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type GlobalContextMessageInput = {
  content: Scalars['String']['input'];
  name: Scalars['String']['input'];
  role: Scalars['String']['input'];
};

export enum IntegrationType {
  Github = 'GITHUB',
  Jira = 'JIRA',
  Motion = 'MOTION',
  Notion = 'NOTION'
}

export type Issue = {
  __typename?: 'Issue';
  title?: Maybe<Scalars['String']['output']>;
};

export type Memory = {
  __typename?: 'Memory';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  note?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  userMemory?: Maybe<UserMemory>;
  userMemoryId?: Maybe<Scalars['String']['output']>;
};

export type Message = {
  __typename?: 'Message';
  content: Scalars['String']['output'];
  conversation?: Maybe<Conversation>;
  conversationId?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  role: Scalars['String']['output'];
  task?: Maybe<Task>;
  taskId?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  user?: Maybe<User>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type MessageInput = {
  content: Scalars['String']['input'];
  name: Scalars['String']['input'];
  role: Scalars['String']['input'];
};

export type MessageSubData = {
  __typename?: 'MessageSubData';
  action: Scalars['String']['output'];
  data?: Maybe<Scalars['JSON']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createConversation?: Maybe<Conversation>;
  createMessage?: Maybe<Message>;
  createNewIssue?: Maybe<Issue>;
  createNewRepository?: Maybe<Repository>;
  createProject?: Maybe<Project>;
  createTask?: Maybe<Task>;
  createUser?: Maybe<User>;
  deleteConversation?: Maybe<Scalars['String']['output']>;
  deleteMessage?: Maybe<Scalars['String']['output']>;
  deleteProject?: Maybe<Scalars['String']['output']>;
  deleteTask?: Maybe<Task>;
  deleteUser?: Maybe<User>;
  handleConversationMessage?: Maybe<ConversationResponse>;
  updateAssistant: Assistant;
  updateConversation?: Maybe<Conversation>;
  updateMessage?: Maybe<Message>;
  updateProject?: Maybe<Project>;
  updateTask?: Maybe<Task>;
  updateUser?: Maybe<User>;
  updateUserPreferences?: Maybe<UserPreferences>;
};


export type MutationCreateMessageArgs = {
  content: Scalars['String']['input'];
  conversationId: Scalars['String']['input'];
  name: Scalars['String']['input'];
  role: Scalars['String']['input'];
};


export type MutationCreateNewIssueArgs = {
  issueBody: Scalars['String']['input'];
  issueTitle: Scalars['String']['input'];
  repositoryName: Scalars['String']['input'];
};


export type MutationCreateNewRepositoryArgs = {
  description: Scalars['String']['input'];
  privateRepo: Scalars['Boolean']['input'];
  repositoryName: Scalars['String']['input'];
};


export type MutationCreateProjectArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  type: ProjectType;
};


export type MutationCreateTaskArgs = {
  description: Scalars['String']['input'];
  dueDate?: InputMaybe<Scalars['DateTime']['input']>;
  priority: TaskPriority;
  projectId: Scalars['String']['input'];
  status: TaskStatus;
  title: Scalars['String']['input'];
};


export type MutationCreateUserArgs = {
  auth0sub: Scalars['String']['input'];
  email: Scalars['String']['input'];
  role?: InputMaybe<Scalars['String']['input']>;
  username: Scalars['String']['input'];
};


export type MutationDeleteConversationArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteMessageArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteProjectArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteTaskArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationHandleConversationMessageArgs = {
  message: Scalars['String']['input'];
  projectId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateAssistantArgs = {
  id: Scalars['ID']['input'];
  model?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateConversationArgs = {
  id: Scalars['ID']['input'];
  projectId: Scalars['String']['input'];
};


export type MutationUpdateMessageArgs = {
  content: Scalars['String']['input'];
  id: Scalars['ID']['input'];
};


export type MutationUpdateProjectArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateTaskArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  dueDate?: InputMaybe<Scalars['DateTime']['input']>;
  id: Scalars['ID']['input'];
  priority?: InputMaybe<TaskPriority>;
  projectId?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<TaskStatus>;
  title?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateUserArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  lastName?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateUserPreferencesArgs = {
  auth0sub: Scalars['String']['input'];
  preferences?: InputMaybe<UserPreferencesInput>;
};

export type Project = {
  __typename?: 'Project';
  conversation?: Maybe<Conversation>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  tasks?: Maybe<Array<Maybe<Task>>>;
  type: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user?: Maybe<User>;
  userId: Scalars['String']['output'];
};

export enum ProjectType {
  Client = 'CLIENT',
  Internal = 'INTERNAL',
  Personal = 'PERSONAL'
}

export type Query = {
  __typename?: 'Query';
  conversation?: Maybe<Conversation>;
  conversations?: Maybe<Array<Maybe<Conversation>>>;
  getAssistant?: Maybe<Assistant>;
  getProjectsByUserId: Array<Project>;
  getRepositories?: Maybe<Repositories>;
  getRepository?: Maybe<Repository>;
  message?: Maybe<Message>;
  messages?: Maybe<Array<Maybe<Message>>>;
  project?: Maybe<Project>;
  projects: Array<Project>;
  task?: Maybe<Task>;
  tasks?: Maybe<Array<Maybe<Task>>>;
  user: User;
  users?: Maybe<Array<Maybe<User>>>;
};


export type QueryConversationArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetAssistantArgs = {
  role?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetProjectsByUserIdArgs = {
  auth0Sub?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetRepositoryArgs = {
  repositoryName: Scalars['String']['input'];
};


export type QueryMessageArgs = {
  id: Scalars['ID']['input'];
};


export type QueryProjectArgs = {
  id: Scalars['ID']['input'];
};


export type QueryTaskArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUserArgs = {
  auth0Sub: Scalars['String']['input'];
};

export type Repositories = {
  __typename?: 'Repositories';
  repositories?: Maybe<Array<Maybe<Repository>>>;
};

export type Repository = {
  __typename?: 'Repository';
  description: Scalars['String']['output'];
  forks?: Maybe<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  isPrivate?: Maybe<Scalars['Boolean']['output']>;
  language?: Maybe<Scalars['String']['output']>;
  lastPush?: Maybe<Scalars['String']['output']>;
  latestActivityBranch?: Maybe<Scalars['String']['output']>;
  latestActivityDate?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  projectId?: Maybe<Scalars['String']['output']>;
  stars?: Maybe<Scalars['Int']['output']>;
  topics?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  url: Scalars['String']['output'];
};

export enum ResponseStyle {
  Conversational = 'CONVERSATIONAL',
  Direct = 'DIRECT'
}

export type Task = {
  __typename?: 'Task';
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  dueDate?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  jiraTaskId?: Maybe<Scalars['String']['output']>;
  messages?: Maybe<Array<Maybe<Message>>>;
  motionEventId?: Maybe<Scalars['String']['output']>;
  priority: Scalars['String']['output'];
  project?: Maybe<Project>;
  projectId: Scalars['String']['output'];
  status: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user?: Maybe<User>;
  userId: Scalars['String']['output'];
};

export enum TaskPriority {
  High = 'HIGH',
  Low = 'LOW',
  Medium = 'MEDIUM',
  Urgent = 'URGENT'
}

export enum TaskStatus {
  Blocked = 'BLOCKED',
  Completed = 'COMPLETED',
  InProgress = 'IN_PROGRESS',
  Todo = 'TODO'
}

export enum Tone {
  Concise = 'CONCISE',
  Friendly = 'FRIENDLY',
  Professional = 'PROFESSIONAL'
}

export type User = {
  __typename?: 'User';
  auth0sub: Scalars['String']['output'];
  conversations?: Maybe<Array<Maybe<Conversation>>>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  githubAccessToken?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  memory?: Maybe<UserMemory>;
  memoryId?: Maybe<Scalars['String']['output']>;
  messages?: Maybe<Array<Maybe<Message>>>;
  notificationSettings?: Maybe<UserNotificationSettings>;
  preferenceId?: Maybe<Scalars['String']['output']>;
  preferences?: Maybe<UserPreferences>;
  projects?: Maybe<Array<Maybe<Project>>>;
  role?: Maybe<Scalars['String']['output']>;
  tasks?: Maybe<Array<Maybe<Task>>>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};

export type UserIntegration = {
  __typename?: 'UserIntegration';
  apiToken?: Maybe<Scalars['String']['output']>;
  baseUrl?: Maybe<Scalars['String']['output']>;
  enabled?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  type?: Maybe<IntegrationType>;
  userPreferences?: Maybe<UserPreferences>;
  userPreferencesId?: Maybe<Scalars['String']['output']>;
  workspace?: Maybe<Scalars['String']['output']>;
};

export type UserMemory = {
  __typename?: 'UserMemory';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  lastSummary?: Maybe<Scalars['DateTime']['output']>;
  memories?: Maybe<Array<Maybe<Memory>>>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['String']['output']>;
  version?: Maybe<Scalars['Int']['output']>;
};

export type UserNotificationSettings = {
  __typename?: 'UserNotificationSettings';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  inApp?: Maybe<Scalars['Boolean']['output']>;
  sms?: Maybe<Scalars['Boolean']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type UserPreferences = {
  __typename?: 'UserPreferences';
  chatModel?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  integrations?: Maybe<Array<Maybe<UserIntegration>>>;
  preferredLanguage?: Maybe<Scalars['String']['output']>;
  responseStyle?: Maybe<ResponseStyle>;
  timezone?: Maybe<Scalars['String']['output']>;
  tone?: Maybe<Tone>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type UserPreferencesInput = {
  chatModel?: InputMaybe<Scalars['String']['input']>;
  preferredLanguage?: InputMaybe<Scalars['String']['input']>;
  responseStyle?: InputMaybe<ResponseStyle>;
  timezone?: InputMaybe<Scalars['String']['input']>;
  tone?: InputMaybe<Tone>;
};

export type HandleConversationMessageMutationVariables = Exact<{
  message: Scalars['String']['input'];
  projectId?: InputMaybe<Scalars['String']['input']>;
}>;


export type HandleConversationMessageMutation = { __typename?: 'Mutation', handleConversationMessage?: { __typename?: 'ConversationResponse', content?: string | null, role?: string | null, projectId?: string | null } | null };

export type UpdateUserPreferencesMutationVariables = Exact<{
  auth0sub: Scalars['String']['input'];
  preferences: UserPreferencesInput;
}>;


export type UpdateUserPreferencesMutation = { __typename?: 'Mutation', updateUserPreferences?: { __typename?: 'UserPreferences', userId?: string | null, tone?: Tone | null, responseStyle?: ResponseStyle | null, preferredLanguage?: string | null, chatModel?: string | null, timezone?: string | null } | null };

export type CreateProjectMutationVariables = Exact<{
  name: Scalars['String']['input'];
  description: Scalars['String']['input'];
  type: ProjectType;
}>;


export type CreateProjectMutation = { __typename?: 'Mutation', createProject?: { __typename?: 'Project', id: string, name: string } | null };

export type DeleteProjectMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteProjectMutation = { __typename?: 'Mutation', deleteProject?: string | null };

export type UserQueryVariables = Exact<{
  auth0Sub: Scalars['String']['input'];
}>;


export type UserQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, username?: string | null, email?: string | null, projects?: Array<{ __typename?: 'Project', id: string, name: string, conversation?: { __typename?: 'Conversation', id: string, messages?: Array<{ __typename?: 'Message', id: string, content: string, role: string, createdAt: any, name: string } | null> | null } | null } | null> | null, preferences?: { __typename?: 'UserPreferences', chatModel?: string | null, tone?: Tone | null, responseStyle?: ResponseStyle | null, preferredLanguage?: string | null, timezone?: string | null, integrations?: Array<{ __typename?: 'UserIntegration', type?: IntegrationType | null, enabled?: boolean | null, apiToken?: string | null, baseUrl?: string | null, workspace?: string | null } | null> | null } | null } };

export type GetProjectsByUserIdQueryVariables = Exact<{
  auth0Sub: Scalars['String']['input'];
}>;


export type GetProjectsByUserIdQuery = { __typename?: 'Query', getProjectsByUserId: Array<{ __typename?: 'Project', id: string, name: string, description?: string | null, type: string, conversation?: { __typename?: 'Conversation', id: string, messages?: Array<{ __typename?: 'Message', id: string, content: string, createdAt: any, role: string, user?: { __typename?: 'User', id: string, username?: string | null } | null } | null> | null } | null }> };

export type GetProjectQueryVariables = Exact<{
  projectId: Scalars['ID']['input'];
}>;


export type GetProjectQuery = { __typename?: 'Query', project?: { __typename?: 'Project', id: string, name: string, description?: string | null, type: string, conversation?: { __typename?: 'Conversation', id: string, messages?: Array<{ __typename?: 'Message', id: string, content: string, createdAt: any, role: string, user?: { __typename?: 'User', id: string, username?: string | null } | null } | null> | null } | null } | null };

export type GetRepositoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRepositoriesQuery = { __typename?: 'Query', getRepositories?: { __typename?: 'Repositories', repositories?: Array<{ __typename?: 'Repository', id: number, name: string, description: string, url: string, language?: string | null, isPrivate?: boolean | null, forks?: number | null, topics?: Array<string | null> | null, lastPush?: string | null, stars?: number | null, latestActivityDate?: string | null, latestActivityBranch?: string | null, projectId?: string | null } | null> | null } | null };


export const HandleConversationMessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"handleConversationMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"message"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"handleConversationMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"message"},"value":{"kind":"Variable","name":{"kind":"Name","value":"message"}}},{"kind":"Argument","name":{"kind":"Name","value":"projectId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"projectId"}}]}}]}}]} as unknown as DocumentNode<HandleConversationMessageMutation, HandleConversationMessageMutationVariables>;
export const UpdateUserPreferencesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateUserPreferences"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"auth0sub"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"preferences"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserPreferencesInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUserPreferences"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"auth0sub"},"value":{"kind":"Variable","name":{"kind":"Name","value":"auth0sub"}}},{"kind":"Argument","name":{"kind":"Name","value":"preferences"},"value":{"kind":"Variable","name":{"kind":"Name","value":"preferences"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"tone"}},{"kind":"Field","name":{"kind":"Name","value":"responseStyle"}},{"kind":"Field","name":{"kind":"Name","value":"preferredLanguage"}},{"kind":"Field","name":{"kind":"Name","value":"chatModel"}},{"kind":"Field","name":{"kind":"Name","value":"timezone"}}]}}]}}]} as unknown as DocumentNode<UpdateUserPreferencesMutation, UpdateUserPreferencesMutationVariables>;
export const CreateProjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createProject"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ProjectType"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createProject"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}},{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CreateProjectMutation, CreateProjectMutationVariables>;
export const DeleteProjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteProject"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteProject"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteProjectMutation, DeleteProjectMutationVariables>;
export const UserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"user"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"auth0Sub"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"auth0Sub"},"value":{"kind":"Variable","name":{"kind":"Name","value":"auth0Sub"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"projects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"conversation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"messages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"preferences"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chatModel"}},{"kind":"Field","name":{"kind":"Name","value":"tone"}},{"kind":"Field","name":{"kind":"Name","value":"responseStyle"}},{"kind":"Field","name":{"kind":"Name","value":"preferredLanguage"}},{"kind":"Field","name":{"kind":"Name","value":"timezone"}},{"kind":"Field","name":{"kind":"Name","value":"integrations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"enabled"}},{"kind":"Field","name":{"kind":"Name","value":"apiToken"}},{"kind":"Field","name":{"kind":"Name","value":"baseUrl"}},{"kind":"Field","name":{"kind":"Name","value":"workspace"}}]}}]}}]}}]}}]} as unknown as DocumentNode<UserQuery, UserQueryVariables>;
export const GetProjectsByUserIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProjectsByUserId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"auth0Sub"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getProjectsByUserId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"auth0Sub"},"value":{"kind":"Variable","name":{"kind":"Name","value":"auth0Sub"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"conversation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"messages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetProjectsByUserIdQuery, GetProjectsByUserIdQueryVariables>;
export const GetProjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getProject"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"project"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"conversation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"messages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetProjectQuery, GetProjectQueryVariables>;
export const GetRepositoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getRepositories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getRepositories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"repositories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"isPrivate"}},{"kind":"Field","name":{"kind":"Name","value":"forks"}},{"kind":"Field","name":{"kind":"Name","value":"topics"}},{"kind":"Field","name":{"kind":"Name","value":"lastPush"}},{"kind":"Field","name":{"kind":"Name","value":"stars"}},{"kind":"Field","name":{"kind":"Name","value":"latestActivityDate"}},{"kind":"Field","name":{"kind":"Name","value":"latestActivityBranch"}},{"kind":"Field","name":{"kind":"Name","value":"projectId"}}]}}]}}]}}]} as unknown as DocumentNode<GetRepositoriesQuery, GetRepositoriesQueryVariables>;