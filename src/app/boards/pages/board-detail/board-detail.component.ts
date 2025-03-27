import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { BoardColumnComponent } from '../../components/board-column/board-column.component';
import { BoardToolbarComponent } from '../../components/board-toolbar/board-toolbar.component';
import { TaskStatus } from '../../models/task.model';
import { TasksService } from '../../services/tasks.service';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TaskFormComponent } from '../../components/task-form/task-form.component';

@Component({
  selector: 'board-detail',
  imports: [
    BoardColumnComponent,
    BoardToolbarComponent,
    ButtonModule,
    DialogModule,
    TaskFormComponent
  ],
  templateUrl: './board-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class BoardDetailComponent implements OnInit {
  private readonly tasksService = inject(TasksService);
  protected taskFormVisible = signal<boolean>(false);
  protected memberFormVisible = signal<boolean>(false);
  ngOnInit(): void {
    this.tasksService.getTasks('11e45685-047b-4a74-bb8f-ab958f458271');
  }
  protected taskStatus = TaskStatus;
  protected showTaskFormDialog(event:boolean) {
    this.taskFormVisible.update((value) => !value);
  }
  protected showMembersDialog(event:boolean) {
    this.memberFormVisible.update((value) => !value);
  }

}
