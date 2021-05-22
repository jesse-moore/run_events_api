import { expect } from 'chai';
import { validate, ValidationError } from 'class-validator';
import { Event, User } from './';
import event from '../../../test/event.json';
import user from '../../../test/user.json';

describe('Event Model', function () {
    const newUser = new User(user.email, user.id);
    let newEvent: Event;
    let errors: { [key: string]: ValidationError };
    beforeEach(async function () { 
        newEvent = new Event({
            ...event,
            dateTime: new Date(event.dateTime),
            user: newUser,
        });
        errors = await validateEvent(newEvent);
    });
    it('should create new event model', async function () {
        expect(newEvent).to.be.instanceOf(Event);
    });
    it('should have correct name field', async function () {
        expect(newEvent.name).to.equal(event.name);
        expect(errors.name).to.be.undefined;
    });
    it('should fail to validate name field', async function () {
        newEvent = new Event({ ...event, name: 0 });
        errors = await validateEvent(newEvent);
        expect(errors.name).to.not.be.undefined;

        newEvent = new Event({ ...event, name: undefined });
        errors = await validateEvent(newEvent);
        expect(errors.name).to.not.be.undefined;

        newEvent = new Event({
            ...event,
            name: String('test name').repeat(12),
        });
        errors = await validateEvent(newEvent);
        expect(errors.name).to.not.be.undefined;

        newEvent = new Event({
            ...event,
            name: '',
        });
        errors = await validateEvent(newEvent);
        expect(errors.name).to.not.be.undefined;
    });
    it('should have correct dateTime field', async function () {
        expect(newEvent.dateTime).to.be.instanceOf(Date);
        const date = newEvent.dateTime.toUTCString();
        expect(date).to.equal('Sat, 01 Jan 2022 18:00:00 GMT');
        expect(errors.dateTime).to.be.undefined;
    });
    it('should have correct utcOffset field', async function () {
        expect(newEvent.utcOffset).to.equal(event.utcOffset);
        expect(errors.utcOffset).to.be.undefined;
    });
    it('should have correct address field', async function () {
        expect(newEvent.address).to.equal(event.address);
        expect(errors.address).to.be.undefined;
    });
    it('should have correct city field', async function () {
        expect(newEvent.city).to.equal(event.city);
        expect(errors.city).to.be.undefined; 
    });
    it('should have correct state field', async function () {
        expect(newEvent.state).to.equal(event.state);
        expect(errors.state).to.be.undefined;
    });
    it('should have correct eventDetails field', async function () {
        expect(newEvent.eventDetails).to.equal(event.eventDetails);
        expect(errors.eventDetails).to.be.undefined;
    });
    it('should have correct slug field', async function () {
        expect(newEvent.slug).to.equal(event.slug);
        expect(errors.slug).to.be.undefined;
    });
});

const validateEvent = async (
    event: Event
): Promise<{ [key: string]: ValidationError }> => {
    const errors: { [key: string]: ValidationError } = {};
    const validations = await validate(event);
    validations.forEach((error) => {
        errors[error.property] = error;
    });
    return errors;
};
