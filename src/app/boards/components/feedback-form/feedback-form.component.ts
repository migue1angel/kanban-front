import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  output,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FluidModule } from 'primeng/fluid';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { CustomLabelDirective } from '../../../shared/directives/custom-label.directive';
import { JsonPipe } from '@angular/common';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'feedback-form',
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    FluidModule,
    TextareaModule,
    InputTextModule,
    CustomLabelDirective,
    JsonPipe,
  ],
  templateUrl: './feedback-form.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackFormComponent {
  protected showFeedbackForm = output<boolean>();
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  public taskIdInput = input<string>();
  public form = this.fb.group({
    content: ['', [Validators.required]],
    userId: [null, [Validators.required]],
    taskId: [null, [Validators.required]],
  });
  setFormValues = effect(() => {
    this.userId.setValue(this.authService.user()?.id);
    this.taskId.setValue(this.taskIdInput());
  });

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);//enviar a guardar feedback en el servidor
      this.showFeedbackForm.emit(false);
    }
  }
  get content(): AbstractControl {
    return this.form.controls['content'];
  }
  get userId(): AbstractControl {
    return this.form.controls['userId'];
  }
  get taskId(): AbstractControl {
    return this.form.controls['taskId'];
  }
}
