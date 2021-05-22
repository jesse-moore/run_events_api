require('dotenv').config({ path: '.env.local' });
import { Connection } from 'typeorm';
import { getConnection } from '../src/mysql';
import { Event, User, Race } from '../src/mysql/entity';

export const clearDB = async (connection: Connection) => {
    await connection.getRepository(Race).delete({});
    await connection.getRepository(Event).delete({});
    await connection.getRepository(User).delete({});
};

const main = async () => {
    const connection = await getConnection();
    await clearDB(connection);
    await connection.close();
};

if (require.main === module) {
    main();
}
