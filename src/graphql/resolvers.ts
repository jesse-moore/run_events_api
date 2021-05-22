import { UserInputError, AuthenticationError } from 'apollo-server-errors';
import { GraphQLUpload } from 'graphql-upload';
import { QueryResolvers, MutationResolvers } from './generated/graphql-backend';
import { writeToS3 } from '../aws-s3';
import {
    createUser,
    getEvents,
    getEventWithRacesBySlug,
    getUsersEventsWithRaces,
} from '../mysql/queries';
import { createEvent } from '../connector/createEvent';
import { ClaimVerifyResult } from '../cognito/validateJWT';
import { User, Event } from '../mysql/entity';

const userProfile = {
    id: String(1),
    email: 'test1234@example.com',
};

const Query: QueryResolvers = {
    userEvents: async (
        _parent,
        _args,
        context: { user: ClaimVerifyResult },
        _info
    ) => {
        const { user } = context;
        if (!user.isValid) throw new AuthenticationError('Invaild user');
        const events = await getUsersEventsWithRaces(user.userName);
        return events;
    },
    events: async (_parent, _args, _context, _info) => {
        const events = await getEvents();
        return events;
    },
    eventBySlug: async (_parent, args, _context, _info) => {
        const event = await getEventWithRacesBySlug(args.slug);
        if (!event) return null;
        return event;
    },
};

const Mutation: MutationResolvers = {
    createUser: async (
        _parent,
        _args,
        context: { user: ClaimVerifyResult },
        _info
    ) => {
        const { user } = context;
        if (!user.isValid) throw new AuthenticationError('Invaild user');
        const { email, userName } = user;
        const newUser = await createUser({ email, id: userName });
        if (newUser instanceof User) {
            const { email } = newUser;
            return { email };
        }
        throw new UserInputError(JSON.stringify(newUser.errors));
    },
    createEvent: async (
        _parent,
        args,
        context: { user: ClaimVerifyResult },
        _info
    ) => {
        console.log('CREATE EVENT');
        const { user } = context;
        if (!user.isValid) throw new AuthenticationError('Invaild user');
        const { userName } = user;
        const { event } = args;
        const newEvent = await createEvent({ userName, event });
        if (newEvent instanceof Event) {
            const { user, createdAt, updatedAt, ...rest } = newEvent;
            return rest;
        }
        throw new UserInputError(JSON.stringify(newEvent.errors));
    },
};

export default { Query, Mutation, Upload: GraphQLUpload };
