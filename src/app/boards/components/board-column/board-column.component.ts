import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
  Signal,
  signal,
} from '@angular/core';
import { BoardTaskComponent } from '../board-task/board-task.component';
import { DividerModule } from 'primeng/divider';
import { Task, TaskStatus } from '../../models/task.model';
import { TitleCasePipe } from '@angular/common';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'board-column',
  imports: [BoardTaskComponent, DividerModule, TitleCasePipe],
  templateUrl: './board-column.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'max-h-[calc(100vh-7rem)]',
  },
})
export class BoardColumnComponent implements OnInit {
  private readonly tasksHttpService = inject(TasksService);
  public columnName = input.required<string>();
  public status = input.required<TaskStatus>();

  protected tasks: Signal<Task[]> = signal<Task[]>([]);
  ngOnInit(): void {
    this.tasks = this.tasksHttpService.getTasksByStatus(this.status());
  }
}
