import { Request, Response } from "express";
import { TaskService } from "../services/taskService";
import { ITask } from "../models/Task";

const taskService = new TaskService();

export class TaskController {

  /**
   * @swagger
   * /tasks:
   *   post:
   *     summary: Create a new task
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
  static async createTask(req: Request, res: Response): Promise<Response> {
    const { title, description, completed, dueDate, status, category }: ITask = req.body;
    const userId = (req as any).user?.id;

    try {
      const newTask = await taskService.createTask({ title, description, completed, dueDate, status, category } as ITask, userId);
      return res.status(201).json(newTask);
    } catch (error: any) {
      return res.status(500).json({ message: "Error creating task", error: error.message });
    }
  }

  /**
   * @swagger
   * /tasks:
   *   get:
   *     summary: Get all tasks
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
  static async getAllTasks(req: Request, res: Response): Promise<Response> {
    const userId = (req as any).user?.id;

    try {
      const tasks = await taskService.getAllTasks(userId);
      return res.status(200).json(tasks);
    } catch (error: any) {
      return res.status(500).json({ message: "Error fetching tasks", error: error.message });
    }
  }

  /**
   * @swagger
   * /tasks/{taskId}:
   *   get:
   *     summary: Get a task by ID
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
  static async getTaskById(req: Request, res: Response): Promise<Response> {
    const { taskId } = req.params;
    const userId = (req as any).user?.id;

    try {
      const task = await taskService.getTaskById(taskId, userId);

      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }

      return res.status(200).json(task);
    } catch (error: any) {
      return res.status(500).json({ message: "Error fetching task", error: error.message });
    }
  }

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
  static async updateTask(req: Request, res: Response): Promise<Response> {
    const { taskId } = req.params;
    const userId = (req as any).user?.id;
    const updateData = req.body;

    try {
      const updatedTask = await taskService.updateTask(taskId, userId, updateData);

      if (!updatedTask) {
        return res.status(404).json({ message: "Task not found" });
      }

      return res.status(200).json(updatedTask);
    } catch (error: any) {
      return res.status(500).json({ message: "Error updating task", error: error.message });
    }
  }

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
  static async deleteTask(req: Request, res: Response): Promise<Response> {
    const { taskId } = req.params;
    const userId = (req as any).user?.id;

    try {
      const deletedTask = await taskService.deleteTask(taskId, userId);

      if (!deletedTask) {
        return res.status(404).json({ message: "Task not found" });
      }

      return res.status(200).json({ message: "Task deleted successfully" });
    } catch (error: any) {
      return res.status(500).json({ message: "Error deleting task", error: error.message });
    }
  }
}
