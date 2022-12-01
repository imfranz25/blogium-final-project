const fp = require('fastify-plugin');
const fastifySwagger = require('@fastify/swagger');
const fastifySwaggerUi = require('@fastify/swagger-ui');

module.exports = fp(async function (fastify, opts) {
  await fastify.register(fastifySwagger, {
    mode: 'dynamic',
    swagger: {
      info: {
        title: 'Fastify API Demo App',
        description: 'Fastify API Demo with Postgres',
        version: '0.1.0',
      },
      host: 'localhost:3000',
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json'],
    },
  });

  await fastify.register(fastifySwaggerUi, {
    routePrefix: '/documentation',
    initOAuth: {},
    uiConfig: {
      docExpansion: 'full',
      deepLinking: false,
    },
    uiHooks: {
      onRequest: function (request, reply, next) {
        next();
      },
      preHandler: function (request, reply, next) {
        next();
      },
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
  });
});
