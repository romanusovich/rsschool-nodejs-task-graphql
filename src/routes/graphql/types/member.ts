import * as graphql from "graphql";
import { profileType } from "./profile.js";
import { PrismaClient } from '@prisma/client';
import { MemberTypeId } from '../../member-types/schemas.js';

const prisma = new PrismaClient();

export const memberType = new graphql.GraphQLObjectType({
    name: "Member",
    fields: () => ({
        id: { type: MemberId },
        discount: { type: graphql.GraphQLFloat },
        postsLimitPerMonth: { type: graphql.GraphQLInt },
        profiles: {
            type: new graphql.GraphQLList(profileType),
            resolve: (parent) => prisma.profile.findMany({
                where: { memberType: parent }
            }),
        },
    }),
});

export const MemberId = new graphql.GraphQLEnumType({
    name: "MemberTypeId",
    values: {
        [MemberTypeId.BASIC]: { value: MemberTypeId.BASIC },
        [MemberTypeId.BUSINESS]: { value: MemberTypeId.BUSINESS },
    },
})