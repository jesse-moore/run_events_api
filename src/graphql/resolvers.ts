import {
    UserInputError,
    AuthenticationError,
    ApolloError,
} from 'apollo-server-errors';
import isValidDomain from 'is-valid-domain';
import { GraphQLUpload } from 'graphql-upload';
import { QueryResolvers, MutationResolvers } from './generated/graphql-backend';
import { uploadImage } from '../aws-s3';
import {
	checkSubDomain,
    createEvent,
    createRace,
    createUser,
    deleteEvent,
    deleteRace,
    getEventByID,
    getEvents,
    getEventWithRacesBySlug,
    getRaceByID,
    getUsersEventsWithRaces,
    saveEventDescription,
    saveEventDetails,
    saveHeroImg,
    updateRace,
} from '../mysql/queries';
import { ClaimVerifyResult } from '../cognito/validateJWT';
import { User, Event, Race } from '../mysql/entity';

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
    userEventByID: async (
        _parent,
        args,
        context: { user: ClaimVerifyResult },
        _info
    ) => {
        const { user } = context;
        if (!user.isValid) throw new AuthenticationError('Invaild user');
        const event = await getEventByID(args.id, user.userName);
        return event || null;
    },
    userRaceByID: async (
        _parent,
        args,
        context: { user: ClaimVerifyResult },
        _info
    ) => {
        const { user } = context;
        if (!user.isValid) throw new AuthenticationError('Invaild user');
        const race = await getRaceByID(args.id, user.userName);
        return race || null;
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
    checkSubdomain: async (_parent, args, _context, _info) => {
        return await checkSubDomain(args.subdomain);
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
        const { user } = context;
        if (!user.isValid) throw new AuthenticationError('Invaild user');
        const { userName } = user;
        const { event } = args;
        let imageURL = '';
		
        try {
            if (event.heroImg) {
                const imageRes = await uploadImage(event.heroImg);
                if (!imageRes) throw new Error();
                imageURL = imageRes;
            }
            const isValidSubdomain = isValidDomain(`${event.slug}.site`, {
                subdomain: false,
            });
            if (!isValidSubdomain) {
                throw new UserInputError(`Invalid subdomain ${event.slug}`);
            }
            const newEvent = {
                ...event,
                heroImg: imageURL,
                dateTime: new Date(event.dateTime),
            };
            const res = await createEvent(newEvent, userName);
            if (res instanceof Event) {
                const { user, createdAt, updatedAt, ...rest } = res;
                return rest;
            }
        } catch (error) {
            throw new UserInputError('Error creating event');
        }
        throw new UserInputError('Error creating event');
    },
    createRace: async (
        _parent,
        args,
        context: { user: ClaimVerifyResult },
        _info
    ) => {
        const { user } = context;
        if (!user.isValid) throw new AuthenticationError('Invaild user');
        const { userName } = user;
        const { eventId, race } = args;
        const newRace = await createRace(race, userName, eventId);
        if (newRace instanceof Race) {
            const { user, createdAt, updatedAt, ...rest } = newRace;
            return rest;
        }
        throw new UserInputError(JSON.stringify(newRace.errors));
    },
    updateRace: async (
        _parent,
        args,
        context: { user: ClaimVerifyResult },
        _info
    ) => {
        const { user } = context;
        if (!user.isValid) throw new AuthenticationError('Invaild user');
        const { userName } = user;
        const { raceId, raceUpdates } = args;
        const newRace = await updateRace(raceUpdates, userName, raceId);
        if (newRace instanceof Race) {
            const { user, createdAt, updatedAt, ...rest } = newRace;
            return rest;
        }
        throw new UserInputError(JSON.stringify(newRace.errors));
    },
    deleteEvent: async (
        _parent,
        args,
        context: { user: ClaimVerifyResult },
        _info
    ) => {
        const { user } = context;
        if (!user.isValid) throw new AuthenticationError('Invaild user');
        const { userName } = user;
        const { eventId } = args;
        try {
            await deleteEvent(userName, eventId);
            return eventId;
        } catch (error) {
            console.log(error);
            throw new UserInputError('Invalid user or race id');
        }
    },
    deleteRace: async (
        _parent,
        args,
        context: { user: ClaimVerifyResult },
        _info
    ) => {
        const { user } = context;
        if (!user.isValid) throw new AuthenticationError('Invaild user');
        const { userName } = user;
        const { raceId } = args;
        try {
            await deleteRace(userName, raceId);
            return raceId;
        } catch (error) {
            console.log(error);
            throw new UserInputError('Invalid user or race id');
        }
    },
    saveHeroImg: async (
        _parent,
        args,
        context: { user: ClaimVerifyResult },
        _info
    ) => {
        const { user } = context;
        if (!user.isValid) throw new AuthenticationError('Invaild user');
        const { userName } = user;
        const { file, id } = args;
        let imageURL = '';
        try {
            const res = await uploadImage(file);
            if (!res) throw new Error();
            imageURL = res;
        } catch (error) {
            throw new ApolloError('Failed to save image');
        }
        const event = await saveHeroImg(imageURL, id, userName);
        if (event instanceof Event) {
            const { user, createdAt, updatedAt, ...rest } = event;
            return rest;
        }
        throw new UserInputError(JSON.stringify(event.errors));
    },
    saveEventDetails: async (
        _parent,
        args,
        context: { user: ClaimVerifyResult },
        _info
    ) => {
        const { user } = context;
        if (!user.isValid) throw new AuthenticationError('Invaild user');
        const { userName } = user;
        const { eventDetails } = args;
        const event = await saveEventDetails(eventDetails, userName);
        if (event instanceof Event) {
            const { user, createdAt, updatedAt, ...rest } = event;
            return rest;
        }
        throw new UserInputError(JSON.stringify(event.errors));
    },
    saveEventDescription: async (
        _parent,
        args,
        context: { user: ClaimVerifyResult },
        _info
    ) => {
        const { user } = context;
        if (!user.isValid) throw new AuthenticationError('Invaild user');
        const { userName } = user;
        const { eventDescription, id } = args;
        const event = await saveEventDescription(
            eventDescription,
            id,
            userName
        );
        if (event instanceof Event) {
            const { user, createdAt, updatedAt, ...rest } = event;
            return rest;
        }
        throw new UserInputError(JSON.stringify(event.errors));
    },
};

export default { Query, Mutation, Upload: GraphQLUpload };
