import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PrimeIcons } from 'primeng/api';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-nav',
  imports: [
    MenubarModule,
    BadgeModule,
    AvatarModule,
    InputTextModule,
    ButtonModule,
    RouterLink
  ],
  templateUrl: './nav.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavComponent {
  protected readonly authService = inject(AuthService);
  protected icons = PrimeIcons;
  protected modeIcon = signal<string>(this.icons.MOON);
  toggleDarkMode() {
    const element = document.querySelector('html');
    element!.classList.toggle('my-app-dark');
    this.modeIcon.set(
      element?.classList.contains('my-app-dark')
        ? this.icons.SUN
        : this.icons.MOON
    );
  }
  items = [
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
}
