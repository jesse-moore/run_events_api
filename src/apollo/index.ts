import { ApolloServer } from 'apollo-server-express';
import { schema } from '../graphql/schema';
import { validateJWT } from '../cognito';

export const apolloServer = new ApolloServer({
    schema,
    context: async ({ req }) => {
        const token = req.headers.authorization;
        const user = await validateJWT(token);
        return { user };
    },
    uploads: false,
});

