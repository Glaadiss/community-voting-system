import { Prisma } from 'prisma-binding';

const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: 'http://35.246.149.86',
  secret: 'thisismysupersecrettext'
});

export { prisma, Prisma };
