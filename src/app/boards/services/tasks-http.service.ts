import { computed, Injectable, signal } from '@angular/core';
import { Task, TaskStatus, TaskPriority } from '../models/task.model';
import { HttpClient } from '@angular/common/http';
// import { environment } from '@env/environment';
import { firstValueFrom } from 'rxjs';

const API_URL = 'http://localhost:3000';
@Injectable({
  providedIn: 'root',
})
export class TasksHttpService {
  private apiUrl = `${API_URL}/tasks`;
  private tasks = signal<Task[]>([]);

  constructor(private http: HttpClient) {
    this.loadTasks();
  }

  // Cargar tareas iniciales
  private async loadTasks() {
    try {
      const tasks = await firstValueFrom(this.http.get<Task[]>(this.apiUrl));
      this.tasks.set(tasks);
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  }

  // Mapa de estados que mantiene un computed para cada estado
  private tasksByStatus = computed(() => {
    const taskMap = new Map<TaskStatus, Task[]>();
    
    Object.values(TaskStatus).forEach(status => {
      taskMap.set(status, []);
    });
    
    this.tasks().forEach(task => {
      const tasksForStatus = taskMap.get(task.status) || [];
      tasksForStatus.push(task);
      taskMap.set(task.status, tasksForStatus);
    });
    
    return taskMap;
  });

  // Obtener tareas por estado
  public getTasksByStatus(status: TaskStatus): Task[] {
    return this.tasksByStatus().get(status) || [];
  }

  // Actualizar estado de una tarea
  public async updateTaskStatus(taskId: number, newStatus: TaskStatus): Promise<boolean> {
    try {
      // Optimistic update - Actualizamos el UI inmediatamente
      this.tasks.update(tasks => 
        tasks.map(task => 
          task.id === taskId 
            ? { ...task, status: newStatus }
            : task
        )
      );

      // Enviar actualización al backend
      const updatedTask = await firstValueFrom(
        this.http.patch<Task>(`${this.apiUrl}/${taskId}`, { status: newStatus })
      );

      // Si la actualización en el backend fue exitosa, no necesitamos hacer nada más
      // porque ya actualizamos el UI optimistamente
      
      return true;
    } catch (error) {
      // Si hay un error, revertimos el cambio local
      console.error('Error updating task:', error);
      await this.loadTasks(); // Recargamos las tareas del servidor
      return false;
    }
  }

  // Actualizar una tarea completa
  public async updateTask(taskId: number, updates: Partial<Task>): Promise<boolean> {
    try {
      // Optimistic update
      this.tasks.update(tasks => 
        tasks.map(task => 
          task.id === taskId 
            ? { ...task, ...updates }
            : task
        )
      );

      // Backend update
      const updatedTask = await firstValueFrom(
        this.http.patch<Task>(`${this.apiUrl}/${taskId}`, updates)
      );

      return true;
    } catch (error) {
      console.error('Error updating task:', error);
      await this.loadTasks(); // Rollback by reloading from server
      return false;
    }
  }
}
