import { gql } from 'apollo-server';
const { FeatureCollectionObject, FeatureObject } = require('graphql-geojson');

export const typeDefs = gql`
    scalar Upload
    scalar Date
    scalar FeatureCollectionObject
    scalar FeatureObject

    type User {
        id: ID
        email: String!
    }

    type Event {
        id: ID!
        name: String!
        heroImg: String!
        dateTime: Date!
        address: String!
        city: String!
        state: String!
        eventDetails: String!
        slug: String!
        races: [Race!]!
    }

    input EventInput {
        slug: String!
        name: String!
        heroImg: Upload
        dateTime: String!
        address: String
        city: String
        state: String
        eventDetails: String
    }

    input EventDetailsInput {
        id: String!
        name: String!
        dateTime: Date!
        address: String!
        city: String!
        state: String!
        slug: String!
    }

    type Race {
        id: String!
        name: String!
        distance: Int!
        route: Route!
        event: Event!
    }

    type Route {
        points: FeatureCollectionObject!
        route: FeatureCollectionObject!
        routeStartMarker: FeatureObject
        routeEndMarker: FeatureObject
    }

    input RouteInput {
        points: FeatureCollectionObject!
        route: FeatureCollectionObject!
        routeStartMarker: FeatureObject
        routeEndMarker: FeatureObject
    }

    input RaceInput {
        name: String!
        distance: Int!
        route: RouteInput!
    }

    input UpdateRouteInput {
        points: FeatureCollectionObject
        route: FeatureCollectionObject
        routeStartMarker: FeatureObject
        routeEndMarker: FeatureObject
    }

    input UpdateRaceInput {
        name: String
        distance: Int
        route: UpdateRouteInput
    }

    type Query {
        events: [Event]!
        eventBySlug(slug: String!): Event
        userEvents: [Event]!
        userEventByID(id: String!): Event
        userRaceByID(id: String!): Race
        checkSubdomain(subdomain: String!): Boolean!
    }

    type Mutation {
        createUser: User
        createEvent(event: EventInput!): Event
        createRace(eventId: String!, race: RaceInput!): Race
        deleteEvent(eventId: String!): String
        deleteRace(raceId: String!): String
        updateRace(raceId: String!, raceUpdates: UpdateRaceInput!): Race
        fileUpload(file: Upload!): String
        saveHeroImg(file: Upload!, id: String!): Event
        saveEventDetails(eventDetails: EventDetailsInput!): Event
        saveEventDescription(eventDescription: String!, id: String!): Event
    }
`;
