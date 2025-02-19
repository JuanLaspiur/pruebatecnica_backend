import express from 'express';
import { TaskController } from '../controllers/taskController';
import authMiddleware from '../middlewares/authMiddleware'; 
import { handleAsync } from '../helpers/handleAsyncHelper';

const router = express.Router();

  /**
   * @swagger
   * /tasks:
   *   post:
   *     summary: Create a new task (NEED TOKEN Bearer )
   *     description: Creates a new task for the authenticated user.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               title:
   *                 type: string
   *                 example: "Task title"
   *               description:
   *                 type: string
   *                 example: "Task description"
   *               completed:
   *                 type: boolean
   *                 example: false
   *               dueDate:
   *                 type: string
   *                 format: date
   *                 example: "2025-02-20"
   *               status:
   *                 type: string
   *                 example: "In Progress"
   *               category:
   *                 type: string
   *                 example: "Work"
   *     responses:
   *       201:
   *         description: Task created successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: string
   *                   example: "taskId"
   *                 title:
   *                   type: string
   *                   example: "Task title"
   *       400:
   *         description: Invalid input
   *       500:
   *         description: Internal server error
   */
router.post('/', authMiddleware, handleAsync(TaskController.createTask));
  /**
   * @swagger
   * /tasks:
   *   get:
   *     summary: Get all tasks (NEED TOKEN Bearer )
   *     description: Retrieves all tasks for the authenticated user.
   *     responses:
   *       200:
   *         description: A list of tasks
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   id:
   *                     type: string
   *                     example: "taskId"
   *                   title:
   *                     type: string
   *                     example: "Task title"
   *       500:
   *         description: Internal server error
   */
router.get('/', authMiddleware, handleAsync(TaskController.getAllTasks));

/**
   * @swagger
   * /tasks/{taskId}:
   *   get:
   *     summary: Get a task by ID(NEED TOKEN Bearer )
   *     description: Retrieves a task by its ID for the authenticated user.
   *     parameters:
   *       - in: path
   *         name: taskId
   *         required: true
   *         description: The ID of the task to retrieve.
   *         schema:
   *           type: string
   *           example: "taskId"
   *     responses:
   *       200:
   *         description: Task found
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: string
   *                   example: "taskId"
   *                 title:
   *                   type: string
   *                   example: "Task title"
   *       404:
   *         description: Task not found
   *       500:
   *         description: Internal server error
   */
router.get('/id/:taskId', authMiddleware, handleAsync(TaskController.getTaskById));
/**
   * @swagger
   * /tasks/{taskId}:
   *   put:
   *     summary: Update a task
   *     description: Updates a task by its ID for the authenticated user.
   *     parameters:
   *       - in: path
   *         name: taskId
   *         required: true
   *         description: The ID of the task to update.
   *         schema:
   *           type: string
   *           example: "taskId"
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               title:
   *                 type: string
   *               description:
   *                 type: string
   *               completed:
   *                 type: boolean
   *               dueDate:
   *                 type: string
   *                 format: date
   *               status:
   *                 type: string
   *               category:
   *                 type: string
   *     responses:
   *       200:
   *         description: Task updated successfully
   *       404:
   *         description: Task not found
   *       500:
   *         description: Internal server error
   */
router.put('/id/:taskId', authMiddleware, handleAsync(TaskController.updateTask));
/**
   * @swagger
   * /tasks/{taskId}:
   *   delete:
   *     summary: Delete a task
   *     description: Deletes a task by its ID for the authenticated user.
   *     parameters:
   *       - in: path
   *         name: taskId
   *         required: true
   *         description: The ID of the task to delete.
   *         schema:
   *           type: string
   *           example: "taskId"
   *     responses:
   *       200:
   *         description: Task deleted successfully
   *       404:
   *         description: Task not found
   *       500:
   *         description: Internal server error
   */
router.delete('/id/:taskId', authMiddleware, handleAsync(TaskController.deleteTask));

export default router;

