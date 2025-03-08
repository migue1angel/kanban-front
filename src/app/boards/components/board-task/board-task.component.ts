import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { NgClass, TitleCasePipe } from '@angular/common';
import { PrimeIcons } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'board-task',
  imports: [DividerModule, NgClass, TitleCasePipe, ButtonModule, AvatarModule],
  templateUrl: './board-task.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardTaskComponent {
  priority = 'urgent';
  protected icons = PrimeIcons;
}
