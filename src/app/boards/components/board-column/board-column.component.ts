import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { BoardTaskComponent } from '../board-task/board-task.component';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'board-column',
  imports: [BoardTaskComponent, DividerModule],
  templateUrl: './board-column.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'max-h-[calc(100vh-7rem)]'
  }
})
export class BoardColumnComponent { 
  public columnName = input.required<string>()

}
