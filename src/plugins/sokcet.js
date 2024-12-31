const fp = require('fastify-plugin');
const { listenEvents } = require('../listeners');

module.exports = fp(async function (fastify, opts) {
  const { Server } = require('socket.io');
  const io = new Server(fastify.server, {
    cors: { origin: '*' },
  });

  fastify.decorate('socket', io);

  fastify.ready((err) => {
    if (err) throw err;
    const mainSocket = io.of('/socket');

    mainSocket.on('connection', async (socket) => {
      console.log(`user with socket id: ${socket.id} connected!`);

      await listenEvents(socket);

      socket.on('disconnect', async () => {
        console.log(`${socket.id} disconnected!`);
      });
    });
  });
});
