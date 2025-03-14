import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Toolbar } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { SplitButton } from 'primeng/splitbutton';
import { InputTextModule } from 'primeng/inputtext';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
@Component({
  selector: 'board-toolbar',
  imports: [
    Toolbar,
    ButtonModule,
    SplitButton,
    InputTextModule,
    IconField,
    InputIcon,
  ],
  templateUrl: './board-toolbar.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardToolbarComponent {
  items = [
    {
      label: 'Update',
      icon: 'pi pi-refresh',
    },
    {
      label: 'Delete',
      icon: 'pi pi-times',
    },
  ];
}
