import { Injectable, signal } from '@angular/core';
import { PrimeIcons } from 'primeng/api';

interface SideItem {
  label: string;
  icon: string;
  route: string;
  children?: SideItem[];
}

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  protected icons = PrimeIcons;
  public collapsed = signal<boolean>(true);
  public sideItems:SideItem[] = [
    {
      label: 'Dashboard',
      icon: this.icons.CHART_BAR,
      route: 'dashboard',
    },
    {
      label: 'Boards',
      icon: this.icons.OBJECTS_COLUMN,
      route: 'boards',
    },
    {
      label: 'Calendar',
      icon: this.icons.CALENDAR_MINUS,
      route: 'calendar',
    },
  ];
  constructor() {}
}
