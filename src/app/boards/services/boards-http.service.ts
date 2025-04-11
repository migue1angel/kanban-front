import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BoardsHttpService {

  constructor(private readonly http: HttpClient) { }

  // create(board: Board) {
  //   return this.http.post(`${API_URL}/boards`, board);
  // }
}
