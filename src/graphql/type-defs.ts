import { gql } from 'apollo-server'

export const typeDefs = gql`
    scalar Upload

    type User {
        id: ID!
        email: String!
    }

    type Event {
        name: String
        heroImg: HeroImg
        date: String
        address: String
        city: String
        state: String
        time: String
        eventDetails: String
    }

    type HeroImg {
        src: String
        name: String
        size: Int
    }

    input EventInput {
        name: String 
        heroImg: Upload
        date: String
        address: String
        city: String
        state: String
        time: String
        eventDetails: String
    }

    type Query {
        user: User
        events: [Event]!
        userEvents: [Event]!
    }

    type Mutation {
        createUser: String
        createEvent(event: EventInput!): Event
        fileUpload(file: Upload!): String
    }
`
