import * as graphql from "graphql";
import { UUIDType } from "./uuid.js";

export const memberType = new graphql.GraphQLObjectType({
    name: "Member",
    fields: {
        id: { type: UUIDType },
        discount: { type: graphql.GraphQLFloat },
        postsLimitPerMonth: { type: graphql.GraphQLInt },
    },
});