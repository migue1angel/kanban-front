import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-login',
  imports: [
    ButtonModule,
    RippleModule,
    RouterLink,
    ReactiveFormsModule,
    ],
  templateUrl: './login.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {

  protected formBuilder = inject(FormBuilder);
  protected form! : FormGroup;
  protected validators = Validators
  
  constructor (){
    this.formBuild();
  }

  formBuild(){
    this.form = this.formBuilder.group({
      email : ['', [Validators.required, Validators.email]],
      password : ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  submit(){
    this.form.markAllAsTouched();
    if(this.form.valid){
      console.log(this.form.value)
      this.login();
    }
  }

  login(){}

  get emailField():AbstractControl{
    return this.form.controls['email'];
  }

  get passwordField():AbstractControl{
    return this.form.controls['password'];
  }

 }