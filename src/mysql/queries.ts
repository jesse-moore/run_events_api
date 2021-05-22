import { validate, ValidationError } from 'class-validator';
import { getConnection } from './index';
import { Event, User, Model, Race } from './entity';
import {
    EventInput,
    EventInterface,
    ModelValidationErrors,
    RaceInterface,
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
    user: User | string
): Promise<Event | { errors: ModelValidationErrors }> => {
    await getConnection();
    let newEvent: Event;
    if (user instanceof User) {
        newEvent = new Event({ ...event, user });
    } else {
        const eventUser = await getUserByID(user);
        newEvent = new Event({ ...event, user: eventUser });
    }
    const errors = await validateModel(newEvent);
    if (errors) return { errors };
    const res = await newEvent.save();
    return res;
};

export const createRace = async (
    race: RaceInterface
): Promise<Race | { errors: ModelValidationErrors }> => {
    await getConnection();
    const newEvent = new Race(race);
    const errors = await validateModel(newEvent);
    if (errors) return { errors };
    const res = await newEvent.save();
    return res;
};

export const getEvents = async (): Promise<Event[]> => {
    await getConnection();
    const events = Event.find();
    return events;
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
