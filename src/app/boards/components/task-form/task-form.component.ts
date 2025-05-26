import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  input,
  OnInit,
  output,
  signal,
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
import { TasksHttpService } from '../../services/tasks-http.service';
import { TasksService } from '../../services/tasks.service';
import { TeamMember } from '../../models/team-member.model';
import { TeamMembersHttpService } from '../../services/team-members-http.service';
import { MultiSelectModule } from 'primeng/multiselect';
import { CustomLabelDirective } from '../../../shared/directives/custom-label.directive';

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
    MultiSelectModule,
    CustomLabelDirective,
  ],
  templateUrl: './task-form.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskFormComponent implements OnInit {
  public boardId = input.required<string>();
  private readonly fb = inject(FormBuilder);
  private readonly tasksHttpService = inject(TasksHttpService);
  private readonly teamMembersHttpService = inject(TeamMembersHttpService);
  private readonly tasksService = inject(TasksService);
  protected closeDialog = output<boolean>();
  protected readonly teamMembers = signal<TeamMember[]>([]);
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
    this.getTeamMembers();
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      title: ['', [Validators.required]],
      description: [''],
      dueDate: [new Date(), [Validators.required]],
      priority: [null, [Validators.required]],
      board: [this.boardId(), [Validators.required]],
      taskAssignments: [[]],
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.createTask();
  }

  createTask() {
    this.tasksHttpService.create(this.form.value).subscribe((res) => {
      this.tasksService.getTasks(this.boardId());
      this.closeDialog.emit(false);
      this.form.reset();
      this.form.controls['dueDate'].setValue(new Date());
      this.form.controls['board'].setValue(this.boardId());
    });
  }

  getTeamMembers() {
    this.teamMembersHttpService
      .getTeamMembersByBoard(this.boardId())
      .subscribe((res) => this.teamMembers.set(res));
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
  get board(): AbstractControl {
    return this.form.controls['board'];
  }
  get taskAssignments(): AbstractControl {
    return this.form.controls['taskAssignments'];
  }
}
