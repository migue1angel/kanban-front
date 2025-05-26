import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CreateTeamMemberDto, TeamMember } from '../models/team-member.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TeamMembersHttpService {
  private readonly API_URL = `${environment.baseApiUrl}/teams`;
  private readonly httpClient = inject(HttpClient);

  addTeamMembers(teamMembers: CreateTeamMemberDto[]) {
    const url = `${this.API_URL}/many`;
    return this.httpClient.post<CreateTeamMemberDto[]>(url, teamMembers);
  }

  getTeamMembersByBoard(boardId: string): Observable<TeamMember[]> {
    const url = `${this.API_URL}/board/${boardId}`;
    return this.httpClient.get<TeamMember[]>(url);
  }
}
