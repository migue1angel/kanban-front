import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { Toolbar } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
@Component({
  selector: 'board-toolbar',
  imports: [
    Toolbar,
    ButtonModule,
    InputTextModule
],
  templateUrl: './board-toolbar.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardToolbarComponent {
  protected visibleTaskFormOutput = output<boolean>()
  protected visibleMemberOutput = output<boolean>()
}
