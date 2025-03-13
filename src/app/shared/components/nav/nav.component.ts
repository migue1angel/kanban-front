import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PrimeIcons } from 'primeng/api';

@Component({
  selector: 'app-nav',
  imports: [
    MenubarModule,
    BadgeModule,
    AvatarModule,
    InputTextModule,
    ButtonModule,
  ],
  templateUrl: './nav.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavComponent {
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
      label: 'Home',
      icon: 'pi pi-home',
    },
    {
      label: 'Projects',
      icon: 'pi pi-search',
      items: [
        {
          label: 'Core',
          icon: 'pi pi-bolt',
        },
        {
          label: 'Blocks',
          icon: 'pi pi-server',
        },
        {
          separator: true,
        },
        {
          label: 'UI Kit',
          icon: 'pi pi-pencil',
        },
      ],
    },
  ];
}
