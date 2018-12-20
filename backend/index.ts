import { GraphQLServer } from 'graphql-yoga';
import { prisma, Prisma } from './generated/prisma-client';

const resolvers = {
  Query: {
    contests(root, args, context: { prisma: Prisma }) {
      return context.prisma.contests();
    },
    contest(root, args, context: { prisma: Prisma }) {
      return context.prisma.contest({ id: args.contestId });
    },
  },
  Mutation: {
    createContest(root, args, context: { prisma: Prisma }) {
      return context.prisma.createContest({
        name: args.name,
      });
    },
    // addProjectsToContest(root, args, context: {prisma: Prisma}) {
    //   return context.prisma.upda;
    // },
    createUser(root, args, context: { prisma: Prisma }) {
      return context.prisma.createUser({ name: args.name });
    },
  },
};

const server = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers,
  context: {
    prisma,
  },
});

// tslint:disable-next-line:no-console
server.start(() => console.log('Server is running on http://localhost:4000'));
