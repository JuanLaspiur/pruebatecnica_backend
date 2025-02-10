import { Schema, model, Document } from 'mongoose';

export interface ITask extends Document {
  title: string;               
  description: string;       
  completed: boolean;          
  createdAt: Date;            
  updatedAt: Date;           
  dueDate?: Date;             
  status: string;               
  category?: string;           
  user: Schema.Types.ObjectId; 
}

export const categoryEnum = ['trabajo', 'personal', 'estudios', 'hogar', 'salud'] as const;

const taskSchema = new Schema<ITask>({
  title: {
    type: String,
    required: true,              
  },
  description: {
    type: String,
    required: true,              
  },
  completed: {
    type: Boolean,
    default: false,              
  },
  createdAt: {
    type: Date,
    default: Date.now,           
  },
  updatedAt: {
    type: Date,
    default: Date.now,          
  },
  dueDate: {
    type: Date,                  
    required: false,              
  },
  status: {
    type: String,
    enum: ['pendiente', 'en progreso', 'completada', 'cancelada'], 
    default: 'pendiente',        
  },
  category: {
    type: String,
    enum: categoryEnum,           
    required: false,             
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',                
    required: true,              
  },
});
taskSchema.pre('save', function (next) {
    this.updatedAt = new Date(Date.now()); 
    next();
  });

const Task = model<ITask>('Task', taskSchema);

export default Task;
