import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Route, RouterLink, RouterLinkActive } from '@angular/router';
import { PrimeIcons } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { SidebarService } from '../../../services/sidebar.service';
import { TooltipModule } from 'primeng/tooltip';
import boardsRoutes from '../../../boards.routes';



@Component({
  selector: 'side-items',
  templateUrl: './side-items.component.html',
  imports: [RouterLink, RouterLinkActive, ButtonModule, TooltipModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideItemsComponent {
  protected sidebarService = inject(SidebarService);
  protected icons = PrimeIcons;
 
  
}
