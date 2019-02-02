import { formatError } from 'apollo-errors';
import { GraphQLServer, Options } from 'graphql-yoga';
import Mutation from './resolvers/Mutation';
import Query from './resolvers/Query';
import { checkUser } from './services/auth';
import bodyParser = require('body-parser');
import { initAssets } from './services/file';
import * as express from 'express';
const options: Options = {
  formatError
};

const server = new GraphQLServer({
  typeDefs: 'src/schema.graphql',
  resolvers: {
    Query,
    Mutation
  },
  context: request => ({
    request
  }),
  middlewares: [checkUser]
});

server.express.use(bodyParser.json({ limit: '50mb' }));
server.express.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

initAssets(() => {
  server.express.use('/pdfs', express.static('assets'));
  server.start(options, () =>
    // tslint:disable-next-line:no-console
    console.log('Server is running on http://localhost:4000')
  );
});
