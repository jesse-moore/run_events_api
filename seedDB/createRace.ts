require('dotenv').config({ path: '.env.local' });
import { getConnection } from '../src/mysql';
import { createRace } from '../src/mysql/queries';
import { Event, User, Race } from '../src/mysql/entity';
import { Connection } from 'typeorm';
import { Route } from '../src/types';

const seedDB = async (_connection: Connection) => {
    // await seedData();
};

// const route: Route = {
//     points: {
//         type: 'FeatureCollection',
//         features: [
//             {
//                 type: 'Feature',
//                 geometry: {
//                     type: 'Point',
//                     coordinates: [-94.11984742305222, 36.18816338537101],
//                 },
//                 properties: {
//                     id: 'n_RAcVBK8EYWOIaNc4dHd',
//                     type: 'Aid Station',
//                     amenities: '',
//                 },
//             },
//         ],
//     },
// };

// const race = {
//     name: '10k',
//     distance: 10000,
//     dateTime: new Date('2022-01-01 12:00:00'),
//     route,
// };

// const seedData = async () => {
//     const userId = '66abccc2-1860-4ece-8f03-08e123b230b6';
//     const eventId = '92547a9e-0034-4155-b7a9-5ff04417adf5';
//     const newRace = await createRace(race, userId, eventId);
//     console.log(newRace);
// };

// const main = async () => {
//     const connection = await getConnection();
//     await seedDB(connection);
//     await connection.close();
// };

// if (require.main === module) {
//     main();
// }
