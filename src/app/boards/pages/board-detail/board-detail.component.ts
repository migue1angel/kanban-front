import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
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
import { TeamMemberFormComponent } from '../../components/team-member-form/team-member-form.component';

@Component({
  selector: 'board-detail',
  imports: [
    BoardColumnComponent,
    BoardToolbarComponent,
    ButtonModule,
    DialogModule,
    TaskFormComponent,
    TeamMemberFormComponent,
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
  protected reloadTeamMembers: boolean | null = null;

  onReloadTeamMembers(event: boolean) {
    this.reloadTeamMembers = event;
    console.log(this.reloadTeamMembers);
  }
  ngOnInit(): void {
    this.tasksService.getTasks(this.id);
  }

  protected showTaskFormDialog(event: boolean) {
    this.taskFormVisible.update((value) => !value);
  }

  protected showMembersDialog(event: boolean) {
    this.memberFormVisible.update((value) => !value);
  }
}
