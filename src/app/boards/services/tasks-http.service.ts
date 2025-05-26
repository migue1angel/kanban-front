import { inject, Injectable } from '@angular/core';
import {
  Task,
  CreateTaskDto,
} from '../models/task.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TasksHttpService {
  private readonly API_URL = `${environment.baseApiUrl}/tasks`;
  private readonly httpClient = inject(HttpClient);

  findTasksByBoard(boardId: string): Observable<Task[]> {
    const url = `${this.API_URL}/board/${boardId}`;
    return this.httpClient.get<Task[]>(url);
  }

  create(createTaskDto: CreateTaskDto): Observable<Task> {
    const url = `${this.API_URL}`;
    return this.httpClient.post<Task>(url, createTaskDto);
  }
}