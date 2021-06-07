import { expect } from 'chai';
import { validate, ValidationError } from 'class-validator';
import { Event, User, Race } from './';
import event from '../../../test/event.json';
import race from '../../../test/race.json';
import user from '../../../test/user.json';

describe('Race Model', function () {
    const newUser = new User(user.email, user.id);
    const newEvent = new Event(event);
    let newRace: Race;
    let errors: { [key: string]: ValidationError };

    beforeEach(async function () {
        newRace = new Race({
            ...race,
            // dateTime: new Date(race.dateTime),
            user: newUser,
            event: newEvent,
        });
    });

    it('should create new race model', async function () {
        expect(newRace).to.be.instanceOf(Race);
    });
    it('should have correct type field', async function () {
        // expect(newRace.name).to.equal(race.type);
        // expect(errors.name).to.be.undefined;
    });
    it('should have correct dateTime field', async function () {
        // expect(newRace.dateTime).to.be.instanceOf(Date);
        // const date = newRace.dateTime.toUTCString();
        // expect(date).to.equal('Sat, 01 Jan 2022 18:00:00 GMT');
        // expect(errors.dateTime).to.be.undefined;
    });
    it('should have correct distance field', async function () {
        expect(newRace.distance).to.equal(race.distance);
        // expect(errors.utcOffset).to.be.undefined;
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
