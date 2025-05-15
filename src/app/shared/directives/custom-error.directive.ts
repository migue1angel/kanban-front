import {
  computed,
  Directive,
  effect,
  ElementRef,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appErrorMessage]',
  standalone: true
})
export class ErrorMessageDirective implements OnInit {
  private element!: HTMLElement;
  private readonly el = inject(ElementRef<HTMLElement>);
  
  public errors = input<ValidationErrors | null>(null);
  public touched = input<boolean>(false);
  public dirty = input<boolean>(false);


  ngOnInit(): void {
    this.element = this.el.nativeElement;
  }

  setErrorMessage = effect(() => {
    const errors = this.errors();
    const touched = this.touched();
    const dirty = this.dirty();

    if (!this.element) return;
    
    if (!errors || !touched) {
      this.element.classList.add('hidden');
      return;
    }

    this.element.classList.remove('hidden');
    this.element.classList.add('text-red-500');
    
    const errorKeys = errors ? Object.keys(errors) : [];
    
    if (errorKeys.includes('required')) {
      this.element.innerText = 'Este campo es requerido';
      return;
    }

    if (errorKeys.includes('minlength')) {
      const min = errors['minlength']['requiredLength'];
      const current = errors['minlength']['actualLength'];
      this.element.innerText = `${current}/${min} caracteres requeridos`;
      return;
    }
    
    if (errorKeys.length > 0) {
      this.element.innerText = 'Campo inválido';
    }
  });
}

