import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { SideItemsComponent } from './side-items/side-items.component';
import { SidebarService } from '../../services/sidebar.service';
import { NgClass } from '@angular/common';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { PrimeIcons } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
@Component({
  selector: 'boards-sidebar',
  imports: [SideItemsComponent, DrawerModule, ButtonModule, DividerModule,AvatarModule , NgClass],
  templateUrl: './sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  protected icons = PrimeIcons;
  protected readonly sidebarService = inject(SidebarService);
  protected modeIcon = signal<string>(this.icons.MOON);
  toggleSidebar(): void {
    this.sidebarService.collapsed.set(!this.sidebarService.collapsed());
  }
  toggleDarkMode() {
    const element = document.querySelector('html');
    element!.classList.toggle('my-app-dark');
    this.modeIcon.set(
      element?.classList.contains('my-app-dark')
        ? this.icons.SUN
        : this.icons.MOON
    );
  }
}
