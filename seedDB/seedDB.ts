require('dotenv').config({ path: '.env.local' });
import { getConnection } from '../src/mysql';
import { clearDB } from './clearDB';
import { createUser, createEvent, createRace } from '../src/mysql/queries';
import { Event, User, Race } from '../src/mysql/entity';
import { data } from './seedData.json';
import { Connection } from 'typeorm';

const seedDB = async (connection: Connection) => {
    await clearDB(connection);
    await seedData();
};

const seedData = async () => {
    for (const key in data) {
        const user = data[key].user;
        const event = data[key].event;
        const races = data[key].races;

        const newUser = await createUser(user);
        if (!(newUser instanceof User)) throw new Error('Invalid User');

        const newEvent = await createEvent(
            {
                ...event,
                dateTime: new Date(event.dateTime),
            },
            newUser
        );
        if (!(newEvent instanceof Event)) throw new Error('Invalid Event');

        for (const key in races) {
            const race = races[key];
            const newRace = await createRace({
                ...race,
                dateTime: new Date(race.dateTime),
                user: newUser,
                event: newEvent,
            });
            if (!(newRace instanceof Race)) throw new Error('Invalid Race');
        }
    }
};

const main = async () => {
    const connection = await getConnection();
    await seedDB(connection);
    await connection.close();
};

if (require.main === module) {
    main();
}
