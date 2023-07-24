import * as graphql from "graphql";
import { UUIDType } from "./uuid.js";
import { profileType } from "./profile.js";
import { postType } from "./post.js";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const userType = new graphql.GraphQLObjectType({
    name: "User",
    fields: () => ({
        id: { type: UUIDType },
        name: { type: graphql.GraphQLString },
        balance: { type: graphql.GraphQLFloat },
        profile: {
            type: profileType,
            resolve: (parent) => prisma.profile.findFirst({
                where: { user: parent }
            }),
        },
        posts: {
            type: new graphql.GraphQLList(postType),
            resolve: (parent) => prisma.post.findMany({
                where: { author: parent }
            }),
        },
        userSubscribedTo: {
            type: new graphql.GraphQLList(userType),
            resolve: (parent) => prisma.user.findMany({
                where: {
                    subscribedToUser: {
                        some: {
                            subscriberId: parent.id,
                        },
                    },
                },
            }),
        },
        subscribedToUser: {
            type: new graphql.GraphQLList(userType),
            resolve: (parent) => prisma.user.findMany({
                where: {
                    userSubscribedTo: {
                        some: {
                            authorId: parent.id,
                        },
                    },
                },
            }),
        },
    }),
});

export const CreateUserInput = new graphql.GraphQLInputObjectType({
    name: "CreateUserInput",
    fields: {
        name: { type: graphql.GraphQLString },
        balance: { type: graphql.GraphQLFloat },
    },
});

export const ChangeUserInput = new graphql.GraphQLInputObjectType({
    name: "ChangeUserInput",
    fields: {
        name: { type: graphql.GraphQLString },
        balance: { type: graphql.GraphQLFloat },
    },
});