import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersHttpService {
  private API_URL = `${environment.baseApiUrl}/users`;
  private readonly httpClient = inject(HttpClient);
  constructor() {}

  getAll() {
    return this.httpClient.get(this.API_URL);
  }

  findByEmailOrUsername(identifier: string): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.API_URL}/${identifier}`);
  }
}
