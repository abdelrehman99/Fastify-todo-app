const taskController = require('../controllers/taskController');
module.exports.listenEvents = async (socket) => {
  socket.on('createTask', async (body) => {
    const response = await taskController.createTask(body);
    socket.emit('createTask', response);
  });

  socket.on('getAllTasks', async (body) => {
    const response = await taskController.getAllTasks();
    socket.emit('getAllTasks', response);
  });

  socket.on('updateTask', async (body) => {
    const response = await taskController.updateTask(body);
    socket.emit('updateTask', response);
  });

  socket.on('deleteTask', async (body) => {
    const response = await taskController.deleteTask(body);
    socket.emit('updateTask', response);
  });
};
