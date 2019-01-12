import { formatError } from 'apollo-errors';
import { GraphQLServer, Options } from 'graphql-yoga';
import { checkUser } from './services/auth';
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
const options: Options = {
  formatError,
};

const server = new GraphQLServer({
  typeDefs: 'src/schema.graphql',
  resolvers: {
    Query,
    Mutation
  },
  context: request => ({
    request,
  }),
  middlewares: [checkUser],
});

server.start(options, () =>
  // tslint:disable-next-line:no-console
  console.log('Server is running on http://localhost:4000'),
);
