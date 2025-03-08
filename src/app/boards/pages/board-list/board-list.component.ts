import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-board-list',
  imports: [],
  templateUrl: './board-list.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardListComponent { }
