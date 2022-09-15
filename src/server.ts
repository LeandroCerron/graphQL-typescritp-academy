import express from 'express';
import compression from 'compression';
import cors from 'cors';
import { createServer } from 'http';
import { ApolloServer } from 'apollo-server-express';
import schema from './schema';
import expressPlayGround from 'graphql-playground-middleware-express';
const main = async()=>{
    try {
        const app = express();

        app.use(cors());
        app.use(compression());
        
        const server = new ApolloServer({
            schema,
            introspection: true
        });
        await server.start();
        server.applyMiddleware({app});
        app.get('/', expressPlayGround({
            endpoint: '/graphql'
        }));
        
        console.clear();
        const port = process.env.PORT || 3000;
        const httpServer = createServer(app);
        httpServer.listen(port, () => {
            console.log(`http://localhost:${port}`);
        });
    
    } catch (err) {
        console.log(err);
    }
};
main();
