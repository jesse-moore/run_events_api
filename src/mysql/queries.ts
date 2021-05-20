import { getConnection } from './index';
import { User } from './entity/User';
import { Event } from './entity/Event';

export const getUser = async () => {
    const connection = await getConnection();
    const userRepo = connection.getRepository(User);
    // const eventRepo = connection.getRepository(Event);
    const user = await userRepo.findOne('6f5066b8-b18f-4c17-8d99-1942783fabd9');
    // if (user) {
    //     const newEvent = Event.create({
    //         name: 'Event 2',
    //         slug: 'event-2',
    //         user,
    //     });
    //     await newEvent.save();
    // }
    // const newUser = new User('test3@example.com');
    // const user = await newUser.save();
    // await connection.manager.save(user);
    // console.log('STATUS: ' + db.isConnected);
    // console.log(newUser);
    const events = await Event.find({
        where: { user: '6f5066b8-b18f-4c17-8d99-1942783fabd9' },
    });
    // console.log(events);
    return user || null;
    // const res = await UserModel.findOne({ where: { id: '1' } });
    // const user = res ? res : null;
    // return user;
};

export const createUser = async (
    email: string,
    id: string
): Promise<string> => {
    await getConnection();
    const newUser = new User(email, id);
    const res = await newUser.save();
    return res.email;
};

// createConnection().then(async connection => {

//     console.log("Inserting a new user into the database...");
//     const user = new User();
//     user.firstName = "Timber";
//     user.lastName = "Saw";
//     user.age = 25;
//     await connection.manager.save(user);
//     console.log("Saved a new user with id: " + user.id);

//     console.log("Loading users from the database...");
//     const users = await connection.manager.find(User);
//     console.log("Loaded users: ", users);

//     console.log("Here you can setup and run express/koa/any other framework.");

// }).catch(error => console.log(error));
