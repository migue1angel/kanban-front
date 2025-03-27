import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TaskPriority, TaskStatus } from '../../models/task.model';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { TextareaModule } from 'primeng/textarea';
import { Fluid } from 'primeng/fluid';
import { ChipModule } from 'primeng/chip';
import { AutoCompleteModule } from 'primeng/autocomplete';

interface TaskPriorities {
  label: string;
  value: string;
}

@Component({
  selector: 'board-form',
  imports: [
    ButtonModule,
    ReactiveFormsModule,
    FormsModule,
    TextareaModule,
    InputTextModule,
    SelectModule,
    Fluid,
    DatePickerModule,
    ChipModule,
    AutoCompleteModule
  ],
  templateUrl: './board-form.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  protected readonly statuses = Object.values(TaskStatus);
  protected readonly priorities: TaskPriorities[] = [
    {
      label: 'Urgente',
      value: 'urgent',
    },
    {
      label: 'Regular',
      value: 'regular',
    },
    {
      label: 'Importante',
      value: 'important',
    },
  ];
  protected form!: FormGroup;

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      description: [''],
      memberTeam: [''],
    });
  }
  suggestions: any[] = [];
  filteredSuggestions: any[] = [];

  filterSuggestion(event: any) {
    const query = event.query;
    this.filteredSuggestions = this.suggestions.filter((suggestion) => suggestion.name.toLowerCase().includes(query.toLowerCase()));
  }

  onSubmit() {
    console.log(this.form.value);
  }
  get name(): AbstractControl {
    return this.form.controls['name'];
  }

  get description(): AbstractControl {
    return this.form.controls['description'];
  }

  get memberTeam(): AbstractControl {
    return this.form.controls['memberTeam'];
  }

}
