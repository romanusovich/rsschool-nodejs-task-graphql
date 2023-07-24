import { Type } from '@fastify/type-provider-typebox';
import * as graphql from 'graphql';
import { UUIDType } from './types/uuid.js';
import { createUserType, userType } from './types/user.js';
import { postType } from './types/post.js';
import { profileType } from './types/profile.js';
import { MemberId, memberType } from './types/member.js';

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
    // USER
    user: {
      type: userType,
      args: {
        id: { type: UUIDType },
      },
    },
    users: {
      type: new graphql.GraphQLList(userType),
    },
    // MEMBER
    memberType: {
      type: memberType,
      args: {
        id: { type: MemberId },
      },
    },
    memberTypes: {
      type: new graphql.GraphQLList(memberType),
    },
    // POST
    post: {
      type: postType,
      args: {
        id: { type: UUIDType },
      },
    },
    posts: {
      type: new graphql.GraphQLList(postType),
    },
    // PROFILE
    profile: {
      type: profileType,
      args: {
        id: { type: UUIDType },
      },
    },
    profiles: {
      type: new graphql.GraphQLList(profileType),
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