import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Board, CrateBoardDto } from '../models/board.model';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BoardsHttpService {
  private readonly API_URL = `${environment.baseApiUrl}/boards`;
  constructor(private readonly http: HttpClient) {}

  create(board: CrateBoardDto) {
    return this.http.post(this.API_URL, board);
  }
  findByBoardId(boardId: string) {
    return this.http.get(`${this.API_URL}/${boardId}`);
  }
  findByUserId(userId: string): Observable<Board[]> {
    return this.http.get<Board[]>(`${this.API_URL}/user/${userId}`);
  }
}
