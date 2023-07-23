import * as graphql from "graphql";
import { UUIDType } from "./uuid.js";

export const userType = new graphql.GraphQLObjectType({
    name: "User",
    fields: {
        id: { type: UUIDType },
        name: { type: graphql.GraphQLString },
        balance: { type: graphql.GraphQLFloat },
    },
});

export const createUserType = new graphql.GraphQLInputObjectType({
    name: "CreateUser",
    fields: {
        name: { type: graphql.GraphQLString },
        balance: { type: graphql.GraphQLFloat },
    },
});