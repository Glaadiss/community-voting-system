import { ContextParameters } from 'graphql-yoga/dist/types';

export interface Context {
  request: ContextParameters;
  user?: { name: string; email: string; role: string };
}

export enum ROLE {
  USER = 'user',
  OPERATOR = 'operator',
  ADMIN = 'admin',
}
