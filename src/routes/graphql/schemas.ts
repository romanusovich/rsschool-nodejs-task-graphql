import { Type } from '@fastify/type-provider-typebox';
import * as graphql from 'graphql';
import { UUIDType } from './types/uuid.js';
import { createUserType, userType } from './types/user.js';

export const gqlResponseSchema = Type.Partial(
  Type.Object({
    data: Type.Any(),
    errors: Type.Any(),
  }),
);

export const createGqlResponseSchema = {
  body: Type.Object(
    {
      query: Type.String(),
      variables: Type.Optional(Type.Record(Type.String(), Type.Any())),
    },
    {
      additionalProperties: false,
    },
  ),
};

const queryType = new graphql.GraphQLObjectType({
  name: "Query",
  fields: {
    user: {
      type: userType,
      args: {
        id: { type: UUIDType },
      },
    },
    users: {
      type: new graphql.GraphQLList(userType),
    },
  },
});

// Define the Query type
const mutationType = new graphql.GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: {
      type: userType,
      args: {
        user: { type: createUserType },
      },
    },
    updateUser: {
      type: userType,
      args: {
        id: { type: UUIDType },
        user: { type: createUserType },
      },
    },
    deleteUser: {
      type: UUIDType,
      args: {
        user: { type: UUIDType },
      },
    },
  },
});

export const schema = new graphql.GraphQLSchema({ query: queryType, mutation: mutationType })