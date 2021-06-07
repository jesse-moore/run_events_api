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
  FeatureCollectionObject: any;
  FeatureObject: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};


export type Event = {
  __typename?: 'Event';
  id: Scalars['ID'];
  name: Scalars['String'];
  heroImg: Scalars['String'];
  dateTime: Scalars['Date'];
  address: Scalars['String'];
  city: Scalars['String'];
  state: Scalars['String'];
  eventDetails: Scalars['String'];
  races: Array<Race>;
};

export type EventDetailsInput = {
  id: Scalars['String'];
  name: Scalars['String'];
  dateTime: Scalars['Date'];
  address: Scalars['String'];
  city: Scalars['String'];
  state: Scalars['String'];
};

export type EventInput = {
  name: Scalars['String'];
  heroImg?: Maybe<Scalars['Upload']>;
  dateTime: Scalars['String'];
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
  deleteEvent?: Maybe<Scalars['String']>;
  deleteRace?: Maybe<Scalars['String']>;
  updateRace?: Maybe<Race>;
  fileUpload?: Maybe<Scalars['String']>;
  saveHeroImg?: Maybe<Event>;
  saveEventDetails?: Maybe<Event>;
  saveEventDescription?: Maybe<Event>;
};


export type MutationCreateEventArgs = {
  event: EventInput;
};


export type MutationCreateRaceArgs = {
  eventId: Scalars['String'];
  race: RaceInput;
};


export type MutationDeleteEventArgs = {
  eventId: Scalars['String'];
};


export type MutationDeleteRaceArgs = {
  raceId: Scalars['String'];
};


export type MutationUpdateRaceArgs = {
  raceId: Scalars['String'];
  raceUpdates: UpdateRaceInput;
};


export type MutationFileUploadArgs = {
  file: Scalars['Upload'];
};


export type MutationSaveHeroImgArgs = {
  file: Scalars['Upload'];
  id: Scalars['String'];
};


export type MutationSaveEventDetailsArgs = {
  eventDetails: EventDetailsInput;
};


export type MutationSaveEventDescriptionArgs = {
  eventDescription: Scalars['String'];
  id: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  events: Array<Maybe<Event>>;
  eventBySlug?: Maybe<Event>;
  userEvents: Array<Maybe<Event>>;
  userEventByID?: Maybe<Event>;
  userRaceByID?: Maybe<Race>;
};


export type QueryEventBySlugArgs = {
  slug: Scalars['String'];
};


export type QueryUserEventByIdArgs = {
  id: Scalars['String'];
};


export type QueryUserRaceByIdArgs = {
  id: Scalars['String'];
};

export type Race = {
  __typename?: 'Race';
  id: Scalars['String'];
  name: Scalars['String'];
  distance: Scalars['Int'];
  route: Route;
  event: Event;
};

export type RaceInput = {
  name: Scalars['String'];
  distance: Scalars['Int'];
  route: RouteInput;
};

export type Route = {
  __typename?: 'Route';
  points: Scalars['FeatureCollectionObject'];
  route: Scalars['FeatureCollectionObject'];
  routeStartMarker?: Maybe<Scalars['FeatureObject']>;
  routeEndMarker?: Maybe<Scalars['FeatureObject']>;
};

export type RouteInput = {
  points: Scalars['FeatureCollectionObject'];
  route: Scalars['FeatureCollectionObject'];
  routeStartMarker?: Maybe<Scalars['FeatureObject']>;
  routeEndMarker?: Maybe<Scalars['FeatureObject']>;
};

export type UpdateRaceInput = {
  name?: Maybe<Scalars['String']>;
  distance?: Maybe<Scalars['Int']>;
  route?: Maybe<UpdateRouteInput>;
};

