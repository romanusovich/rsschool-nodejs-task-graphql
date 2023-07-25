import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema, schema } from './schemas.js';
import { graphql, parse, validate } from 'graphql';
import { rootValue } from './resolvers.js';
import depthLimit from 'graphql-depth-limit';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const valid = validate(schema, parse(req.body.query), [depthLimit(5)])
      if (valid.length > 0) return { errors: valid };
      const response = graphql({
        schema,
        source: req.body.query,
        rootValue,
        variableValues: req.body.variables,
      });
      return response;
    },
  });
};

export default plugin;
