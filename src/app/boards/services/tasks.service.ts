import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { Task, TaskStatus } from '../models/task.model';
import { TasksHttpService } from './tasks-http.service';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private readonly tasksHttpService = inject(TasksHttpService);
  public tasks = signal<Task[]>([]);

  public getTasks(boardId: string) {
    this.tasksHttpService
      .findTasksByBoard(boardId)
      .subscribe((res) => this.tasks.set(res));
  }

  public changeStatus(id: string, status: TaskStatus) {
    this.tasks.update((value) => {
      const newTasks = [...value];
      const taskIndex = newTasks.findIndex((task) => task.id === id);
      newTasks[taskIndex].status = status;
      return newTasks;
    });
  }

  public getTasksByStatus(status: TaskStatus): Signal<Task[]> {
    return computed(() =>
      this.tasks().filter((task) => task.status === status)
    );
  }
}
