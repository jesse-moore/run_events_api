import { gql } from 'apollo-server';

export const typeDefs = gql`
    scalar Upload
    scalar Date

    type User {
        id: ID
        email: String!
    }

    type Event {
        id: ID
        name: String
        heroImg: String
        dateTime: Date
        address: String
        city: String
        state: String
        eventDetails: String
        races: [Race]
    }

    input EventInput {
        name: String!
        heroImg: Upload
        dateTime: String!
        utcOffset: Int
        address: String
        city: String
        state: String
        eventDetails: String
    }

    type Race {
        type: String
        dateTime: Date
        distance: Int
        route: String
    }

    input RaceInput {
        type: String
        dateTime: Date
        distance: Int
        route: String
    }

    type Query {
        events: [Event]!
        eventBySlug(slug: String!): Event
        userEvents: [Event]!
    }

    type Mutation {
        createUser: User
        createEvent(event: EventInput!): Event
        createRace(eventId: String, race: RaceInput): Race
        fileUpload(file: Upload!): String
    }
`;
