import { ApolloError, AuthenticationError } from 'apollo-server-errors';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { QueryResolvers, MutationResolvers } from './generated/graphql-backend';
import { writeToS3 } from '../aws-s3';
import { getUser } from '../mysql/queries';
// import { createUser, getUser } from '../mysql/queries';

const userProfile = {
    id: String(1),
    email: 'test1234@example.com',
};

const Query: QueryResolvers = {
    user: async (_parent, _args, _context, _info) => {
        // console.log(_context)
        // console.log(_args)
        // const result = await getUser()
        const user = await getUser();
        // console.log(process.env.DB_DATABASE)
        // const user = userProfile;
        return user;
    },
    userEvents: async (_parent, _args, _context, _info) => {
        // console.log(_context);
        return [];
    },
};

const Mutation: MutationResolvers = {
    createUser(_parent, _args, context, _info) {
        const { user } = context;
        if (!user.isValid) throw new AuthenticationError('Invaild user');
        const { email, userName }: { email: string; userName: string } = user;
        // const newUserEmail = createUser(email, userName);
        // return newUserEmail;
        return null;
    },
    createEvent: async (_parent, args, context, _info) => {
        const { user } = context;
        if (!user.isValid) throw new AuthenticationError('Invaild user');
        const { userName }: { userName: string } = user;
        const { event } = args;
        if (event) {
            const heroImg: Promise<FileUpload> = event.heroImg;
            if (heroImg) {
                // const { createReadStream, mimetype, filename } = await heroImg;
                // const fileStream = createReadStream();
                // const data = await writeToS3({
                //     fileStream,
                //     mimetype,
                //     filename,
                // });
                // console.log(data);
            }
        }
        return null;
    },
};

export default { Query, Mutation, Upload: GraphQLUpload };
