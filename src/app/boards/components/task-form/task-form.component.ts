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
  FormControl,
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

interface TaskPriorities {
  label: string;
  value: string;
}

@Component({
  selector: 'task-form',
  imports: [
    ButtonModule,
    ReactiveFormsModule,
    FormsModule,
    TextareaModule,
    InputTextModule,
    SelectModule,
    Fluid,
    DatePickerModule,
  ],
  templateUrl: './task-form.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskFormComponent implements OnInit {
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
      title: ['', [Validators.required]],
      description: [''],
      dueDate: [new Date(), [Validators.required]],
      priority: [TaskPriority.REGULAR, [Validators.required]],
    });
  }

  onSubmit() {
    console.log(this.form.value);
  }
  get title(): AbstractControl {
    return this.form.controls['title'];
  }

  get description(): AbstractControl {
    return this.form.controls['description'];
  }

  get dueDate(): AbstractControl {
    return this.form.controls['dueDate'];
  }

  get priority(): AbstractControl {
    return this.form.controls['priority'];
  }
}
