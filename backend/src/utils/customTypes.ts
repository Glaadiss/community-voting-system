import { ContextParameters } from 'graphql-yoga/dist/types';

export interface Context {
  request: ContextParameters;
  user?: { id: string, name: string; email: string; role: string, postalCode: string, pesel: string };
}

export enum ROLE {
  USER = 'user',
  OPERATOR = 'operator',
  ADMIN = 'admin',
}
