import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  OnInit,
  output,
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
import { CustomLabelDirective } from '../../../shared/directives/custom-label.directive';
import { BoardsHttpService } from '../../services/boards-http.service';
import { DialogModule } from 'primeng/dialog';
import { ErrorMessageDirective } from '../../../shared/directives/custom-error.directive';
import { AuthService } from '../../../auth/services/auth.service';
import { JsonPipe } from '@angular/common';

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
    CustomLabelDirective,
    DialogModule,
    ErrorMessageDirective,
  ],
  templateUrl: './board-form.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  protected readonly authService = inject(AuthService);
  private readonly boardsHttpService = inject(BoardsHttpService);
  protected readonly taskStatuses = TaskStatus;
  reloadBoards = output<boolean>();
  visible = signal<boolean>(false);
  form!: FormGroup;

  ngOnInit() {
    this.buildForm();
  }
  buildForm() {
    this.form = this.fb.group({
      owner: ['', [Validators.required]],
      name: ['', [Validators.required]],
      description: [''],
    });
  }

  setOwner = effect(() => {
    this.owner.setValue(this.authService.user()?.id);
  });

  onSubmit() {
    if (!this.form.valid) return;
    this.boardsHttpService.create(this.form.value).subscribe((res) => {
      this.form.reset();
      this.visible.set(false);
      this.reloadBoards.emit(true);
    });
  }

  get name(): AbstractControl {
    return this.form.controls['name'];
  }

  get description(): AbstractControl {
    return this.form.controls['description'];
  }
  get owner(): AbstractControl {
    return this.form.controls['owner'];
  }
}
