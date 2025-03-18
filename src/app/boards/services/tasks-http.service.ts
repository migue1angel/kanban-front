import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { Task, TaskStatus, TaskPriority } from '../models/task.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:3000';
@Injectable({
  providedIn: 'root',
})
export class TasksHttpService {
  private readonly httpClient = inject(HttpClient);

  findTasksByBoard(boardId:string): Observable<Task[]> {
    const url = `${API_URL}/tasks/board/${boardId}`;
    return this.httpClient.get<Task[]>(url);
  }
}
