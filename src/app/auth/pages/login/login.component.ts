import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-login',
  imports: [
    ButtonModule,
    RippleModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent { }
