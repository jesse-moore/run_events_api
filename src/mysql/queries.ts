import { validate, ValidationError } from 'class-validator';
import { getConnection } from './index';
import { Event, User, Model, Race } from './entity';
import { UpdateRaceInput } from '../graphql/generated/graphql-backend';
import {
    EventDetails,
    EventInput,
    EventInterface,
    ModelValidationErrors,
    Race as RaceType,
    UserInterface,
} from '../types';
import { uuid } from 'aws-sdk/clients/customerprofiles';

const getUserByID = async (id: string) => {
    return await User.findOne({ where: { id } });
};

export const createUser = async (
    user: UserInterface
): Promise<User | { errors: ModelValidationErrors }> => {
    await getConnection();
    const newUser = new User(user.email, user.id);
    const errors = await validateModel(newUser);
    if (errors) return { errors };
    const res = await newUser.save();
    return res;
};

export const createEvent = async (
    event: EventInput,
    user: string
): Promise<Event | { errors: ModelValidationErrors }> => {
    await getConnection();
    const eventUser = await getUserByID(user);
    const newEvent = new Event({ ...event, user: eventUser });

    const errors = await validateModel(newEvent);
    if (errors) return { errors };
    const res = await newEvent.save();
    return res;
};

export const checkSubDomain = async (subDomain: string) => {
    await getConnection();
    const event = await Event.findOne({ where: { slug: subDomain } });
    if (event) return true;
    return false;
};

export const saveEventDetails = async (
    eventDetails: EventDetails,
    userId: string
): Promise<Event | { errors: ModelValidationErrors | string }> => {
    try {
        await getConnection();
        const { id } = eventDetails;
        const event = await Event.findOne({
            where: { id, user: userId },
            relations: ['user'],
        });
        if (!event) return { errors: `Event ${id} not found` };
        event.address = eventDetails.address;
        event.name = eventDetails.name;
        event.city = eventDetails.city;
        event.state = eventDetails.state;
        event.slug = eventDetails.slug;
        event.dateTime = new Date(eventDetails.dateTime);
        const errors = await validateModel(event);
        if (errors) return { errors };
        const res = await event.save();
        return res;
    } catch (error) {
        return error.message;
    }
};

export const saveHeroImg = async (
    heroImg: string,
    id: string,
    userId: string
): Promise<Event | { errors: ModelValidationErrors | string }> => {
    try {
        await getConnection();
        const event = await Event.findOne({
            where: { id, user: userId },
            relations: ['user'],
        });
        if (!event) return { errors: `Event ${id} not found` };
        event.heroImg = heroImg;
        const errors = await validateModel(event);
        if (errors) return { errors };
        const res = await event.save();
        return res;
    } catch (error) {
        return error.message;
    }
};

export const saveEventDescription = async (
    eventDescription: string,
    id: string,
    userId: string
): Promise<Event | { errors: ModelValidationErrors | string }> => {
    try {
        await getConnection();
        const event = await Event.findOne({
            where: { id, user: userId },
            relations: ['user'],
        });
        if (!event) return { errors: `Event ${id} not found` };
        event.eventDetails = eventDescription;
        const errors = await validateModel(event);
        if (errors) return { errors };
        const res = await event.save();
        return res;
    } catch (error) {
        return error.message;
    }
};

export const createRace = async (
    race: RaceType,
    userId: string,
    eventId: string
): Promise<Race | { errors: ModelValidationErrors }> => {
    await getConnection();
    const newRace = new Race({ ...race, user: userId, event: eventId });
    const errors = await validateModel(newRace);
    if (errors) return { errors };
    const res = await newRace.save();
    return res;
};

export const updateRace = async (
    raceUpdates: UpdateRaceInput,
    userId: string,
    raceId: string
): Promise<Race | { errors: ModelValidationErrors }> => {
    await getConnection();
    const { distance, name, route } = raceUpdates;
    const race = await Race.findOne({
        where: { id: raceId, user: userId },
        relations: ['user', 'route', 'event'],
    });
    if (!race) throw new Error(`Race ${raceId} not found`);
    if (distance) race.distance = distance;
    if (name) race.name = name;
    if (route && route.points) race.route.points = route.points;
    if (route && route.route) race.route.route = route.route;
    if (route && route.routeEndMarker)
        race.route.routeEndMarker = route.routeEndMarker;
    if (route && route.routeStartMarker)
        race.route.routeStartMarker = route.routeStartMarker;

    const errors = await validateModel(race);
    if (errors) return { errors };
    const res = await race.save();
    return res;
};

export const deleteRace = async (
    userId: string,
    raceId: string
): Promise<void> => {
    await getConnection();
    const race = await Race.findOne({
        where: { id: raceId, user: userId },
        relations: ['user', 'route'],
    });
    await race?.remove();
    await race?.route.remove();
};

export const deleteEvent = async (
    userId: string,
    eventId: string
): Promise<void> => {
    await getConnection();
    const event = await Event.findOne({
        where: { id: eventId, user: userId },
        relations: ['user', 'races'],
    });
    if (!event) return;

    for await (const race of event.races) {
        await race.remove();
        await race.route.remove();
    }
    await event.remove();
};

export const getEvents = async (): Promise<Event[]> => {
    await getConnection();
    const events = Event.find({
        relations: ['races'],
    });
    return events;
};

export const getEventByID = async (
    id: string,
    userId: string
): Promise<Event | undefined> => {
    await getConnection();
    const event = Event.findOne({
        where: { id, user: userId },
        relations: ['races', 'user'],
    });
    return event;
};

export const getRaceByID = async (
    id: string,
    userId: string
): Promise<Race | undefined> => {
    await getConnection();
    const race = Race.findOne({
        where: { id, user: userId },
        relations: ['user', 'event', 'route'],
    });
    return race;
};

export const getUsersEvents = async (id: uuid): Promise<Event[]> => {
    await getConnection();
    const events = await Event.find({ where: { user: id } });
    return events;
};

export const getUsersEventsWithRaces = async (id: uuid): Promise<Event[]> => {
    await getConnection();
    const events = await Event.find({
        relations: ['races'],
        where: { user: id },
    });
    return events;
};

export const getEventWithRacesBySlug = async (slug: string) => {
    await getConnection();
    const event = await Event.findOne({
        relations: ['races'],
        where: { slug },
    });
    return event;
};

const validateModel = async (
    model: Model
): Promise<ModelValidationErrors | null> => {
    const errors: ModelValidationErrors = {};
    const validations = await validate(model);
    if (!validations.length) return null;
    validations.forEach((error) => {
        errors[error.property] = { ...error.constraints };
    });
    return errors;
};
