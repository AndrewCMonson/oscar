import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from "graphql";
import {
  User as UserModel,
  Chat as ChatModel,
  Project as ProjectModel,
  Task as TaskModel,
  Message as MessageModel,
} from "@prisma/client/index.d";
import gql from "graphql-tag";
export type Maybe<T> = T | undefined;
export type InputMaybe<T> = T | undefined;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  AccountNumber: { input: any; output: any };
  BigInt: { input: any; output: any };
  Byte: { input: any; output: any };
  CountryCode: { input: any; output: any };
  Cuid: { input: any; output: any };
  Currency: { input: any; output: any };
  DID: { input: any; output: any };
  Date: { input: any; output: any };
  DateTime: { input: any; output: any };
  DateTimeISO: { input: any; output: any };
  DeweyDecimal: { input: any; output: any };
  Duration: { input: any; output: any };
  EmailAddress: { input: any; output: any };
  GUID: { input: any; output: any };
  HSL: { input: any; output: any };
  HSLA: { input: any; output: any };
  HexColorCode: { input: any; output: any };
  Hexadecimal: { input: any; output: any };
  IBAN: { input: any; output: any };
  IP: { input: any; output: any };
  IPCPatent: { input: any; output: any };
  IPv4: { input: any; output: any };
  IPv6: { input: any; output: any };
  ISBN: { input: any; output: any };
  ISO8601Duration: { input: any; output: any };
  JSON: { input: any; output: any };
  JSONObject: { input: any; output: any };
  JWT: { input: any; output: any };
  LCCSubclass: { input: any; output: any };
  Latitude: { input: any; output: any };
  LocalDate: { input: any; output: any };
  LocalDateTime: { input: any; output: any };
  LocalEndTime: { input: any; output: any };
  LocalTime: { input: any; output: any };
  Locale: { input: any; output: any };
  Long: { input: any; output: any };
  Longitude: { input: any; output: any };
  MAC: { input: any; output: any };
  NegativeFloat: { input: any; output: any };
  NegativeInt: { input: any; output: any };
  NonEmptyString: { input: any; output: any };
  NonNegativeFloat: { input: any; output: any };
  NonNegativeInt: { input: any; output: any };
  NonPositiveFloat: { input: any; output: any };
  NonPositiveInt: { input: any; output: any };
  ObjectID: { input: any; output: any };
  PhoneNumber: { input: any; output: any };
  Port: { input: any; output: any };
  PositiveFloat: { input: any; output: any };
  PositiveInt: { input: any; output: any };
  PostalCode: { input: any; output: any };
  RGB: { input: any; output: any };
  RGBA: { input: any; output: any };
  RoutingNumber: { input: any; output: any };
  SESSN: { input: any; output: any };
  SafeInt: { input: any; output: any };
  SemVer: { input: any; output: any };
  Time: { input: any; output: any };
  TimeZone: { input: any; output: any };
  Timestamp: { input: any; output: any };
  URL: { input: any; output: any };
  USCurrency: { input: any; output: any };
  UUID: { input: any; output: any };
  UnsignedFloat: { input: any; output: any };
  UnsignedInt: { input: any; output: any };
  UtcOffset: { input: any; output: any };
  Void: { input: any; output: any };
};

export type Chat = {
  __typename?: "Chat";
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["ID"]["output"];
  messages?: Maybe<Array<Maybe<Message>>>;
  project?: Maybe<Project>;
  projectId?: Maybe<Scalars["String"]["output"]>;
  updatedAt: Scalars["DateTime"]["output"];
  user?: Maybe<User>;
  userId?: Maybe<Scalars["String"]["output"]>;
};

export type FormattedMessage = {
  __typename?: "FormattedMessage";
  content: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
  role: Scalars["String"]["output"];
};

export type Message = {
  __typename?: "Message";
  chat?: Maybe<Chat>;
  chatId: Scalars["ID"]["output"];
  content: Scalars["String"]["output"];
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  role: Scalars["String"]["output"];
  task?: Maybe<Task>;
  taskId?: Maybe<Scalars["String"]["output"]>;
  updatedAt: Scalars["DateTime"]["output"];
  user?: Maybe<User>;
  userId?: Maybe<Scalars["String"]["output"]>;
};

