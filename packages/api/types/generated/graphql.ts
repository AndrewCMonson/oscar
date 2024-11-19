import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { User as UserModel, Chat as ChatModel, Project as ProjectModel, Task as TaskModel, Message as MessageModel } from '@prisma/client/index.d';
import { MiddlewareContext } from '@api/types/index';
import gql from 'graphql-tag';
export type Maybe<T> = T | undefined;
export type InputMaybe<T> = T | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
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
  context?: Maybe<Array<Maybe<Message>>>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
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
  contextData?: Maybe<AssistantResponseContextData>;
  contextDataId?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  role?: Maybe<ChatGptRole>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type AssistantResponseContextData = {
  __typename?: 'AssistantResponseContextData';
  action?: Maybe<AssistantAction>;
  assistantResponse?: Maybe<AssistantResponse>;
  assistantResponseId?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  metadata?: Maybe<Scalars['JSON']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type Chat = {
  __typename?: 'Chat';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  messages?: Maybe<Array<Maybe<Message>>>;
  project?: Maybe<Project>;
  projectId?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  user?: Maybe<User>;
  userId?: Maybe<Scalars['String']['output']>;
};

export enum ChatGptRole {
  Assistant = 'ASSISTANT',
  Function = 'FUNCTION',
  System = 'SYSTEM',
  User = 'USER'
}

export type FormattedMessage = {
  __typename?: 'FormattedMessage';
  content: Scalars['String']['output'];
  data?: Maybe<MessageSubData>;
  name: Scalars['String']['output'];
  role: Scalars['String']['output'];
};

export enum IntegrationType {
  Jira = 'JIRA',
  Motion = 'MOTION',
  Notion = 'NOTION'
}

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
  chat?: Maybe<Chat>;
  chatId: Scalars['ID']['output'];
  content: Scalars['String']['output'];
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
  createChat?: Maybe<Chat>;
  createMessage?: Maybe<Message>;
  createProject?: Maybe<Project>;
  createTask?: Maybe<Task>;
  createUser?: Maybe<User>;
  deleteChat?: Maybe<Chat>;
  deleteMessage?: Maybe<Message>;
  deleteProject?: Maybe<Project>;
  deleteTask?: Maybe<Task>;
  deleteUser?: Maybe<User>;
  handleChatMessage?: Maybe<AssistantResponse>;
  updateAssistant: Assistant;
  updateChat?: Maybe<Chat>;
  updateMessage?: Maybe<Message>;
  updateProject?: Maybe<Project>;
  updateTask?: Maybe<Task>;
  updateUser?: Maybe<User>;
};


export type MutationCreateChatArgs = {
  projectId: Scalars['String']['input'];
};


export type MutationCreateMessageArgs = {
  chatId: Scalars['ID']['input'];
  content: Scalars['String']['input'];
};


export type MutationCreateProjectArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  type: ProjectType;
};


export type MutationCreateTaskArgs = {
  description: Scalars['String']['input'];
  dueDate?: InputMaybe<Scalars['DateTime']['input']>;
  priority: Scalars['String']['input'];
  projectId: Scalars['String']['input'];
  status: Scalars['String']['input'];
  title: Scalars['String']['input'];
};


export type MutationCreateUserArgs = {
  email: Scalars['String']['input'];
  role: ChatGptRole;
  username: Scalars['String']['input'];
};


