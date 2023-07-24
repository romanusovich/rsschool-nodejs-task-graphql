import * as graphql from "graphql";
import { UUIDType } from "./uuid.js";
import { userType } from "./user.js";
import { memberType } from "./member.js";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const profileType = new graphql.GraphQLObjectType({
    name: "Profile",
    fields: () => ({
        id: { type: UUIDType },
        isMale: { type: graphql.GraphQLBoolean },
        yearOfBirth: { type: graphql.GraphQLInt },
        userId: { type: graphql.GraphQLString },
        user: { 
            type: userType,
            resolve: (parent) => prisma.user.findFirst({
                where: { profile: parent }
            }),  
        },
        memberTypeId: { type: graphql.GraphQLString },
        memberType: { 
            type: memberType,
            resolve: (parent) => prisma.memberType.findFirst({
                where: { id: parent.memberTypeId }
            }),  
        },
    }),
});