export type Mutation = {
  __typename?: "Mutation";
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
  handleChatMessage?: Maybe<FormattedMessage>;
  updateChat?: Maybe<Chat>;
  updateMessage?: Maybe<Message>;
  updateProject?: Maybe<Project>;
  updateTask?: Maybe<Task>;
  updateUser?: Maybe<User>;
};

export type MutationCreateChatArgs = {
  projectId: Scalars["String"]["input"];
};

export type MutationCreateMessageArgs = {
  chatId: Scalars["ID"]["input"];
  content: Scalars["String"]["input"];
};

export type MutationCreateProjectArgs = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  name: Scalars["String"]["input"];
  type: Scalars["String"]["input"];
};

export type MutationCreateTaskArgs = {
  description: Scalars["String"]["input"];
  dueDate?: InputMaybe<Scalars["DateTime"]["input"]>;
  priority: Scalars["String"]["input"];
  projectId: Scalars["String"]["input"];
  status: Scalars["String"]["input"];
  title: Scalars["String"]["input"];
};

export type MutationCreateUserArgs = {
  email: Scalars["String"]["input"];
  role: Scalars["String"]["input"];
  username: Scalars["String"]["input"];
};

export type MutationDeleteChatArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDeleteMessageArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDeleteProjectArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDeleteTaskArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDeleteUserArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationHandleChatMessageArgs = {
  message: Scalars["String"]["input"];
};

export type MutationUpdateChatArgs = {
  id: Scalars["ID"]["input"];
  projectId: Scalars["String"]["input"];
};

export type MutationUpdateMessageArgs = {
  content: Scalars["String"]["input"];
  id: Scalars["ID"]["input"];
};

export type MutationUpdateProjectArgs = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["ID"]["input"];
  name?: InputMaybe<Scalars["String"]["input"]>;
  type?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationUpdateTaskArgs = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  dueDate?: InputMaybe<Scalars["DateTime"]["input"]>;
  id: Scalars["ID"]["input"];
  priority?: InputMaybe<Scalars["String"]["input"]>;
  projectId?: InputMaybe<Scalars["String"]["input"]>;
  status?: InputMaybe<Scalars["String"]["input"]>;
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationUpdateUserArgs = {
  email?: InputMaybe<Scalars["String"]["input"]>;
  firstName?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["ID"]["input"];
  lastName?: InputMaybe<Scalars["String"]["input"]>;
  role?: InputMaybe<Scalars["String"]["input"]>;
  username?: InputMaybe<Scalars["String"]["input"]>;
};

export type Project = {
  __typename?: "Project";
  chats?: Maybe<Array<Maybe<Chat>>>;
  createdAt: Scalars["DateTime"]["output"];
  description?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  tasks?: Maybe<Array<Maybe<Task>>>;
  type: Scalars["String"]["output"];
  updatedAt: Scalars["DateTime"]["output"];
  user?: Maybe<User>;
  userId: Scalars["String"]["output"];
};

export type Query = {
  __typename?: "Query";
  chat?: Maybe<Chat>;
  chats?: Maybe<Array<Maybe<Chat>>>;
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
  id: Scalars["ID"]["input"];
};

export type QueryMessageArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryProjectArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryTaskArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryUserArgs = {
  id: Scalars["ID"]["input"];
};

export type Task = {
  __typename?: "Task";
  createdAt: Scalars["DateTime"]["output"];
  description: Scalars["String"]["output"];
  dueDate?: Maybe<Scalars["DateTime"]["output"]>;
  id: Scalars["ID"]["output"];
  jiraTaskId?: Maybe<Scalars["String"]["output"]>;
  messages?: Maybe<Array<Maybe<Message>>>;
  motionEventId?: Maybe<Scalars["String"]["output"]>;
  priority: Scalars["String"]["output"];
  project?: Maybe<Project>;
  projectId: Scalars["String"]["output"];
  status: Scalars["String"]["output"];
  title: Scalars["String"]["output"];
  updatedAt: Scalars["DateTime"]["output"];
  user?: Maybe<User>;
  userId: Scalars["String"]["output"];
};

