'use strict';

module.exports = async function (fastify, opts) {
  fastify.get(
    '/',
    {
      schema: {
        description: 'This is an endpoint for application healthcheck',
        tags: ['health'],
        response: {
          200: {
            description: 'Success Response',
            type: 'object',
            properties: {
              msg: { type: 'string' },
            },
          },
        },
      },
    },
    (_request, reply) => {
      reply.send({ msg: 'The application is up and running' });
    }
  );
};
