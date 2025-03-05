import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-nav',
  imports: [],
  styles: [
    `
    // nav {
    //   background-color: #1e1e2f;
    // }
    `
  ],
  templateUrl: './nav.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavComponent { }
