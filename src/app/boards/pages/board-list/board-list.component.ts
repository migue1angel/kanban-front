import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  signal,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { ToolbarModule } from 'primeng/toolbar';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { BoardFormComponent } from '../../components/board-form/board-form.component';

interface Board {
  name: string;
  description: string;
}

@Component({
  selector: 'app-board-list',
  imports: [
    ButtonModule,
    DividerModule,
    ToolbarModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    DialogModule,
    BoardFormComponent,
  ],
  templateUrl: './board-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardListComponent {
  protected boards = [
    {
      name: 'Proyecto kanban con Angular y Nest',
      description:
        'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin l and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham',
    },
    {
      name: 'Proyecto prueba con Angular y Nest',
      description:
        'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin l and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham',
    },
    {
      name: 'Proyecto datascience con Angular y Nest',
      description:
        'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin l and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham',
    },
    {
      name: 'Proyecto machine learning con Angular y Nest',
      description:
        'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin l and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham',
    },
  ];

  protected searchText = signal('');
  protected filteredBoards = signal(this.boards);
  protected filterBoards = effect((onCleanup) => {
    if (this.searchText() === '') {
      this.filteredBoards.set(this.boards);
      return;
    }
    const timeout = setTimeout(() => {
      const query = this.searchText().toLowerCase();
      this.filteredBoards.set(
        this.boards.filter((board) => {
          return board.name.toLowerCase().includes(query);
        })
      );
    }, 500);
    onCleanup(() => clearTimeout(timeout));
  });

  visible = signal(false);
  showBoardFormDialog() {
    this.visible.set(true);
  }
}
