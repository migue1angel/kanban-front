import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'boards-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent { }
