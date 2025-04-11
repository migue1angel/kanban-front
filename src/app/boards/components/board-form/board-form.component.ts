import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
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
import { TaskStatus } from '../../models/task.model';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { TextareaModule } from 'primeng/textarea';
import { Fluid } from 'primeng/fluid';
import { ChipModule } from 'primeng/chip';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TeamMemberFormComponent } from '../team-member-form/team-member-form.component';
import { CustomLabelDirective } from '../../../shared/directives/custom-label.directive';

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
    AutoCompleteModule,
    TeamMemberFormComponent,
    CustomLabelDirective,
  ],
  templateUrl: './board-form.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardFormComponent implements OnInit {
  protected membersTeam = signal<string[]>([]);
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
      owner: ['eae7eafb-238a-4dff-b2d4-8163e869ff0a'],
      name: ['', [Validators.required]],
      description: [''],
      memberTeam: [''],
    });
  }

  addMember(member: string) {
    if (member && !this.membersTeam().includes(member)) {
      this.membersTeam.update((prev) => [...prev, member]);
    }
  }
  removeMember(member: string) {
    this.membersTeam.update((prev) => prev.filter((m) => m !== member));
  }

  onSubmit() {
    if (!this.form.valid) return;
    
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
