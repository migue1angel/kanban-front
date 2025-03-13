import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { DividerModule } from 'primeng/divider';
import { isPlatformBrowser, NgClass } from '@angular/common';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'boards-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    SidebarComponent,
    DividerModule,
    NgClass
],
  templateUrl: './boards-layout.component.html',
  styles: `
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardsLayoutComponent {
  protected sidebarService = inject(SidebarService);
  private readonly platformId = inject(PLATFORM_ID);

  public windowWidth = signal<number>(this.getInitialWidth());

  private readonly windowResize = effect(() => {
    if (!isPlatformBrowser(this.platformId)) return;
    const handleResize = () => {
      this.windowWidth.set(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  private getInitialWidth(): number {
    return isPlatformBrowser(this.platformId) ? window.innerWidth : 0;
  }

  getBodyClass(): string {
    if (!this.sidebarService.collapsed() && this.windowWidth() > 768) {
      return 'ml-60';
    } else {
      return 'ml-20';
    }
  }
}
