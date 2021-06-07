require('dotenv').config({ path: '.env.local.production' });
import { getConnection } from '../src/mysql';
import { createUser, createEvent, createRace } from '../src/mysql/queries';
import { Event, User, Race } from '../src/mysql/entity';
import { data } from './seedData.json';
import { Connection } from 'typeorm';

const seedDB = async (_connection: Connection) => {
    await seedData();
};

const seedData = async () => {
    for (const key in data) {
        const user = data[key].user;
        const event = data[key].event;

        const newUser = await createUser(user);
        if (!(newUser instanceof User)) throw new Error('Invalid User');

        const newEvent = await createEvent(
            {
                ...event,
                dateTime: new Date(event.dateTime),
            },
            newUser.id
        );
        if (!(newEvent instanceof Event)) throw new Error('Invalid Event');

        // for (const key in races) {
        //     const race = races[key];
        //     const { route, ...rest } = race;
        //     const _route = route as Route;
        //     const testRace = {
        //         ...rest,
        //         route: {},
        //         dateTime: new Date(race.dateTime),
        //         event: newEvent,
        //         user: newUser,
        //     };
        //     const newRace = new Race(testRace);
        //     if (!(newRace instanceof Race)) throw new Error('Invalid Race');
        // }
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
