import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-boards',
  imports: [],
  templateUrl: './board-detail.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class BoardDetailComponent { }
