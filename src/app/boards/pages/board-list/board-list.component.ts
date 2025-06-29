import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  OnInit,
  resource,
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
import { RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { BoardsHttpService } from '../../services/boards-http.service';
import { Board } from '../../models/board.model';
import { AuthService } from '../../../auth/services/auth.service';

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
    RouterLink,
  ],
  templateUrl: './board-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardListComponent implements OnInit {
  private readonly boardsHttpService = inject(BoardsHttpService);
  private readonly authService = inject(AuthService);
  protected boards = signal<Board[]>([]);
  protected searchText = signal('');
  protected filteredBoards = signal<Board[]>([]);
  protected visibleDialogBoardForm = signal(false);

  ngOnInit(): void {
    this.getBoards();
  }

  protected filterBoards = effect((onCleanup) => {
    if (this.searchText() === '') {
      this.filteredBoards.set(this.boards());
      return;
    }
    const timeout = setTimeout(() => {
      const query = this.searchText().toLowerCase();
      this.filteredBoards.set(
        this.boards().filter((board) => {
          return board.name.toLowerCase().includes(query);
        })
      );
    }, 500);
    onCleanup(() => clearTimeout(timeout));
  });

  showBoardFormDialog() {
    this.visibleDialogBoardForm.set(true);
  }

  searchBoards = effect(() => {
    this.authService.user();
    this.getBoards();
  });

  getBoards() {
    if (!this.authService.user()) return;
    this.boardsHttpService
      .findByUserId(this.authService.user()!.id)
      .subscribe((boards) => {
        this.boards.set(boards);
        this.visibleDialogBoardForm.set(false);
      });
  }
}
