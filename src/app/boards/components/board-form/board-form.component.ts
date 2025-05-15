import {
  ChangeDetectionStrategy,
  Component,
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
  private readonly boardsHttpService = inject(BoardsHttpService);
  protected readonly taskStatuses = TaskStatus;
  reloadBoards = output<boolean>();

  protected form!: FormGroup;
  visible = signal<boolean>(false);

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      owner: ['1dc0951d-0f82-459b-9705-72c4b375cfe7'],
      name: ['', [Validators.required]],
      description: ['some description'],
    });
  }

  onSubmit() {
    if (!this.form.valid) return;
    this.boardsHttpService.create(this.form.value).subscribe((res) => {
      console.log(res);

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
}
