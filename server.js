require('dotenv').config();
const path = require('path');
const fastify = require('fastify')({
  logger: true,
});
const cors = require('@fastify/cors');
const autoLoad = require('@fastify/autoload');
const redis = require('@fastify/redis');

// fastify.register(dbConnector);
fastify.register(cors, {
  origin: '*',
  methods: '*',
  allowedHeaders: ['Content-Type', 'Authorization'],
});

fastify.register(autoLoad, {
  dir: path.join(__dirname, 'src', 'plugins'),
});

fastify.get('/', async (request, reply) => {
  return { hello: 'world' };
});

/**
 * Run the server!
 */
const start = async () => {
  try {
    await fastify.listen({ port: process.env.PORT });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
