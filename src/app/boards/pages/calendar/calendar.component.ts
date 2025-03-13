import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DatePickerModule } from 'primeng/datepicker';
import { FluidModule } from 'primeng/fluid';


@Component({
  selector: 'app-calendar',
  imports: [DatePickerModule, FluidModule],
  templateUrl: './calendar.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent { }
