import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  collapsed: boolean = false;

  constructor() { }

}
