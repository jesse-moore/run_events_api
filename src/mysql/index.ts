import { Connection, getConnectionManager } from 'typeorm';
import { config } from '../config';
import { Event, Race, User } from './entity/';
import { Route } from './entity/Route';

const options = {
    type: 'mysql',
    host: config.DB_HOST,
    port: config.DB_PORT,
    username: config.DB_USERNAME,
    password: config.DB_PASSWORD,
    database: config.DB_DATABASE,
    entities: [User, Event, Race, Route],
    synchronize: true,
    // logging: ['error'],
};

function entitiesChanged(prevEntities: any[], newEntities: any[]): boolean {
    if (prevEntities.length !== newEntities.length) return true;

    for (let i = 0; i < prevEntities.length; i++) {
        if (prevEntities[i] !== newEntities[i]) return true;
    }

    return false;
}

async function updateConnectionEntities(
    connection: Connection,
    entities: any[]
) {
    // @ts-ignore
    if (!entitiesChanged(connection.options.entities, entities)) return;

    // @ts-ignore
    connection.options.entities = entities;

    // @ts-ignore
    connection.buildMetadatas();

    if (connection.options.synchronize) {
        await connection.synchronize();
    }
}

export async function getConnection(name = 'default'): Promise<Connection> {
	const connectionManager = getConnectionManager();
	
    if (connectionManager.has(name)) {
		const connection = connectionManager.get(name);
		
        if (!connection.isConnected) {
			await connection.connect();
        }
		
        if (process.env.NODE_ENV !== 'production') {
			await updateConnectionEntities(connection, [
				User,
                Event,
                Race,
                Route,
            ]);
        }
		
        return connection;
    }
	
    // @ts-ignore
    return await connectionManager.create({ name, ...options }).connect();
}
