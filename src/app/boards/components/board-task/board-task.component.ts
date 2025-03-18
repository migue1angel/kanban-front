import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { DatePipe, NgClass, TitleCasePipe } from '@angular/common';
import { MessageService, PrimeIcons } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { ToastModule } from 'primeng/toast';
import { Menu } from 'primeng/menu';
import { Task, TaskStatus } from '../../models/task.model';
import { TasksService } from '../../services/tasks.service';

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
    DatePipe,
  ],
  providers: [MessageService],
  templateUrl: './board-task.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardTaskComponent {
  protected readonly tasksHttpService = inject(TasksService);
  // @Input({ required: true }) task!: Task;
  public task = input.required<Task>();
  public columnState = input.required<TaskStatus>();
  protected icons = PrimeIcons;

  get statusOptions() {
    return this.items.filter((item) => item.status !== this.columnState());
  }
  items = [
    {
      label: 'Por hacer',
      status: TaskStatus.TODO,
      icon: PrimeIcons.CHECK,
    },
    {
      label: 'En progreso',
      status: TaskStatus.IN_PROGRESS,
      icon: PrimeIcons.FORWARD,
    },
    {
      label: 'Para revisión',
      status: TaskStatus.IN_REVIEW,
      icon: PrimeIcons.CHECK,
    },
    {
      label: 'Hecho',
      status: TaskStatus.DONE,
    },
  ];
}
