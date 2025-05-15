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
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'board-detail',
  imports: [
    BoardColumnComponent,
    BoardToolbarComponent,
    ButtonModule,
    DialogModule,
    TaskFormComponent,
  ],
  templateUrl: './board-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class BoardDetailComponent implements OnInit {
  protected id = inject(ActivatedRoute).snapshot.params['id'];
  private readonly tasksService = inject(TasksService);
  protected taskFormVisible = signal<boolean>(false);
  protected memberFormVisible = signal<boolean>(false);
  protected taskStatus = TaskStatus;

  ngOnInit(): void {
    this.tasksService.getTasks(this.id);
  }

  protected showTaskFormDialog(event: boolean) {
    console.log(this.taskFormVisible());

    this.taskFormVisible.update((value) => !value);
  }

  protected showMembersDialog(event: boolean) {
    this.memberFormVisible.update((value) => !value);
  }
}
