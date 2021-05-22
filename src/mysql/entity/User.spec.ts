import { expect } from 'chai';
import { User } from './';
import user from '../../../test/user.json';

describe('User Model', function () {
    let newUser: User;
    beforeEach(function () {
        const { email, id } = user;
        newUser = new User(email, id);
    });
    it('should create new user model', async function () {
        expect(newUser).to.be.instanceOf(User);
    });
    it('should have correct email field', async function () {
        expect(newUser.email).to.equal(user.email);
    });
    it('should have correct id field', async function () {
        expect(newUser.id).to.equal(user.id);
    });
});
