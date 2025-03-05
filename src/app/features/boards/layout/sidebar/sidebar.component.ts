import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  effect,
  HostListener,
  inject,
  OnInit,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { SideItemsComponent } from './side-items/side-items.component';
import { SidebarService } from '../../services/sidebar.service';
import { isPlatformBrowser } from '@angular/common';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'boards-sidebar',
  imports: [SideItemsComponent, DrawerModule, ButtonModule],
  templateUrl: './sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
}) 
export class SidebarComponent {
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