export type MutationDeleteChatArgs = {
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


export type MutationHandleChatMessageArgs = {
  message: Scalars['String']['input'];
  projectId: Scalars['String']['input'];
};


export type MutationUpdateAssistantArgs = {
  context?: InputMaybe<MessageInput>;
  id: Scalars['ID']['input'];
  model?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateChatArgs = {
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
  priority?: InputMaybe<Scalars['String']['input']>;
  projectId?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateUserArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  lastName?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<ChatGptRole>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type Project = {
  __typename?: 'Project';
  chats?: Maybe<Array<Maybe<Chat>>>;
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
  chat?: Maybe<Chat>;
  chats?: Maybe<Array<Maybe<Chat>>>;
  getAssistant?: Maybe<Assistant>;
  message?: Maybe<Message>;
  messages?: Maybe<Array<Maybe<Message>>>;
  project?: Maybe<Project>;
  projects?: Maybe<Array<Maybe<Project>>>;
  task?: Maybe<Task>;
  tasks?: Maybe<Array<Maybe<Task>>>;
  user?: Maybe<User>;
  users?: Maybe<Array<Maybe<User>>>;
};


export type QueryChatArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetAssistantArgs = {
  role?: InputMaybe<ChatGptRole>;
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
  id: Scalars['ID']['input'];
};

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

export type User = {
  __typename?: 'User';
  chats?: Maybe<Array<Maybe<Chat>>>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
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
  username: Scalars['String']['output'];
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
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  integrations?: Maybe<Array<Maybe<UserIntegration>>>;
  preferredLanguage?: Maybe<Scalars['String']['output']>;
  responseStyle?: Maybe<Scalars['String']['output']>;
  timezone?: Maybe<Scalars['String']['output']>;
  tone?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  AccountNumber: ResolverTypeWrapper<Scalars['AccountNumber']['output']>;
  Assistant: ResolverTypeWrapper<Omit<Assistant, 'context'> & { context?: Maybe<Array<Maybe<ResolversTypes['Message']>>> }>;
  AssistantAction: AssistantAction;
  AssistantResponse: ResolverTypeWrapper<AssistantResponse>;
  AssistantResponseContextData: ResolverTypeWrapper<AssistantResponseContextData>;
  BigInt: ResolverTypeWrapper<Scalars['BigInt']['output']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Byte: ResolverTypeWrapper<Scalars['Byte']['output']>;
  Chat: ResolverTypeWrapper<ChatModel>;
  ChatGPTRole: ChatGptRole;
  CountryCode: ResolverTypeWrapper<Scalars['CountryCode']['output']>;
  Cuid: ResolverTypeWrapper<Scalars['Cuid']['output']>;
  Currency: ResolverTypeWrapper<Scalars['Currency']['output']>;
  DID: ResolverTypeWrapper<Scalars['DID']['output']>;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  DateTimeISO: ResolverTypeWrapper<Scalars['DateTimeISO']['output']>;
  DeweyDecimal: ResolverTypeWrapper<Scalars['DeweyDecimal']['output']>;
  Duration: ResolverTypeWrapper<Scalars['Duration']['output']>;
  EmailAddress: ResolverTypeWrapper<Scalars['EmailAddress']['output']>;
  FormattedMessage: ResolverTypeWrapper<FormattedMessage>;
  GUID: ResolverTypeWrapper<Scalars['GUID']['output']>;
  HSL: ResolverTypeWrapper<Scalars['HSL']['output']>;
  HSLA: ResolverTypeWrapper<Scalars['HSLA']['output']>;
  HexColorCode: ResolverTypeWrapper<Scalars['HexColorCode']['output']>;
  Hexadecimal: ResolverTypeWrapper<Scalars['Hexadecimal']['output']>;
  IBAN: ResolverTypeWrapper<Scalars['IBAN']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  IP: ResolverTypeWrapper<Scalars['IP']['output']>;
  IPCPatent: ResolverTypeWrapper<Scalars['IPCPatent']['output']>;
  IPv4: ResolverTypeWrapper<Scalars['IPv4']['output']>;
  IPv6: ResolverTypeWrapper<Scalars['IPv6']['output']>;
  ISBN: ResolverTypeWrapper<Scalars['ISBN']['output']>;
  ISO8601Duration: ResolverTypeWrapper<Scalars['ISO8601Duration']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  IntegrationType: IntegrationType;
  JSON: ResolverTypeWrapper<Scalars['JSON']['output']>;
  JSONObject: ResolverTypeWrapper<Scalars['JSONObject']['output']>;
  JWT: ResolverTypeWrapper<Scalars['JWT']['output']>;
  LCCSubclass: ResolverTypeWrapper<Scalars['LCCSubclass']['output']>;
  Latitude: ResolverTypeWrapper<Scalars['Latitude']['output']>;
  LocalDate: ResolverTypeWrapper<Scalars['LocalDate']['output']>;
  LocalDateTime: ResolverTypeWrapper<Scalars['LocalDateTime']['output']>;
  LocalEndTime: ResolverTypeWrapper<Scalars['LocalEndTime']['output']>;
  LocalTime: ResolverTypeWrapper<Scalars['LocalTime']['output']>;
  Locale: ResolverTypeWrapper<Scalars['Locale']['output']>;
  Long: ResolverTypeWrapper<Scalars['Long']['output']>;
  Longitude: ResolverTypeWrapper<Scalars['Longitude']['output']>;
  MAC: ResolverTypeWrapper<Scalars['MAC']['output']>;
  Memory: ResolverTypeWrapper<Omit<Memory, 'userMemory'> & { userMemory?: Maybe<ResolversTypes['UserMemory']> }>;
  Message: ResolverTypeWrapper<MessageModel>;
  MessageInput: MessageInput;
  MessageSubData: ResolverTypeWrapper<MessageSubData>;
  Mutation: ResolverTypeWrapper<{}>;
  NegativeFloat: ResolverTypeWrapper<Scalars['NegativeFloat']['output']>;
  NegativeInt: ResolverTypeWrapper<Scalars['NegativeInt']['output']>;
  NonEmptyString: ResolverTypeWrapper<Scalars['NonEmptyString']['output']>;
  NonNegativeFloat: ResolverTypeWrapper<Scalars['NonNegativeFloat']['output']>;
  NonNegativeInt: ResolverTypeWrapper<Scalars['NonNegativeInt']['output']>;
  NonPositiveFloat: ResolverTypeWrapper<Scalars['NonPositiveFloat']['output']>;
  NonPositiveInt: ResolverTypeWrapper<Scalars['NonPositiveInt']['output']>;
  ObjectID: ResolverTypeWrapper<Scalars['ObjectID']['output']>;
  PhoneNumber: ResolverTypeWrapper<Scalars['PhoneNumber']['output']>;
  Port: ResolverTypeWrapper<Scalars['Port']['output']>;
  PositiveFloat: ResolverTypeWrapper<Scalars['PositiveFloat']['output']>;
  PositiveInt: ResolverTypeWrapper<Scalars['PositiveInt']['output']>;
  PostalCode: ResolverTypeWrapper<Scalars['PostalCode']['output']>;
  Project: ResolverTypeWrapper<ProjectModel>;
  ProjectType: ProjectType;
  Query: ResolverTypeWrapper<{}>;
  RGB: ResolverTypeWrapper<Scalars['RGB']['output']>;
  RGBA: ResolverTypeWrapper<Scalars['RGBA']['output']>;
  RoutingNumber: ResolverTypeWrapper<Scalars['RoutingNumber']['output']>;
  SESSN: ResolverTypeWrapper<Scalars['SESSN']['output']>;
  SafeInt: ResolverTypeWrapper<Scalars['SafeInt']['output']>;
  SemVer: ResolverTypeWrapper<Scalars['SemVer']['output']>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Task: ResolverTypeWrapper<TaskModel>;
  TaskPriority: TaskPriority;
  TaskStatus: TaskStatus;
  Time: ResolverTypeWrapper<Scalars['Time']['output']>;
  TimeZone: ResolverTypeWrapper<Scalars['TimeZone']['output']>;
  Timestamp: ResolverTypeWrapper<Scalars['Timestamp']['output']>;
  URL: ResolverTypeWrapper<Scalars['URL']['output']>;
  USCurrency: ResolverTypeWrapper<Scalars['USCurrency']['output']>;
  UUID: ResolverTypeWrapper<Scalars['UUID']['output']>;
  UnsignedFloat: ResolverTypeWrapper<Scalars['UnsignedFloat']['output']>;
  UnsignedInt: ResolverTypeWrapper<Scalars['UnsignedInt']['output']>;
  User: ResolverTypeWrapper<UserModel>;
  UserIntegration: ResolverTypeWrapper<Omit<UserIntegration, 'userPreferences'> & { userPreferences?: Maybe<ResolversTypes['UserPreferences']> }>;
  UserMemory: ResolverTypeWrapper<Omit<UserMemory, 'memories' | 'user'> & { memories?: Maybe<Array<Maybe<ResolversTypes['Memory']>>>, user?: Maybe<ResolversTypes['User']> }>;
  UserNotificationSettings: ResolverTypeWrapper<Omit<UserNotificationSettings, 'user'> & { user?: Maybe<ResolversTypes['User']> }>;
  UserPreferences: ResolverTypeWrapper<Omit<UserPreferences, 'integrations' | 'user'> & { integrations?: Maybe<Array<Maybe<ResolversTypes['UserIntegration']>>>, user?: Maybe<ResolversTypes['User']> }>;
  UtcOffset: ResolverTypeWrapper<Scalars['UtcOffset']['output']>;
  Void: ResolverTypeWrapper<Scalars['Void']['output']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  AccountNumber: Scalars['AccountNumber']['output'];
  Assistant: Omit<Assistant, 'context'> & { context?: Maybe<Array<Maybe<ResolversParentTypes['Message']>>> };
  AssistantResponse: AssistantResponse;
  AssistantResponseContextData: AssistantResponseContextData;
  BigInt: Scalars['BigInt']['output'];
  Boolean: Scalars['Boolean']['output'];
  Byte: Scalars['Byte']['output'];
  Chat: ChatModel;
  CountryCode: Scalars['CountryCode']['output'];
  Cuid: Scalars['Cuid']['output'];
  Currency: Scalars['Currency']['output'];
  DID: Scalars['DID']['output'];
  Date: Scalars['Date']['output'];
  DateTime: Scalars['DateTime']['output'];
  DateTimeISO: Scalars['DateTimeISO']['output'];
  DeweyDecimal: Scalars['DeweyDecimal']['output'];
  Duration: Scalars['Duration']['output'];
  EmailAddress: Scalars['EmailAddress']['output'];
  FormattedMessage: FormattedMessage;
  GUID: Scalars['GUID']['output'];
  HSL: Scalars['HSL']['output'];
  HSLA: Scalars['HSLA']['output'];
  HexColorCode: Scalars['HexColorCode']['output'];
  Hexadecimal: Scalars['Hexadecimal']['output'];
  IBAN: Scalars['IBAN']['output'];
  ID: Scalars['ID']['output'];
  IP: Scalars['IP']['output'];
  IPCPatent: Scalars['IPCPatent']['output'];
  IPv4: Scalars['IPv4']['output'];
  IPv6: Scalars['IPv6']['output'];
  ISBN: Scalars['ISBN']['output'];
  ISO8601Duration: Scalars['ISO8601Duration']['output'];
  Int: Scalars['Int']['output'];
  JSON: Scalars['JSON']['output'];
  JSONObject: Scalars['JSONObject']['output'];
  JWT: Scalars['JWT']['output'];
  LCCSubclass: Scalars['LCCSubclass']['output'];
  Latitude: Scalars['Latitude']['output'];
  LocalDate: Scalars['LocalDate']['output'];
  LocalDateTime: Scalars['LocalDateTime']['output'];
  LocalEndTime: Scalars['LocalEndTime']['output'];
  LocalTime: Scalars['LocalTime']['output'];
  Locale: Scalars['Locale']['output'];
  Long: Scalars['Long']['output'];
  Longitude: Scalars['Longitude']['output'];
  MAC: Scalars['MAC']['output'];
  Memory: Omit<Memory, 'userMemory'> & { userMemory?: Maybe<ResolversParentTypes['UserMemory']> };
  Message: MessageModel;
  MessageInput: MessageInput;
  MessageSubData: MessageSubData;
  Mutation: {};
  NegativeFloat: Scalars['NegativeFloat']['output'];
  NegativeInt: Scalars['NegativeInt']['output'];
  NonEmptyString: Scalars['NonEmptyString']['output'];
  NonNegativeFloat: Scalars['NonNegativeFloat']['output'];
  NonNegativeInt: Scalars['NonNegativeInt']['output'];
  NonPositiveFloat: Scalars['NonPositiveFloat']['output'];
  NonPositiveInt: Scalars['NonPositiveInt']['output'];
  ObjectID: Scalars['ObjectID']['output'];
  PhoneNumber: Scalars['PhoneNumber']['output'];
  Port: Scalars['Port']['output'];
  PositiveFloat: Scalars['PositiveFloat']['output'];
  PositiveInt: Scalars['PositiveInt']['output'];
  PostalCode: Scalars['PostalCode']['output'];
  Project: ProjectModel;
  Query: {};
  RGB: Scalars['RGB']['output'];
  RGBA: Scalars['RGBA']['output'];
  RoutingNumber: Scalars['RoutingNumber']['output'];
  SESSN: Scalars['SESSN']['output'];
  SafeInt: Scalars['SafeInt']['output'];
  SemVer: Scalars['SemVer']['output'];
  String: Scalars['String']['output'];
  Task: TaskModel;
  Time: Scalars['Time']['output'];
  TimeZone: Scalars['TimeZone']['output'];
  Timestamp: Scalars['Timestamp']['output'];
  URL: Scalars['URL']['output'];
  USCurrency: Scalars['USCurrency']['output'];
  UUID: Scalars['UUID']['output'];
  UnsignedFloat: Scalars['UnsignedFloat']['output'];
  UnsignedInt: Scalars['UnsignedInt']['output'];
  User: UserModel;
  UserIntegration: Omit<UserIntegration, 'userPreferences'> & { userPreferences?: Maybe<ResolversParentTypes['UserPreferences']> };
  UserMemory: Omit<UserMemory, 'memories' | 'user'> & { memories?: Maybe<Array<Maybe<ResolversParentTypes['Memory']>>>, user?: Maybe<ResolversParentTypes['User']> };
  UserNotificationSettings: Omit<UserNotificationSettings, 'user'> & { user?: Maybe<ResolversParentTypes['User']> };
  UserPreferences: Omit<UserPreferences, 'integrations' | 'user'> & { integrations?: Maybe<Array<Maybe<ResolversParentTypes['UserIntegration']>>>, user?: Maybe<ResolversParentTypes['User']> };
  UtcOffset: Scalars['UtcOffset']['output'];
  Void: Scalars['Void']['output'];
}>;

export interface AccountNumberScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['AccountNumber'], any> {
  name: 'AccountNumber';
}

export type AssistantResolvers<ContextType = MiddlewareContext, ParentType extends ResolversParentTypes['Assistant'] = ResolversParentTypes['Assistant']> = ResolversObject<{
  context?: Resolver<Maybe<Array<Maybe<ResolversTypes['Message']>>>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  role?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AssistantResponseResolvers<ContextType = MiddlewareContext, ParentType extends ResolversParentTypes['AssistantResponse'] = ResolversParentTypes['AssistantResponse']> = ResolversObject<{
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  contextData?: Resolver<Maybe<ResolversTypes['AssistantResponseContextData']>, ParentType, ContextType>;
  contextDataId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  role?: Resolver<Maybe<ResolversTypes['ChatGPTRole']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AssistantResponseContextDataResolvers<ContextType = MiddlewareContext, ParentType extends ResolversParentTypes['AssistantResponseContextData'] = ResolversParentTypes['AssistantResponseContextData']> = ResolversObject<{
  action?: Resolver<Maybe<ResolversTypes['AssistantAction']>, ParentType, ContextType>;
  assistantResponse?: Resolver<Maybe<ResolversTypes['AssistantResponse']>, ParentType, ContextType>;
  assistantResponseId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  metadata?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface BigIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export interface ByteScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Byte'], any> {
  name: 'Byte';
}

export type ChatResolvers<ContextType = MiddlewareContext, ParentType extends ResolversParentTypes['Chat'] = ResolversParentTypes['Chat']> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  messages?: Resolver<Maybe<Array<Maybe<ResolversTypes['Message']>>>, ParentType, ContextType>;
  project?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType>;
  projectId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface CountryCodeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['CountryCode'], any> {
  name: 'CountryCode';
}

export interface CuidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Cuid'], any> {
  name: 'Cuid';
}

export interface CurrencyScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Currency'], any> {
  name: 'Currency';
}

export interface DidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DID'], any> {
  name: 'DID';
}

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export interface DateTimeIsoScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTimeISO'], any> {
  name: 'DateTimeISO';
}

export interface DeweyDecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DeweyDecimal'], any> {
  name: 'DeweyDecimal';
}

export interface DurationScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Duration'], any> {
  name: 'Duration';
}

export interface EmailAddressScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['EmailAddress'], any> {
  name: 'EmailAddress';
}

export type FormattedMessageResolvers<ContextType = MiddlewareContext, ParentType extends ResolversParentTypes['FormattedMessage'] = ResolversParentTypes['FormattedMessage']> = ResolversObject<{
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  data?: Resolver<Maybe<ResolversTypes['MessageSubData']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface GuidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['GUID'], any> {
  name: 'GUID';
}

export interface HslScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['HSL'], any> {
  name: 'HSL';
}

export interface HslaScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['HSLA'], any> {
  name: 'HSLA';
}

export interface HexColorCodeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['HexColorCode'], any> {
  name: 'HexColorCode';
}

export interface HexadecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Hexadecimal'], any> {
  name: 'Hexadecimal';
}

export interface IbanScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['IBAN'], any> {
  name: 'IBAN';
}

export interface IpScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['IP'], any> {
  name: 'IP';
}

export interface IpcPatentScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['IPCPatent'], any> {
  name: 'IPCPatent';
}

export interface IPv4ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['IPv4'], any> {
  name: 'IPv4';
}

export interface IPv6ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['IPv6'], any> {
  name: 'IPv6';
}

export interface IsbnScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['ISBN'], any> {
  name: 'ISBN';
}

export interface Iso8601DurationScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['ISO8601Duration'], any> {
  name: 'ISO8601Duration';
}

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export interface JsonObjectScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSONObject'], any> {
  name: 'JSONObject';
}

export interface JwtScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JWT'], any> {
  name: 'JWT';
}

export interface LccSubclassScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['LCCSubclass'], any> {
  name: 'LCCSubclass';
}

export interface LatitudeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Latitude'], any> {
  name: 'Latitude';
}

export interface LocalDateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['LocalDate'], any> {
  name: 'LocalDate';
}

export interface LocalDateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['LocalDateTime'], any> {
  name: 'LocalDateTime';
}

export interface LocalEndTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['LocalEndTime'], any> {
  name: 'LocalEndTime';
}

export interface LocalTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['LocalTime'], any> {
  name: 'LocalTime';
}

export interface LocaleScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Locale'], any> {
  name: 'Locale';
}

export interface LongScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Long'], any> {
  name: 'Long';
}

export interface LongitudeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Longitude'], any> {
  name: 'Longitude';
}

export interface MacScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['MAC'], any> {
  name: 'MAC';
}

export type MemoryResolvers<ContextType = MiddlewareContext, ParentType extends ResolversParentTypes['Memory'] = ResolversParentTypes['Memory']> = ResolversObject<{
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  note?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  userMemory?: Resolver<Maybe<ResolversTypes['UserMemory']>, ParentType, ContextType>;
  userMemoryId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MessageResolvers<ContextType = MiddlewareContext, ParentType extends ResolversParentTypes['Message'] = ResolversParentTypes['Message']> = ResolversObject<{
  chat?: Resolver<Maybe<ResolversTypes['Chat']>, ParentType, ContextType>;
  chatId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  task?: Resolver<Maybe<ResolversTypes['Task']>, ParentType, ContextType>;
  taskId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MessageSubDataResolvers<ContextType = MiddlewareContext, ParentType extends ResolversParentTypes['MessageSubData'] = ResolversParentTypes['MessageSubData']> = ResolversObject<{
  action?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  data?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = MiddlewareContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createChat?: Resolver<Maybe<ResolversTypes['Chat']>, ParentType, ContextType, RequireFields<MutationCreateChatArgs, 'projectId'>>;
  createMessage?: Resolver<Maybe<ResolversTypes['Message']>, ParentType, ContextType, RequireFields<MutationCreateMessageArgs, 'chatId' | 'content'>>;
  createProject?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType, RequireFields<MutationCreateProjectArgs, 'name' | 'type'>>;
  createTask?: Resolver<Maybe<ResolversTypes['Task']>, ParentType, ContextType, RequireFields<MutationCreateTaskArgs, 'description' | 'priority' | 'projectId' | 'status' | 'title'>>;
  createUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'email' | 'role' | 'username'>>;
  deleteChat?: Resolver<Maybe<ResolversTypes['Chat']>, ParentType, ContextType, RequireFields<MutationDeleteChatArgs, 'id'>>;
  deleteMessage?: Resolver<Maybe<ResolversTypes['Message']>, ParentType, ContextType, RequireFields<MutationDeleteMessageArgs, 'id'>>;
  deleteProject?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType, RequireFields<MutationDeleteProjectArgs, 'id'>>;
  deleteTask?: Resolver<Maybe<ResolversTypes['Task']>, ParentType, ContextType, RequireFields<MutationDeleteTaskArgs, 'id'>>;
  deleteUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationDeleteUserArgs, 'id'>>;
  handleChatMessage?: Resolver<Maybe<ResolversTypes['AssistantResponse']>, ParentType, ContextType, RequireFields<MutationHandleChatMessageArgs, 'message' | 'projectId'>>;
  updateAssistant?: Resolver<ResolversTypes['Assistant'], ParentType, ContextType, RequireFields<MutationUpdateAssistantArgs, 'id'>>;
  updateChat?: Resolver<Maybe<ResolversTypes['Chat']>, ParentType, ContextType, RequireFields<MutationUpdateChatArgs, 'id' | 'projectId'>>;
  updateMessage?: Resolver<Maybe<ResolversTypes['Message']>, ParentType, ContextType, RequireFields<MutationUpdateMessageArgs, 'content' | 'id'>>;
  updateProject?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType, RequireFields<MutationUpdateProjectArgs, 'id'>>;
  updateTask?: Resolver<Maybe<ResolversTypes['Task']>, ParentType, ContextType, RequireFields<MutationUpdateTaskArgs, 'id'>>;
  updateUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'id'>>;
}>;

export interface NegativeFloatScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['NegativeFloat'], any> {
  name: 'NegativeFloat';
}

export interface NegativeIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['NegativeInt'], any> {
  name: 'NegativeInt';
}

export interface NonEmptyStringScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['NonEmptyString'], any> {
  name: 'NonEmptyString';
}

export interface NonNegativeFloatScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['NonNegativeFloat'], any> {
  name: 'NonNegativeFloat';
}

export interface NonNegativeIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['NonNegativeInt'], any> {
  name: 'NonNegativeInt';
}

export interface NonPositiveFloatScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['NonPositiveFloat'], any> {
  name: 'NonPositiveFloat';
}

export interface NonPositiveIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['NonPositiveInt'], any> {
  name: 'NonPositiveInt';
}

export interface ObjectIdScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['ObjectID'], any> {
  name: 'ObjectID';
}

export interface PhoneNumberScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['PhoneNumber'], any> {
  name: 'PhoneNumber';
}

export interface PortScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Port'], any> {
  name: 'Port';
}

export interface PositiveFloatScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['PositiveFloat'], any> {
  name: 'PositiveFloat';
}

export interface PositiveIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['PositiveInt'], any> {
  name: 'PositiveInt';
}

export interface PostalCodeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['PostalCode'], any> {
  name: 'PostalCode';
}

export type ProjectResolvers<ContextType = MiddlewareContext, ParentType extends ResolversParentTypes['Project'] = ResolversParentTypes['Project']> = ResolversObject<{
  chats?: Resolver<Maybe<Array<Maybe<ResolversTypes['Chat']>>>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tasks?: Resolver<Maybe<Array<Maybe<ResolversTypes['Task']>>>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = MiddlewareContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  chat?: Resolver<Maybe<ResolversTypes['Chat']>, ParentType, ContextType, RequireFields<QueryChatArgs, 'id'>>;
  chats?: Resolver<Maybe<Array<Maybe<ResolversTypes['Chat']>>>, ParentType, ContextType>;
  getAssistant?: Resolver<Maybe<ResolversTypes['Assistant']>, ParentType, ContextType, Partial<QueryGetAssistantArgs>>;
  message?: Resolver<Maybe<ResolversTypes['Message']>, ParentType, ContextType, RequireFields<QueryMessageArgs, 'id'>>;
  messages?: Resolver<Maybe<Array<Maybe<ResolversTypes['Message']>>>, ParentType, ContextType>;
  project?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType, RequireFields<QueryProjectArgs, 'id'>>;
  projects?: Resolver<Maybe<Array<Maybe<ResolversTypes['Project']>>>, ParentType, ContextType>;
  task?: Resolver<Maybe<ResolversTypes['Task']>, ParentType, ContextType, RequireFields<QueryTaskArgs, 'id'>>;
  tasks?: Resolver<Maybe<Array<Maybe<ResolversTypes['Task']>>>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
  users?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
}>;

export interface RgbScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['RGB'], any> {
  name: 'RGB';
}

export interface RgbaScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['RGBA'], any> {
  name: 'RGBA';
}

export interface RoutingNumberScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['RoutingNumber'], any> {
  name: 'RoutingNumber';
}

export interface SessnScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['SESSN'], any> {
  name: 'SESSN';
}

export interface SafeIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['SafeInt'], any> {
  name: 'SafeInt';
}

export interface SemVerScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['SemVer'], any> {
  name: 'SemVer';
}

export type TaskResolvers<ContextType = MiddlewareContext, ParentType extends ResolversParentTypes['Task'] = ResolversParentTypes['Task']> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  dueDate?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  jiraTaskId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  messages?: Resolver<Maybe<Array<Maybe<ResolversTypes['Message']>>>, ParentType, ContextType>;
  motionEventId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  priority?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  project?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType>;
  projectId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface TimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Time'], any> {
  name: 'Time';
}