export type User = {
  __typename?: "User";
  chats?: Maybe<Array<Maybe<Chat>>>;
  createdAt: Scalars["DateTime"]["output"];
  email: Scalars["String"]["output"];
  firstName?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  jiraIntegration?: Maybe<Scalars["JSON"]["output"]>;
  lastName?: Maybe<Scalars["String"]["output"]>;
  messages?: Maybe<Array<Maybe<Message>>>;
  motionIntegration?: Maybe<Scalars["JSON"]["output"]>;
  projects?: Maybe<Array<Maybe<Project>>>;
  role: Scalars["String"]["output"];
  tasks?: Maybe<Array<Maybe<Task>>>;
  updatedAt: Scalars["DateTime"]["output"];
  username: Scalars["String"]["output"];
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {},
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo,
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {},
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AccountNumber: ResolverTypeWrapper<Scalars["AccountNumber"]["output"]>;
  BigInt: ResolverTypeWrapper<Scalars["BigInt"]["output"]>;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]["output"]>;
  Byte: ResolverTypeWrapper<Scalars["Byte"]["output"]>;
  Chat: ResolverTypeWrapper<ChatModel>;
  CountryCode: ResolverTypeWrapper<Scalars["CountryCode"]["output"]>;
  Cuid: ResolverTypeWrapper<Scalars["Cuid"]["output"]>;
  Currency: ResolverTypeWrapper<Scalars["Currency"]["output"]>;
  DID: ResolverTypeWrapper<Scalars["DID"]["output"]>;
  Date: ResolverTypeWrapper<Scalars["Date"]["output"]>;
  DateTime: ResolverTypeWrapper<Scalars["DateTime"]["output"]>;
  DateTimeISO: ResolverTypeWrapper<Scalars["DateTimeISO"]["output"]>;
  DeweyDecimal: ResolverTypeWrapper<Scalars["DeweyDecimal"]["output"]>;
  Duration: ResolverTypeWrapper<Scalars["Duration"]["output"]>;
  EmailAddress: ResolverTypeWrapper<Scalars["EmailAddress"]["output"]>;
  FormattedMessage: ResolverTypeWrapper<FormattedMessage>;
  GUID: ResolverTypeWrapper<Scalars["GUID"]["output"]>;
  HSL: ResolverTypeWrapper<Scalars["HSL"]["output"]>;
  HSLA: ResolverTypeWrapper<Scalars["HSLA"]["output"]>;
  HexColorCode: ResolverTypeWrapper<Scalars["HexColorCode"]["output"]>;
  Hexadecimal: ResolverTypeWrapper<Scalars["Hexadecimal"]["output"]>;
  IBAN: ResolverTypeWrapper<Scalars["IBAN"]["output"]>;
  ID: ResolverTypeWrapper<Scalars["ID"]["output"]>;
  IP: ResolverTypeWrapper<Scalars["IP"]["output"]>;
  IPCPatent: ResolverTypeWrapper<Scalars["IPCPatent"]["output"]>;
  IPv4: ResolverTypeWrapper<Scalars["IPv4"]["output"]>;
  IPv6: ResolverTypeWrapper<Scalars["IPv6"]["output"]>;
  ISBN: ResolverTypeWrapper<Scalars["ISBN"]["output"]>;
  ISO8601Duration: ResolverTypeWrapper<Scalars["ISO8601Duration"]["output"]>;
  JSON: ResolverTypeWrapper<Scalars["JSON"]["output"]>;
  JSONObject: ResolverTypeWrapper<Scalars["JSONObject"]["output"]>;
  JWT: ResolverTypeWrapper<Scalars["JWT"]["output"]>;
  LCCSubclass: ResolverTypeWrapper<Scalars["LCCSubclass"]["output"]>;
  Latitude: ResolverTypeWrapper<Scalars["Latitude"]["output"]>;
  LocalDate: ResolverTypeWrapper<Scalars["LocalDate"]["output"]>;
  LocalDateTime: ResolverTypeWrapper<Scalars["LocalDateTime"]["output"]>;
  LocalEndTime: ResolverTypeWrapper<Scalars["LocalEndTime"]["output"]>;
  LocalTime: ResolverTypeWrapper<Scalars["LocalTime"]["output"]>;
  Locale: ResolverTypeWrapper<Scalars["Locale"]["output"]>;
  Long: ResolverTypeWrapper<Scalars["Long"]["output"]>;
  Longitude: ResolverTypeWrapper<Scalars["Longitude"]["output"]>;
  MAC: ResolverTypeWrapper<Scalars["MAC"]["output"]>;
  Message: ResolverTypeWrapper<MessageModel>;
  Mutation: ResolverTypeWrapper<{}>;
  NegativeFloat: ResolverTypeWrapper<Scalars["NegativeFloat"]["output"]>;
  NegativeInt: ResolverTypeWrapper<Scalars["NegativeInt"]["output"]>;
  NonEmptyString: ResolverTypeWrapper<Scalars["NonEmptyString"]["output"]>;
  NonNegativeFloat: ResolverTypeWrapper<Scalars["NonNegativeFloat"]["output"]>;
  NonNegativeInt: ResolverTypeWrapper<Scalars["NonNegativeInt"]["output"]>;
  NonPositiveFloat: ResolverTypeWrapper<Scalars["NonPositiveFloat"]["output"]>;
  NonPositiveInt: ResolverTypeWrapper<Scalars["NonPositiveInt"]["output"]>;
  ObjectID: ResolverTypeWrapper<Scalars["ObjectID"]["output"]>;
  PhoneNumber: ResolverTypeWrapper<Scalars["PhoneNumber"]["output"]>;
  Port: ResolverTypeWrapper<Scalars["Port"]["output"]>;
  PositiveFloat: ResolverTypeWrapper<Scalars["PositiveFloat"]["output"]>;
  PositiveInt: ResolverTypeWrapper<Scalars["PositiveInt"]["output"]>;
  PostalCode: ResolverTypeWrapper<Scalars["PostalCode"]["output"]>;
  Project: ResolverTypeWrapper<ProjectModel>;
  Query: ResolverTypeWrapper<{}>;
  RGB: ResolverTypeWrapper<Scalars["RGB"]["output"]>;
  RGBA: ResolverTypeWrapper<Scalars["RGBA"]["output"]>;
  RoutingNumber: ResolverTypeWrapper<Scalars["RoutingNumber"]["output"]>;
  SESSN: ResolverTypeWrapper<Scalars["SESSN"]["output"]>;
  SafeInt: ResolverTypeWrapper<Scalars["SafeInt"]["output"]>;
  SemVer: ResolverTypeWrapper<Scalars["SemVer"]["output"]>;
  String: ResolverTypeWrapper<Scalars["String"]["output"]>;
  Task: ResolverTypeWrapper<TaskModel>;
  Time: ResolverTypeWrapper<Scalars["Time"]["output"]>;
  TimeZone: ResolverTypeWrapper<Scalars["TimeZone"]["output"]>;
  Timestamp: ResolverTypeWrapper<Scalars["Timestamp"]["output"]>;
  URL: ResolverTypeWrapper<Scalars["URL"]["output"]>;
  USCurrency: ResolverTypeWrapper<Scalars["USCurrency"]["output"]>;
  UUID: ResolverTypeWrapper<Scalars["UUID"]["output"]>;
  UnsignedFloat: ResolverTypeWrapper<Scalars["UnsignedFloat"]["output"]>;
  UnsignedInt: ResolverTypeWrapper<Scalars["UnsignedInt"]["output"]>;
  User: ResolverTypeWrapper<UserModel>;
  UtcOffset: ResolverTypeWrapper<Scalars["UtcOffset"]["output"]>;
  Void: ResolverTypeWrapper<Scalars["Void"]["output"]>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AccountNumber: Scalars["AccountNumber"]["output"];
  BigInt: Scalars["BigInt"]["output"];
  Boolean: Scalars["Boolean"]["output"];
  Byte: Scalars["Byte"]["output"];
  Chat: ChatModel;
  CountryCode: Scalars["CountryCode"]["output"];
  Cuid: Scalars["Cuid"]["output"];
  Currency: Scalars["Currency"]["output"];
  DID: Scalars["DID"]["output"];
  Date: Scalars["Date"]["output"];
  DateTime: Scalars["DateTime"]["output"];
  DateTimeISO: Scalars["DateTimeISO"]["output"];
  DeweyDecimal: Scalars["DeweyDecimal"]["output"];
  Duration: Scalars["Duration"]["output"];
  EmailAddress: Scalars["EmailAddress"]["output"];
  FormattedMessage: FormattedMessage;
  GUID: Scalars["GUID"]["output"];
  HSL: Scalars["HSL"]["output"];
  HSLA: Scalars["HSLA"]["output"];
  HexColorCode: Scalars["HexColorCode"]["output"];
  Hexadecimal: Scalars["Hexadecimal"]["output"];
  IBAN: Scalars["IBAN"]["output"];
  ID: Scalars["ID"]["output"];
  IP: Scalars["IP"]["output"];
  IPCPatent: Scalars["IPCPatent"]["output"];
  IPv4: Scalars["IPv4"]["output"];
  IPv6: Scalars["IPv6"]["output"];
  ISBN: Scalars["ISBN"]["output"];
  ISO8601Duration: Scalars["ISO8601Duration"]["output"];
  JSON: Scalars["JSON"]["output"];
  JSONObject: Scalars["JSONObject"]["output"];
  JWT: Scalars["JWT"]["output"];
  LCCSubclass: Scalars["LCCSubclass"]["output"];
  Latitude: Scalars["Latitude"]["output"];
  LocalDate: Scalars["LocalDate"]["output"];
  LocalDateTime: Scalars["LocalDateTime"]["output"];
  LocalEndTime: Scalars["LocalEndTime"]["output"];
  LocalTime: Scalars["LocalTime"]["output"];
  Locale: Scalars["Locale"]["output"];
  Long: Scalars["Long"]["output"];
  Longitude: Scalars["Longitude"]["output"];
  MAC: Scalars["MAC"]["output"];
  Message: MessageModel;
  Mutation: {};
  NegativeFloat: Scalars["NegativeFloat"]["output"];
  NegativeInt: Scalars["NegativeInt"]["output"];
  NonEmptyString: Scalars["NonEmptyString"]["output"];
  NonNegativeFloat: Scalars["NonNegativeFloat"]["output"];
  NonNegativeInt: Scalars["NonNegativeInt"]["output"];
  NonPositiveFloat: Scalars["NonPositiveFloat"]["output"];
  NonPositiveInt: Scalars["NonPositiveInt"]["output"];
  ObjectID: Scalars["ObjectID"]["output"];
  PhoneNumber: Scalars["PhoneNumber"]["output"];
  Port: Scalars["Port"]["output"];
  PositiveFloat: Scalars["PositiveFloat"]["output"];
  PositiveInt: Scalars["PositiveInt"]["output"];
  PostalCode: Scalars["PostalCode"]["output"];
  Project: ProjectModel;
  Query: {};
  RGB: Scalars["RGB"]["output"];
  RGBA: Scalars["RGBA"]["output"];
  RoutingNumber: Scalars["RoutingNumber"]["output"];
  SESSN: Scalars["SESSN"]["output"];
  SafeInt: Scalars["SafeInt"]["output"];
  SemVer: Scalars["SemVer"]["output"];
  String: Scalars["String"]["output"];
  Task: TaskModel;
  Time: Scalars["Time"]["output"];
  TimeZone: Scalars["TimeZone"]["output"];
  Timestamp: Scalars["Timestamp"]["output"];
  URL: Scalars["URL"]["output"];
  USCurrency: Scalars["USCurrency"]["output"];
  UUID: Scalars["UUID"]["output"];
  UnsignedFloat: Scalars["UnsignedFloat"]["output"];
  UnsignedInt: Scalars["UnsignedInt"]["output"];
  User: UserModel;
  UtcOffset: Scalars["UtcOffset"]["output"];
  Void: Scalars["Void"]["output"];
};

