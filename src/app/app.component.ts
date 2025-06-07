import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AccordionModule } from 'primeng/accordion';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  imports: [AccordionModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'kanban-front';
  authService = inject(AuthService);
}