export interface TimeZoneScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['TimeZone'], any> {
  name: 'TimeZone';
}

export interface TimestampScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Timestamp'], any> {
  name: 'Timestamp';
}

export interface UrlScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['URL'], any> {
  name: 'URL';
}

export interface UsCurrencyScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['USCurrency'], any> {
  name: 'USCurrency';
}

export interface UuidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['UUID'], any> {
  name: 'UUID';
}

export interface UnsignedFloatScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['UnsignedFloat'], any> {
  name: 'UnsignedFloat';
}

export interface UnsignedIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['UnsignedInt'], any> {
  name: 'UnsignedInt';
}

export type UserResolvers<ContextType = MiddlewareContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  chats?: Resolver<Maybe<Array<Maybe<ResolversTypes['Chat']>>>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  memory?: Resolver<Maybe<ResolversTypes['UserMemory']>, ParentType, ContextType>;
  memoryId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  messages?: Resolver<Maybe<Array<Maybe<ResolversTypes['Message']>>>, ParentType, ContextType>;
  notificationSettings?: Resolver<Maybe<ResolversTypes['UserNotificationSettings']>, ParentType, ContextType>;
  preferenceId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  preferences?: Resolver<Maybe<ResolversTypes['UserPreferences']>, ParentType, ContextType>;
  projects?: Resolver<Maybe<Array<Maybe<ResolversTypes['Project']>>>, ParentType, ContextType>;
  role?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tasks?: Resolver<Maybe<Array<Maybe<ResolversTypes['Task']>>>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserIntegrationResolvers<ContextType = MiddlewareContext, ParentType extends ResolversParentTypes['UserIntegration'] = ResolversParentTypes['UserIntegration']> = ResolversObject<{
  apiToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  baseUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  enabled?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['IntegrationType']>, ParentType, ContextType>;
  userPreferences?: Resolver<Maybe<ResolversTypes['UserPreferences']>, ParentType, ContextType>;
  userPreferencesId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  workspace?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserMemoryResolvers<ContextType = MiddlewareContext, ParentType extends ResolversParentTypes['UserMemory'] = ResolversParentTypes['UserMemory']> = ResolversObject<{
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lastSummary?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  memories?: Resolver<Maybe<Array<Maybe<ResolversTypes['Memory']>>>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  version?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserNotificationSettingsResolvers<ContextType = MiddlewareContext, ParentType extends ResolversParentTypes['UserNotificationSettings'] = ResolversParentTypes['UserNotificationSettings']> = ResolversObject<{
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  inApp?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  sms?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserPreferencesResolvers<ContextType = MiddlewareContext, ParentType extends ResolversParentTypes['UserPreferences'] = ResolversParentTypes['UserPreferences']> = ResolversObject<{
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  integrations?: Resolver<Maybe<Array<Maybe<ResolversTypes['UserIntegration']>>>, ParentType, ContextType>;
  preferredLanguage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  responseStyle?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  timezone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface UtcOffsetScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['UtcOffset'], any> {
  name: 'UtcOffset';
}

export interface VoidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Void'], any> {
  name: 'Void';
}

export type Resolvers<ContextType = MiddlewareContext> = ResolversObject<{
  AccountNumber?: GraphQLScalarType;
  Assistant?: AssistantResolvers<ContextType>;
  AssistantResponse?: AssistantResponseResolvers<ContextType>;
  AssistantResponseContextData?: AssistantResponseContextDataResolvers<ContextType>;
  BigInt?: GraphQLScalarType;
  Byte?: GraphQLScalarType;
  Chat?: ChatResolvers<ContextType>;
  CountryCode?: GraphQLScalarType;
  Cuid?: GraphQLScalarType;
  Currency?: GraphQLScalarType;
  DID?: GraphQLScalarType;
  Date?: GraphQLScalarType;
  DateTime?: GraphQLScalarType;
  DateTimeISO?: GraphQLScalarType;
  DeweyDecimal?: GraphQLScalarType;
  Duration?: GraphQLScalarType;
  EmailAddress?: GraphQLScalarType;
  FormattedMessage?: FormattedMessageResolvers<ContextType>;
  GUID?: GraphQLScalarType;
  HSL?: GraphQLScalarType;
  HSLA?: GraphQLScalarType;
  HexColorCode?: GraphQLScalarType;
  Hexadecimal?: GraphQLScalarType;
  IBAN?: GraphQLScalarType;
  IP?: GraphQLScalarType;
  IPCPatent?: GraphQLScalarType;
  IPv4?: GraphQLScalarType;
  IPv6?: GraphQLScalarType;
  ISBN?: GraphQLScalarType;
  ISO8601Duration?: GraphQLScalarType;
  JSON?: GraphQLScalarType;
  JSONObject?: GraphQLScalarType;
  JWT?: GraphQLScalarType;
  LCCSubclass?: GraphQLScalarType;
  Latitude?: GraphQLScalarType;
  LocalDate?: GraphQLScalarType;
  LocalDateTime?: GraphQLScalarType;
  LocalEndTime?: GraphQLScalarType;
  LocalTime?: GraphQLScalarType;
  Locale?: GraphQLScalarType;
  Long?: GraphQLScalarType;
  Longitude?: GraphQLScalarType;
  MAC?: GraphQLScalarType;
  Memory?: MemoryResolvers<ContextType>;
  Message?: MessageResolvers<ContextType>;
  MessageSubData?: MessageSubDataResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  NegativeFloat?: GraphQLScalarType;
  NegativeInt?: GraphQLScalarType;
  NonEmptyString?: GraphQLScalarType;
  NonNegativeFloat?: GraphQLScalarType;
  NonNegativeInt?: GraphQLScalarType;
  NonPositiveFloat?: GraphQLScalarType;
  NonPositiveInt?: GraphQLScalarType;
  ObjectID?: GraphQLScalarType;
  PhoneNumber?: GraphQLScalarType;
  Port?: GraphQLScalarType;
  PositiveFloat?: GraphQLScalarType;
  PositiveInt?: GraphQLScalarType;
  PostalCode?: GraphQLScalarType;
  Project?: ProjectResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  RGB?: GraphQLScalarType;
  RGBA?: GraphQLScalarType;
  RoutingNumber?: GraphQLScalarType;
  SESSN?: GraphQLScalarType;
  SafeInt?: GraphQLScalarType;
  SemVer?: GraphQLScalarType;
  Task?: TaskResolvers<ContextType>;
  Time?: GraphQLScalarType;
  TimeZone?: GraphQLScalarType;
  Timestamp?: GraphQLScalarType;
  URL?: GraphQLScalarType;
  USCurrency?: GraphQLScalarType;
  UUID?: GraphQLScalarType;
  UnsignedFloat?: GraphQLScalarType;
  UnsignedInt?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
  UserIntegration?: UserIntegrationResolvers<ContextType>;
  UserMemory?: UserMemoryResolvers<ContextType>;
  UserNotificationSettings?: UserNotificationSettingsResolvers<ContextType>;
  UserPreferences?: UserPreferencesResolvers<ContextType>;
  UtcOffset?: GraphQLScalarType;
  Void?: GraphQLScalarType;
}>;

