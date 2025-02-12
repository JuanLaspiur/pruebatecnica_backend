import { Request, Response } from "express";
import { TaskService } from "../services/taskService";
import { ITask } from "../models/Task";

const taskService = new TaskService();

export class TaskController {
static  async createTask(req: Request, res: Response): Promise<Response> {
    const { title, description, completed, dueDate, status, category }: ITask = req.body;
    const userId = (req as any).user?.id;

    try {
      const newTask = await taskService.createTask({ title, description, completed, dueDate, status, category } as ITask, userId);
      return res.status(201).json(newTask);
    } catch (error: any) {
      return res.status(500).json({ message: "Error creating task", error: error.message });
    }
  }

 static async getAllTasks(req: Request, res: Response): Promise<Response> {
  const userId = (req as any).user?.id;

    try {
      const tasks = await taskService.getAllTasks(userId);
      return res.status(200).json(tasks);
    } catch (error: any) {
      return res.status(500).json({ message: "Error fetching tasks", error: error.message });
    }
  }

static  async getTaskById(req: Request, res: Response): Promise<Response> {
    const { taskId } = req.params;
    const userId = (req as any).user?.id;
    try {
      const task = await taskService.getTaskById(taskId, userId);

      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }

      return res.status(200).json(task);
    } catch (error:any) {
      return res.status(500).json({ message: "Error fetching task", error: error.message });
    }
  }

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
    } catch (error:any) {
      return res.status(500).json({ message: "Error updating task", error: error.message });
    }
  }

static  async deleteTask(req: Request, res: Response): Promise<Response> {
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
