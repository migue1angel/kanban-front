import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { SideItemsComponent } from './side-items/side-items.component';
import { SidebarService } from '../../services/sidebar.service';
import { isPlatformBrowser } from '@angular/common';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { PrimeIcons } from 'primeng/api';
@Component({
  selector: 'boards-sidebar',
  imports: [SideItemsComponent, DrawerModule, ButtonModule, DividerModule],
  templateUrl: './sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
}) 
export class SidebarComponent {
  protected icons = PrimeIcons;
  private readonly platformId = inject(PLATFORM_ID);
  private readonly sidebarService = inject(SidebarService);
  visible: boolean = false;

  public windowWidth = signal<number>(this.getInitialWidth());

  constructor() {
    effect(() => {
      if (isPlatformBrowser(this.platformId)) {
        const handleResize = () => {
          this.windowWidth.set(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }
      return; 
    });
  }

  private getInitialWidth(): number {
    return isPlatformBrowser(this.platformId) ? window.innerWidth : 0;
  }

  toggleSidebar(): void {
    this.sidebarService.collapsed = !this.sidebarService.collapsed;
  }
}