export interface AccountNumberScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["AccountNumber"], any> {
  name: "AccountNumber";
}

export interface BigIntScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["BigInt"], any> {
  name: "BigInt";
}

export interface ByteScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Byte"], any> {
  name: "Byte";
}

export type ChatResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Chat"] = ResolversParentTypes["Chat"],
> = {
  createdAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  messages?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Message"]>>>,
    ParentType,
    ContextType
  >;
  project?: Resolver<Maybe<ResolversTypes["Project"]>, ParentType, ContextType>;
  projectId?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  updatedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface CountryCodeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["CountryCode"], any> {
  name: "CountryCode";
}

export interface CuidScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Cuid"], any> {
  name: "Cuid";
}

export interface CurrencyScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Currency"], any> {
  name: "Currency";
}

export interface DidScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["DID"], any> {
  name: "DID";
}

export interface DateScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Date"], any> {
  name: "Date";
}

export interface DateTimeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["DateTime"], any> {
  name: "DateTime";
}

export interface DateTimeIsoScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["DateTimeISO"], any> {
  name: "DateTimeISO";
}

export interface DeweyDecimalScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["DeweyDecimal"], any> {
  name: "DeweyDecimal";
}

export interface DurationScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Duration"], any> {
  name: "Duration";
}

export interface EmailAddressScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["EmailAddress"], any> {
  name: "EmailAddress";
}

export type FormattedMessageResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["FormattedMessage"] = ResolversParentTypes["FormattedMessage"],
> = {
  content?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  role?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface GuidScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["GUID"], any> {
  name: "GUID";
}

export interface HslScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["HSL"], any> {
  name: "HSL";
}

export interface HslaScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["HSLA"], any> {
  name: "HSLA";
}

export interface HexColorCodeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["HexColorCode"], any> {
  name: "HexColorCode";
}

export interface HexadecimalScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Hexadecimal"], any> {
  name: "Hexadecimal";
}

export interface IbanScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["IBAN"], any> {
  name: "IBAN";
}

export interface IpScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["IP"], any> {
  name: "IP";
}

export interface IpcPatentScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["IPCPatent"], any> {
  name: "IPCPatent";
}

export interface IPv4ScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["IPv4"], any> {
  name: "IPv4";
}

export interface IPv6ScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["IPv6"], any> {
  name: "IPv6";
}

export interface IsbnScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["ISBN"], any> {
  name: "ISBN";
}

export interface Iso8601DurationScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["ISO8601Duration"], any> {
  name: "ISO8601Duration";
}

export interface JsonScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["JSON"], any> {
  name: "JSON";
}

export interface JsonObjectScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["JSONObject"], any> {
  name: "JSONObject";
}

export interface JwtScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["JWT"], any> {
  name: "JWT";
}

export interface LccSubclassScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["LCCSubclass"], any> {
  name: "LCCSubclass";
}

export interface LatitudeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Latitude"], any> {
  name: "Latitude";
}

export interface LocalDateScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["LocalDate"], any> {
  name: "LocalDate";
}

export interface LocalDateTimeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["LocalDateTime"], any> {
  name: "LocalDateTime";
}

export interface LocalEndTimeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["LocalEndTime"], any> {
  name: "LocalEndTime";
}

export interface LocalTimeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["LocalTime"], any> {
  name: "LocalTime";
}

export interface LocaleScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Locale"], any> {
  name: "Locale";
}

export interface LongScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Long"], any> {
  name: "Long";
}

export interface LongitudeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Longitude"], any> {
  name: "Longitude";
}

export interface MacScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["MAC"], any> {
  name: "MAC";
}

export type MessageResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Message"] = ResolversParentTypes["Message"],
> = {
  chat?: Resolver<Maybe<ResolversTypes["Chat"]>, ParentType, ContextType>;
  chatId?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  content?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  role?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  task?: Resolver<Maybe<ResolversTypes["Task"]>, ParentType, ContextType>;
  taskId?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"],
> = {
  createChat?: Resolver<
    Maybe<ResolversTypes["Chat"]>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateChatArgs, "projectId">
  >;
  createMessage?: Resolver<
    Maybe<ResolversTypes["Message"]>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateMessageArgs, "chatId" | "content">
  >;
  createProject?: Resolver<
    Maybe<ResolversTypes["Project"]>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateProjectArgs, "name" | "type">
  >;
  createTask?: Resolver<
    Maybe<ResolversTypes["Task"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationCreateTaskArgs,
      "description" | "priority" | "projectId" | "status" | "title"
    >
  >;
  createUser?: Resolver<
    Maybe<ResolversTypes["User"]>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateUserArgs, "email" | "role" | "username">
  >;
  deleteChat?: Resolver<
    Maybe<ResolversTypes["Chat"]>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteChatArgs, "id">
  >;
  deleteMessage?: Resolver<
    Maybe<ResolversTypes["Message"]>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteMessageArgs, "id">
  >;
  deleteProject?: Resolver<
    Maybe<ResolversTypes["Project"]>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteProjectArgs, "id">
  >;
  deleteTask?: Resolver<
    Maybe<ResolversTypes["Task"]>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteTaskArgs, "id">
  >;
  deleteUser?: Resolver<
    Maybe<ResolversTypes["User"]>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteUserArgs, "id">
  >;
  handleChatMessage?: Resolver<
    Maybe<ResolversTypes["FormattedMessage"]>,
    ParentType,
    ContextType,
    RequireFields<MutationHandleChatMessageArgs, "message">
  >;
  updateChat?: Resolver<
    Maybe<ResolversTypes["Chat"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateChatArgs, "id" | "projectId">
  >;
  updateMessage?: Resolver<
    Maybe<ResolversTypes["Message"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateMessageArgs, "content" | "id">
  >;
  updateProject?: Resolver<
    Maybe<ResolversTypes["Project"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateProjectArgs, "id">
  >;
  updateTask?: Resolver<
    Maybe<ResolversTypes["Task"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateTaskArgs, "id">
  >;
  updateUser?: Resolver<
    Maybe<ResolversTypes["User"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateUserArgs, "id">
  >;
};

export interface NegativeFloatScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["NegativeFloat"], any> {
  name: "NegativeFloat";
}

export interface NegativeIntScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["NegativeInt"], any> {
  name: "NegativeInt";
}

export interface NonEmptyStringScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["NonEmptyString"], any> {
  name: "NonEmptyString";
}

export interface NonNegativeFloatScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["NonNegativeFloat"], any> {
  name: "NonNegativeFloat";
}

export interface NonNegativeIntScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["NonNegativeInt"], any> {
  name: "NonNegativeInt";
}

export interface NonPositiveFloatScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["NonPositiveFloat"], any> {
  name: "NonPositiveFloat";
}

export interface NonPositiveIntScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["NonPositiveInt"], any> {
  name: "NonPositiveInt";
}

export interface ObjectIdScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["ObjectID"], any> {
  name: "ObjectID";
}

export interface PhoneNumberScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["PhoneNumber"], any> {
  name: "PhoneNumber";
}

export interface PortScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Port"], any> {
  name: "Port";
}

export interface PositiveFloatScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["PositiveFloat"], any> {
  name: "PositiveFloat";
}

export interface PositiveIntScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["PositiveInt"], any> {
  name: "PositiveInt";
}

export interface PostalCodeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["PostalCode"], any> {
  name: "PostalCode";
}

export type ProjectResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Project"] = ResolversParentTypes["Project"],
> = {
  chats?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Chat"]>>>,
    ParentType,
    ContextType
  >;
  createdAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  description?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  tasks?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Task"]>>>,
    ParentType,
    ContextType
  >;
  type?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>;
  userId?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Query"] = ResolversParentTypes["Query"],
> = {
  chat?: Resolver<
    Maybe<ResolversTypes["Chat"]>,
    ParentType,
    ContextType,
    RequireFields<QueryChatArgs, "id">
  >;
  chats?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Chat"]>>>,
    ParentType,
    ContextType
  >;
  message?: Resolver<
    Maybe<ResolversTypes["Message"]>,
    ParentType,
    ContextType,
    RequireFields<QueryMessageArgs, "id">
  >;
  messages?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Message"]>>>,
    ParentType,
    ContextType
  >;
  project?: Resolver<
    Maybe<ResolversTypes["Project"]>,
    ParentType,
    ContextType,
    RequireFields<QueryProjectArgs, "id">
  >;
  projects?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Project"]>>>,
    ParentType,
    ContextType
  >;
  task?: Resolver<
    Maybe<ResolversTypes["Task"]>,
    ParentType,
    ContextType,
    RequireFields<QueryTaskArgs, "id">
  >;
  tasks?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Task"]>>>,
    ParentType,
    ContextType
  >;
  user?: Resolver<
    Maybe<ResolversTypes["User"]>,
    ParentType,
    ContextType,
    RequireFields<QueryUserArgs, "id">
  >;
  users?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["User"]>>>,
    ParentType,
    ContextType
  >;
};

export interface RgbScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["RGB"], any> {
  name: "RGB";
}

export interface RgbaScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["RGBA"], any> {
  name: "RGBA";
}

export interface RoutingNumberScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["RoutingNumber"], any> {
  name: "RoutingNumber";
}

export interface SessnScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["SESSN"], any> {
  name: "SESSN";
}

export interface SafeIntScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["SafeInt"], any> {
  name: "SafeInt";
}

export interface SemVerScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["SemVer"], any> {
  name: "SemVer";
}

export type TaskResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Task"] = ResolversParentTypes["Task"],
> = {
  createdAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  description?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  dueDate?: Resolver<
    Maybe<ResolversTypes["DateTime"]>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  jiraTaskId?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  messages?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Message"]>>>,
    ParentType,
    ContextType
  >;
  motionEventId?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  priority?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  project?: Resolver<Maybe<ResolversTypes["Project"]>, ParentType, ContextType>;
  projectId?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  status?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  title?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>;
  userId?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface TimeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Time"], any> {
  name: "Time";
}

export interface TimeZoneScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["TimeZone"], any> {
  name: "TimeZone";
}

export interface TimestampScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Timestamp"], any> {
  name: "Timestamp";
}

export interface UrlScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["URL"], any> {
  name: "URL";
}

export interface UsCurrencyScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["USCurrency"], any> {
  name: "USCurrency";
}

export interface UuidScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["UUID"], any> {
  name: "UUID";
}

export interface UnsignedFloatScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["UnsignedFloat"], any> {
  name: "UnsignedFloat";
}

export interface UnsignedIntScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["UnsignedInt"], any> {
  name: "UnsignedInt";
}

export type UserResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["User"] = ResolversParentTypes["User"],
> = {
  chats?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Chat"]>>>,
    ParentType,
    ContextType
  >;
  createdAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  email?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  firstName?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  jiraIntegration?: Resolver<
    Maybe<ResolversTypes["JSON"]>,
    ParentType,
    ContextType
  >;
  lastName?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  messages?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Message"]>>>,
    ParentType,
    ContextType
  >;
  motionIntegration?: Resolver<
    Maybe<ResolversTypes["JSON"]>,
    ParentType,
    ContextType
  >;
  projects?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Project"]>>>,
    ParentType,
    ContextType
  >;
  role?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  tasks?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Task"]>>>,
    ParentType,
    ContextType
  >;
  updatedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  username?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface UtcOffsetScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["UtcOffset"], any> {
  name: "UtcOffset";
}

export interface VoidScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Void"], any> {
  name: "Void";
}

export type Resolvers<ContextType = any> = {
  AccountNumber?: GraphQLScalarType;
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
  Message?: MessageResolvers<ContextType>;
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
  UtcOffset?: GraphQLScalarType;
  Void?: GraphQLScalarType;
};
