import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-boards',
  imports: [],
  templateUrl: './board.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardComponent { }
