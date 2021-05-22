import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};


export type Event = {
  __typename?: 'Event';
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  heroImg?: Maybe<Scalars['String']>;
  dateTime?: Maybe<Scalars['Date']>;
  address?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  time?: Maybe<Scalars['String']>;
  eventDetails?: Maybe<Scalars['String']>;
  races?: Maybe<Array<Maybe<Race>>>;
};

export type EventInput = {
  name: Scalars['String'];
  heroImg?: Maybe<Scalars['Upload']>;
  dateTime: Scalars['String'];
  utcOffset?: Maybe<Scalars['Int']>;
  address?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  eventDetails?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser?: Maybe<User>;
  createEvent?: Maybe<Event>;
  createRace?: Maybe<Race>;
  fileUpload?: Maybe<Scalars['String']>;
};


export type MutationCreateEventArgs = {
  event: EventInput;
};


export type MutationCreateRaceArgs = {
  eventId?: Maybe<Scalars['String']>;
  race?: Maybe<RaceInput>;
};


export type MutationFileUploadArgs = {
  file: Scalars['Upload'];
};

export type Query = {
  __typename?: 'Query';
  events: Array<Maybe<Event>>;
  eventBySlug?: Maybe<Event>;
  userEvents: Array<Maybe<Event>>;
};


export type QueryEventBySlugArgs = {
  slug: Scalars['String'];
};

export type Race = {
  __typename?: 'Race';
  type?: Maybe<Scalars['String']>;
  dateTime?: Maybe<Scalars['Date']>;
  distance?: Maybe<Scalars['Int']>;
  route?: Maybe<Scalars['String']>;
};

export type RaceInput = {
  type?: Maybe<Scalars['String']>;
  dateTime?: Maybe<Scalars['Date']>;
  distance?: Maybe<Scalars['Int']>;
  route?: Maybe<Scalars['String']>;
};


export type User = {
  __typename?: 'User';
  id?: Maybe<Scalars['ID']>;
  email: Scalars['String'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

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
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

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
export type ResolversTypes = {
  Date: ResolverTypeWrapper<Scalars['Date']>;
  Event: ResolverTypeWrapper<Event>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  EventInput: EventInput;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  Race: ResolverTypeWrapper<Race>;
  RaceInput: RaceInput;
  Upload: ResolverTypeWrapper<Scalars['Upload']>;
  User: ResolverTypeWrapper<User>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Date: Scalars['Date'];
  Event: Event;
  ID: Scalars['ID'];
  String: Scalars['String'];
  EventInput: EventInput;
  Int: Scalars['Int'];
  Mutation: {};
  Query: {};
  Race: Race;
  RaceInput: RaceInput;
  Upload: Scalars['Upload'];
  User: User;
  Boolean: Scalars['Boolean'];
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type EventResolvers<ContextType = any, ParentType extends ResolversParentTypes['Event'] = ResolversParentTypes['Event']> = {
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  heroImg?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dateTime?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  state?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  time?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  eventDetails?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  races?: Resolver<Maybe<Array<Maybe<ResolversTypes['Race']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  createEvent?: Resolver<Maybe<ResolversTypes['Event']>, ParentType, ContextType, RequireFields<MutationCreateEventArgs, 'event'>>;
  createRace?: Resolver<Maybe<ResolversTypes['Race']>, ParentType, ContextType, RequireFields<MutationCreateRaceArgs, never>>;
  fileUpload?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationFileUploadArgs, 'file'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  events?: Resolver<Array<Maybe<ResolversTypes['Event']>>, ParentType, ContextType>;
  eventBySlug?: Resolver<Maybe<ResolversTypes['Event']>, ParentType, ContextType, RequireFields<QueryEventBySlugArgs, 'slug'>>;
  userEvents?: Resolver<Array<Maybe<ResolversTypes['Event']>>, ParentType, ContextType>;
};

export type RaceResolvers<ContextType = any, ParentType extends ResolversParentTypes['Race'] = ResolversParentTypes['Race']> = {
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dateTime?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  distance?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  route?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Date?: GraphQLScalarType;
  Event?: EventResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Race?: RaceResolvers<ContextType>;
  Upload?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
