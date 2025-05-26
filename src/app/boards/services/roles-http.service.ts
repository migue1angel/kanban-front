import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role } from '../models/role.model';

@Injectable({
  providedIn: 'root',
})
export class RolesHttpService {
  private readonly API_URL = `${environment.baseApiUrl}/roles`;
  private readonly httpClient = inject(HttpClient);
  constructor() {}

  findAll(): Observable<Role[]> {
    const url = `${this.API_URL}`;
    return this.httpClient.get<Role[]>(url);
  }
}
