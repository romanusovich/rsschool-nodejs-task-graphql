import * as graphql from "graphql";
import { UUIDType } from "./uuid.js";

export const postType = new graphql.GraphQLObjectType({
    name: "Post",
    fields: {
        id: { type: UUIDType },
        title: { type: graphql.GraphQLString },
        content: { type: graphql.GraphQLString },
    },
});