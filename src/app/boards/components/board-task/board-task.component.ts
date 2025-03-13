import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { NgClass, TitleCasePipe } from '@angular/common';
import { MessageService, PrimeIcons } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { ToastModule } from 'primeng/toast';
import { Menu } from 'primeng/menu';

@Component({
  selector: 'board-task',
  imports: [
    DividerModule,
    NgClass,
    TitleCasePipe,
    ButtonModule,
    AvatarModule,
    Menu,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './board-task.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardTaskComponent {
  priority = 'urgent';
  protected icons = PrimeIcons;
  items = [
    {
      label: 'Options',
      items: [
        {
          label: 'Refresh',
          icon: 'pi pi-refresh',
          command: () => {
            console.log('Refresh');
          }
        },
        {
          label: 'Export',
          icon: 'pi pi-upload',
        },
      ],
    },
  ];
}
