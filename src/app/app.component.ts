import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AccordionModule } from 'primeng/accordion';

@Component({
  selector: 'app-root',
  imports: [AccordionModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'kanban-front';
}
