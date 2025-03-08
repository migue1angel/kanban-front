import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BoardTaskComponent } from '../../components/board-task/board-task.component';

@Component({
  selector: 'app-boards',
  imports: [BoardTaskComponent],
  templateUrl: './board-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class BoardDetailComponent { }
