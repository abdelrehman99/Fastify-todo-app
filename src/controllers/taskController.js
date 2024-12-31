const fastify = require('fastify')();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  createTask: async (body) => {
    try {
      const { title } = body;
      const todo = await prisma.todo.create({
        data: {
          title,
        },
      });
      return todo;
    } catch (err) {
      console.error(err);
    }
  },
  // Get all tasks (Todos)
  getAllTasks: async () => {
    try {
      const todos = await prisma.todo.findMany();
      return todos;
    } catch (err) {
      console.error('Error fetching all tasks:', err);
    }
  },

  // Get a single task by ID
  getTaskById: async (id) => {
    try {
      const todo = await prisma.todo.findUnique({
        where: { id: parseInt(id) },
      });
      return todo;
    } catch (err) {
      console.error('Error fetching task by ID:', err);
    }
  },

  // Update a task by ID
  updateTask: async (body) => {
    try {
      const { title, completed, id } = body;
      const todo = await prisma.todo.update({
        where: { id: parseInt(id) },
        data: {
          title,
          completed,
        },
      });
      return todo;
    } catch (err) {
      console.error('Error updating task:', err);
    }
  },

  // Delete a task by ID
  deleteTask: async (body) => {
    try {
      const { id } = body;
      await prisma.todo.delete({
        where: { id: parseInt(id) },
      });
      return { message: 'Task deleted successfully' };
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  },
};
