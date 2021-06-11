import { expect } from 'chai';
import { validate, ValidationError } from 'class-validator';
import { Connection } from 'typeorm';
import { getConnection } from './';
import { Event, User, Model, Race } from './entity';
import {
    createEvent,
    createUser,
    createRace,
    getUsersEvents,
    getUsersEventsWithRaces,
    getEventWithRacesBySlug,
    getEvents,
    checkSubDomain,
} from './queries';
import event from '../../test/event.json';
import race from '../../test/race.json';
import user from '../../test/user.json';
import { Route } from '../types';

describe('mysql queries', function () {
    let connection: Connection;
    before(async function () {
        connection = await getConnection();
    });
    beforeEach(async function () {
        await connection.getRepository(Race).delete({});
        await connection.getRepository(Event).delete({});
        await connection.getRepository(User).delete({});
    });

    it('should create a user', async function () {
        const { email, id } = user;
        const res = await createUser({ email, id });
        if (res instanceof Model) {
            expect(res.email).to.equal(user.email);
            expect(res.id).to.equal(user.id);
        } else {
            throw new Error();
        }
    });
    it('should create an event', async function () {
        const { email, id } = user;
        const newUser = await createUser({ email, id });
        if (!(newUser instanceof Model)) throw new Error();
        const testEvent = {
            ...event,
            dateTime: new Date(event.dateTime),
            user: newUser,
        };
        const newEvent = await createEvent(testEvent, newUser.id);
        if (!(newEvent instanceof Model)) throw new Error();

        expect(newEvent.slug).to.equal(newEvent.slug);
        expect(newEvent.name).to.equal(newEvent.name);
        expect(newEvent.heroImg).to.equal(newEvent.heroImg);
        expect(newEvent.address).to.equal(newEvent.address);
        expect(newEvent.city).to.equal(newEvent.city);
        expect(newEvent.state).to.equal(newEvent.state);
        expect(newEvent.eventDetails).to.equal(newEvent.eventDetails);
        expect(newEvent.user).to.deep.equal(newUser);
        expect(newEvent.dateTime).to.deep.equal(new Date(event.dateTime));
    });
    it('should check subDomain', async function () {
        const { email, id } = user;
        const newUser = await createUser({ email, id });
        if (!(newUser instanceof Model)) throw new Error();
        const testEvent = {
            ...event,
            dateTime: new Date(event.dateTime),
            user: newUser,
        };
        await createEvent(testEvent, newUser.id);
        const existingSubDomain = await checkSubDomain(testEvent.slug);
        const nonExistingSubDomain = await checkSubDomain("test");
		expect(existingSubDomain).to.be.true
		expect(nonExistingSubDomain).to.be.false
    });
    it('should create a race', async function () {
        // const { email, id } = user;
        // const newUser = await createUser({ email, id });
        // if (!(newUser instanceof Model)) throw new Error();
        // const testEvent = {
        //     ...event,
        //     dateTime: new Date(event.dateTime),
        //     user: newUser,
        // };
        // const newEvent = await createEvent(testEvent, newUser);
        // if (!(newEvent instanceof Model)) throw new Error();
        // const { route, ...rest } = race;
        // const _route = route as Route;
        // const testRace = {
        //     ...rest,
        //     route: _route,
        //     dateTime: new Date(race.dateTime),
        //     event: newEvent,
        //     user: newUser,
        // };
        // const newRace = await createRace(testRace);
        // if (!(newRace instanceof Model)) throw new Error();
        // expect(newRace.event).to.deep.equal(newEvent);
        // expect(newRace.user).to.deep.equal(newUser);
        // expect(newRace.type).to.equal(race.type);
        // expect(newRace.distance).to.equal(race.distance);
        // expect(newRace.dateTime).to.deep.equal(new Date(race.dateTime));
    });
    it('should return an array of events', async function () {
        // const { email, id } = user;
        // const newUser = await createUser({ email, id });
        // if (!(newUser instanceof Model)) throw new Error();
        // const testEvent = {
        //     ...event,
        //     dateTime: new Date(event.dateTime),
        //     user: newUser,
        // };
        // const newEvent = await createEvent(testEvent, newUser);
        // if (!(newEvent instanceof Model)) throw new Error();
        // const testEvent2 = {
        //     ...testEvent,
        //     slug: 'test-event-2',
        // };
        // const newEvent2 = await createEvent(testEvent2, newUser);
        // if (!(newEvent2 instanceof Model)) throw new Error();
        // const events = await getUsersEvents(id);
        // expect(Array.isArray(events)).to.be.true;
        // expect(events).to.have.lengthOf(2);
        // expect(events[0]).to.be.instanceOf(Event);
        // expect(events[1]).to.be.instanceOf(Event);
    });
    it('should return an array of events with races', async function () {
        // const { email, id } = user;
        // const newUser = await createUser({ email, id });
        // if (!(newUser instanceof Model)) throw new Error();
        // const testEvent = {
        //     ...event,
        //     dateTime: new Date(event.dateTime),
        //     user: newUser,
        // };
        // const newEvent = await createEvent(testEvent, newUser);
        // if (!(newEvent instanceof Model)) throw new Error();
        // const { route, ...rest } = race;
        // const _route = route as Route;
        // const testRace = {
        //     ...rest,
        //     route: _route,
        //     dateTime: new Date(race.dateTime),
        //     event: newEvent,
        //     user: newUser,
        // };
        // const newRace = await createRace(testRace);
        // if (!(newRace instanceof Model)) throw new Error();
        // const events = await getUsersEventsWithRaces(id);
        // expect(Array.isArray(events[0].races)).to.be.true;
        // expect(events[0].races).to.have.lengthOf(1);
        // expect(events[0].races[0]).to.be.instanceOf(Race);
    });

    it('should retrun an event with races', async function () {
        // const { email, id } = user;
        // const newUser = await createUser({ email, id });
        // if (!(newUser instanceof Model)) throw new Error();
        // const testEvent = {
        //     ...event,
        //     dateTime: new Date(event.dateTime),
        //     user: newUser,
        // };
        // const newEvent = await createEvent(testEvent, newUser);
        // if (!(newEvent instanceof Model)) throw new Error();
        // const { route, ...rest } = race;
        // const _route = route as Route;
        // const testRace = {
        //     ...rest,
        //     route: _route,
        //     dateTime: new Date(race.dateTime),
        //     event: newEvent,
        //     user: newUser,
        // };
        // const newRace = await createRace(testRace);
        // if (!(newRace instanceof Model)) throw new Error();
        // const eventRes = await getEventWithRacesBySlug(newEvent.slug);
        // if (!(eventRes instanceof Model)) throw new Error();
        // expect(Array.isArray(eventRes.races)).to.be.true;
        // expect(eventRes.races).to.have.lengthOf(1);
        // expect(eventRes.races[0]).to.be.instanceOf(Race);
    });
    it('should return an array of events', async function () {
        // const { email, id } = user;
        // const newUser = await createUser({ email, id });
        // if (!(newUser instanceof Model)) throw new Error();
        // const testEvent = {
        //     ...event,
        //     dateTime: new Date(event.dateTime),
        //     user: newUser,
        // };
        // const newEvent = await createEvent(testEvent, newUser);
        // if (!(newEvent instanceof Model)) throw new Error();
        // const testEvent2 = {
        //     ...testEvent,
        //     slug: 'test-event-2',
        // };
        // const newEvent2 = await createEvent(testEvent2, newUser);
        // if (!(newEvent2 instanceof Model)) throw new Error();
        // const events = await getEvents();
        // expect(Array.isArray(events)).to.be.true;
        // expect(events).to.have.lengthOf(2);
        // expect(events[0]).to.be.instanceOf(Event);
        // expect(events[1]).to.be.instanceOf(Event);
    });
});
