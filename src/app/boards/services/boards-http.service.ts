import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrateBoardDto } from '../models/board.model';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BoardsHttpService {
  private API_URL = `${environment.baseApiUrl}/boards`;
  constructor(private readonly http: HttpClient) { }

  create(board: CrateBoardDto) {
    return this.http.post(this.API_URL, board);
  }
}
