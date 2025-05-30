import { User } from "../../auth/models/user.model";

export enum TaskStatus {
  TODO = 'todo',
  IN_PROGRESS = 'in_progress',
  IN_REVIEW = 'in_review',
  DONE = 'done'
}

export enum TaskPriority {
  URGENT = 'urgent',
  IMPORTANT = 'important',
  REGULAR = 'regular'
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: Date;
  board: string;
  taskAssignments: User[];
}

export interface CreateTaskDto extends Omit<Task, 'id'> {}

