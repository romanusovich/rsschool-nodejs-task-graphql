import * as graphql from "graphql";
import { UUIDType } from "./uuid.js";

export const profileType = new graphql.GraphQLObjectType({
    name: "Profile",
    fields: {
        id: { type: UUIDType },
        isMale: { type: graphql.GraphQLBoolean },
        yearOfBirth: { type: graphql.GraphQLInt },
    },
});