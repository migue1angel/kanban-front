import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { TasksHttpService } from '../../services/tasks-http.service';
import { BoardColumnComponent } from '../../components/board-column/board-column.component';
import { BoardToolbarComponent } from '../../components/board-toolbar/board-toolbar.component';
import { TaskStatus } from '../../models/task.model';

@Component({
  selector: 'board-detail',
  imports: [BoardColumnComponent, BoardToolbarComponent],
  templateUrl: './board-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class BoardDetailComponent implements OnInit {
  private readonly tasksHttpService = inject(TasksHttpService);

  ngOnInit(): void {
    console.log(this.tasksHttpService.getTasksByStatus(TaskStatus.DONE));
    
  }

  // changeStatus() {
  //   this.tasksHttpService.tasks.update((value) => {
  //     const newTasks = [...value];
  //     newTasks[2].status = 'in_progress';
  //     return newTasks;
  //   });
  //   console.log(this.tasksHttpService.doneTasks());
  // }
}
