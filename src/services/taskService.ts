import Task, { ITask } from "../models/Task";
import { IUser } from "../models/User";

export class TaskService {
  async createTask(
    { title, description, completed, dueDate, status, category }: ITask, 
    userId: IUser["_id"]
  ): Promise<ITask> {
    const newTask = new Task({
      title,
      description,
      completed,
      dueDate,
      status,
      category,
      user: userId
    });

    await newTask.save();
    return newTask;
  }

  async getAllTasks(userId: IUser["_id"]): Promise<ITask[]> {
    return Task.find({ user: userId });
  }

  async getTaskById(
    taskId: string,
    userId: IUser["_id"]
  ): Promise<ITask | null> {
    return Task.findOne({ _id: taskId, user: userId });
  }

  async updateTask(
    taskId: string,
    userId: IUser["_id"],
    updateData: Partial<ITask>
  ): Promise<ITask | null> {
    const task = await Task.findOneAndUpdate(
      { _id: taskId, user: userId },
      { ...updateData, updatedAt: new Date() },
      { new: true }
    );
    return task;
  }

  async deleteTask(
    taskId: string,
    userId: IUser["_id"]
  ): Promise<ITask | null> {
    const task = await Task.findOneAndDelete({ _id: taskId, user: userId });
    return task;
  }
}
