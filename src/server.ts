import express from 'express';
import { graphqlUploadExpress } from 'graphql-upload';
import { apolloServer } from './apollo';
import { config } from './config';

async function startApolloServer() {
    await apolloServer.start();

    const app = express();
    app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));
    apolloServer.applyMiddleware({ app });

    app.listen({ port: config.SERVER_PORT });
    console.log(
        `🚀 Server ready at http://localhost:${config.SERVER_PORT}${apolloServer.graphqlPath}`
    );
    return { apolloServer, app };
}

startApolloServer();
