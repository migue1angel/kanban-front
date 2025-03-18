import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { BoardColumnComponent } from '../../components/board-column/board-column.component';
import { BoardToolbarComponent } from '../../components/board-toolbar/board-toolbar.component';
import { TaskStatus } from '../../models/task.model';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'board-detail',
  imports: [BoardColumnComponent, BoardToolbarComponent],
  templateUrl: './board-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class BoardDetailComponent implements OnInit {
  private readonly tasksService = inject(TasksService);
  ngOnInit(): void {
    this.tasksService.getTasks('11e45685-047b-4a74-bb8f-ab958f458271');
  }
  protected taskStatus = TaskStatus;
}
