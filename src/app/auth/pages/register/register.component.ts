import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-register',
  imports: [
    ButtonModule,
    RippleModule,
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: './register.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {

  protected formBuilder = inject(FormBuilder);
  protected form! : FormGroup
  protected validators = Validators

  constructor() {
    this.formBuild();
  }

  formBuild(){
    this.form = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  submit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      console.log(this.form.value);
    } 
  }

  register() {}

  get userNameField() : AbstractControl {
    return this.form.controls['userName'];
  }

  get emailField() : AbstractControl{
    return this.form.controls['email'];
  }

  get passwordField() : AbstractControl {
    return this.form.controls['password'];
  }


 }