export type UpdateRouteInput = {
  points?: Maybe<Scalars['FeatureCollectionObject']>;
  route?: Maybe<Scalars['FeatureCollectionObject']>;
  routeStartMarker?: Maybe<Scalars['FeatureObject']>;
  routeEndMarker?: Maybe<Scalars['FeatureObject']>;
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
  EventDetailsInput: EventDetailsInput;
  EventInput: EventInput;
  FeatureCollectionObject: ResolverTypeWrapper<Scalars['FeatureCollectionObject']>;
  FeatureObject: ResolverTypeWrapper<Scalars['FeatureObject']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  Race: ResolverTypeWrapper<Race>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  RaceInput: RaceInput;
  Route: ResolverTypeWrapper<Route>;
  RouteInput: RouteInput;
  UpdateRaceInput: UpdateRaceInput;
  UpdateRouteInput: UpdateRouteInput;
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
  EventDetailsInput: EventDetailsInput;
  EventInput: EventInput;
  FeatureCollectionObject: Scalars['FeatureCollectionObject'];
  FeatureObject: Scalars['FeatureObject'];
  Mutation: {};
  Query: {};
  Race: Race;
  Int: Scalars['Int'];
  RaceInput: RaceInput;
  Route: Route;
  RouteInput: RouteInput;
  UpdateRaceInput: UpdateRaceInput;
  UpdateRouteInput: UpdateRouteInput;
  Upload: Scalars['Upload'];
  User: User;
  Boolean: Scalars['Boolean'];
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type EventResolvers<ContextType = any, ParentType extends ResolversParentTypes['Event'] = ResolversParentTypes['Event']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  heroImg?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  dateTime?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  city?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  state?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  eventDetails?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  races?: Resolver<Array<ResolversTypes['Race']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface FeatureCollectionObjectScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['FeatureCollectionObject'], any> {
  name: 'FeatureCollectionObject';
}

export interface FeatureObjectScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['FeatureObject'], any> {
  name: 'FeatureObject';
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  createEvent?: Resolver<Maybe<ResolversTypes['Event']>, ParentType, ContextType, RequireFields<MutationCreateEventArgs, 'event'>>;
  createRace?: Resolver<Maybe<ResolversTypes['Race']>, ParentType, ContextType, RequireFields<MutationCreateRaceArgs, 'eventId' | 'race'>>;
  deleteEvent?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationDeleteEventArgs, 'eventId'>>;
  deleteRace?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationDeleteRaceArgs, 'raceId'>>;
  updateRace?: Resolver<Maybe<ResolversTypes['Race']>, ParentType, ContextType, RequireFields<MutationUpdateRaceArgs, 'raceId' | 'raceUpdates'>>;
  fileUpload?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationFileUploadArgs, 'file'>>;
  saveHeroImg?: Resolver<Maybe<ResolversTypes['Event']>, ParentType, ContextType, RequireFields<MutationSaveHeroImgArgs, 'file' | 'id'>>;
  saveEventDetails?: Resolver<Maybe<ResolversTypes['Event']>, ParentType, ContextType, RequireFields<MutationSaveEventDetailsArgs, 'eventDetails'>>;
  saveEventDescription?: Resolver<Maybe<ResolversTypes['Event']>, ParentType, ContextType, RequireFields<MutationSaveEventDescriptionArgs, 'eventDescription' | 'id'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  events?: Resolver<Array<Maybe<ResolversTypes['Event']>>, ParentType, ContextType>;
  eventBySlug?: Resolver<Maybe<ResolversTypes['Event']>, ParentType, ContextType, RequireFields<QueryEventBySlugArgs, 'slug'>>;
  userEvents?: Resolver<Array<Maybe<ResolversTypes['Event']>>, ParentType, ContextType>;
  userEventByID?: Resolver<Maybe<ResolversTypes['Event']>, ParentType, ContextType, RequireFields<QueryUserEventByIdArgs, 'id'>>;
  userRaceByID?: Resolver<Maybe<ResolversTypes['Race']>, ParentType, ContextType, RequireFields<QueryUserRaceByIdArgs, 'id'>>;
};

export type RaceResolvers<ContextType = any, ParentType extends ResolversParentTypes['Race'] = ResolversParentTypes['Race']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  distance?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  route?: Resolver<ResolversTypes['Route'], ParentType, ContextType>;
  event?: Resolver<ResolversTypes['Event'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RouteResolvers<ContextType = any, ParentType extends ResolversParentTypes['Route'] = ResolversParentTypes['Route']> = {
  points?: Resolver<ResolversTypes['FeatureCollectionObject'], ParentType, ContextType>;
  route?: Resolver<ResolversTypes['FeatureCollectionObject'], ParentType, ContextType>;
  routeStartMarker?: Resolver<Maybe<ResolversTypes['FeatureObject']>, ParentType, ContextType>;
  routeEndMarker?: Resolver<Maybe<ResolversTypes['FeatureObject']>, ParentType, ContextType>;
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
  FeatureCollectionObject?: GraphQLScalarType;
  FeatureObject?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Race?: RaceResolvers<ContextType>;
  Route?: RouteResolvers<ContextType>;
  Upload?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
