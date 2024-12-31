const fastify = require('fastify')();
const postgres = require('@fastify/postgres');

const dbConnection = async () => {
  fastify.register(postgres, {
    connectionString: process.env.DATABASE_URL,
  });
};

module.exports = dbConnection;
