import * as graphql from "graphql";
import { UUIDType } from "./uuid.js";
import { userType } from "./user.js";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const postType = new graphql.GraphQLObjectType({
    name: "Post",
    fields: () => ({
        id: { type: UUIDType },
        title: { type: graphql.GraphQLString },
        content: { type: graphql.GraphQLString },
        authorId: { type: graphql.GraphQLString },
        author: { 
            type: userType,
            resolve: (parent) => prisma.user.findFirst({
                where: { id: parent.author.id }
            }),  
        },
    }),
});

export const CreatePostInput = new graphql.GraphQLInputObjectType({
    name: "CreatePostInput",
    fields: () => ({
        title: { type: graphql.GraphQLString },
        content: { type: graphql.GraphQLString },
        authorId: { type: graphql.GraphQLString },
    }),
});

export const ChangePostInput = new graphql.GraphQLInputObjectType({
    name: "ChangePostInput",
    fields: () => ({
        title: { type: graphql.GraphQLString },
        content: { type: graphql.GraphQLString },
        authorId: { type: graphql.GraphQLString },
    }),
});