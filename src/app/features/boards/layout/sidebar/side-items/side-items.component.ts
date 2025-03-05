import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonModule } from 'primeng/button';

interface SideItem {
  label: string;
  icon: string;
  route: string;
  children?: SideItem[];
}

@Component({
  selector: 'side-items',
  templateUrl: './side-items.component.html',
  imports: [RouterLink, RouterLinkActive, ButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideItemsComponent {
  protected sideItems:SideItem[] = [
    {
      label: 'Dashboard',
      icon: 'pi pi-home',
      route: 'dashboard',
    },
    {
      label: 'Boards',
      icon: 'pi pi-desktop',  
      route: 'board-list',
    },
  ];
}
