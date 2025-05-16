import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  PLATFORM_ID,
  input,
} from '@angular/core';
import {
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormArray,
} from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MultiSelectModule } from 'primeng/multiselect';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { of } from 'rxjs';
import { User } from '../../../auth/models/user.model';
import { UsersHttpService } from '../../../auth/services/users-http.service';
import { FluidModule } from 'primeng/fluid';

@Component({
  selector: 'team-member-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AutoCompleteModule,
    MultiSelectModule,
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    MessageModule,
    FluidModule
  ],
  templateUrl: './team-member-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamMemberFormComponent {
  private readonly usersHttpService = inject(UsersHttpService);
  private readonly fb = inject(FormBuilder);
  public boardId = input.required<string>();
  searchCtrl = this.fb.control('');
  userSuggestions: User[] = [];
  loading = signal(false);

  // Roles disponibles
  rolesOptions = ['Admin', 'User', 'Guest', 'Member'];

  // FormArray para miembros agregados
  membersForm = this.fb.group({
    members: this.fb.array([]),
  });

  // Para mensajes de error
  errorMsg = signal('');

  isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  constructor() {
    // No debounce necesario, el autocomplete ya tiene delay
  }

  get members(): FormArray {
    return this.membersForm.get('members') as FormArray;
  }

  // Cuando el usuario escribe en el autocomplete
  onSearch(event: any) {
    const query = event.query;
    if (!query) {
      this.userSuggestions = [];
      return;
    }
    this.loading.set(true);
    this.usersHttpService.findByEmailOrUsername(query).subscribe({
      next: (users) => {
        this.userSuggestions = users;
        this.loading.set(false);
      },
      error: () => {
        this.userSuggestions = [];
        this.loading.set(false);
      }
    });
  }

  // Cuando selecciona un usuario
  onSelectUser(user: User) {
    // Evitar duplicados
    if (this.members.value.some((m: any) => m.user.id === user.id)) {
      this.errorMsg.set('El usuario ya está en la lista.');
      return;
    }
    this.errorMsg.set('');
    this.members.push(
      this.fb.group({
        user: [user, Validators.required],
        roles: [[], Validators.required],
        board: [this.boardId(), Validators.required],
      })
    );
    this.searchCtrl.setValue('');
    this.userSuggestions = [];
  }

  // Eliminar usuario de la lista
  removeMember(idx: number) {
    this.members.removeAt(idx);
  }

  // Validar antes de guardar
  onSave() {
    this.errorMsg.set('');
    if (this.members.length === 0) {
      this.errorMsg.set('Agrega al menos un miembro.');
      return;
    }
    for (let i = 0; i < this.members.length; i++) {
      const member = this.members.at(i);
      if (!member.value.roles || member.value.roles.length === 0) {
        this.errorMsg.set('Cada usuario debe tener al menos un rol.');
        return;
      }
    }
    console.log(this.membersForm.value);
    // Aquí puedes enviar los datos al backend
    
    // Aquí envías los datos al backend
    // this.membersForm.value.members
  }

}
