import { formatError } from 'apollo-errors';
import { GraphQLServer, Options } from 'graphql-yoga';
import { ContextParameters } from 'graphql-yoga/dist/types';
import {
  allowAdmin,
  allowUser,
  checkUser,
  createUser,
  login,
} from './services/auth';

const options: Options = {
  formatError,
};

export interface Context {
  request: ContextParameters;
  user?: { name: string; email: string; role: string };
}

const resolvers = {
  Query: {
    contests(_, {}, context: Context, info) {
      return allowUser(context).contests();
    },
    contest(_, { contestId }, context) {
      return allowUser(context).contest({ id: contestId });
    },
    users(_, args, context: Context) {
      return allowAdmin(context).users();
    },
  },
  Mutation: {
    createContest(_, { name }, context: Context) {
      return allowAdmin(context).createContest({
        name,
      });
    },
    createUser,
    login,
  },
};

const server = new GraphQLServer({
  typeDefs: 'src/schema.graphql',
  resolvers,
  context: request => ({
    request,
  }),
  middlewares: [checkUser],
});

server.start(options, () =>
  // tslint:disable-next-line:no-console
  console.log('Server is running on http://localhost:4000'),
);
