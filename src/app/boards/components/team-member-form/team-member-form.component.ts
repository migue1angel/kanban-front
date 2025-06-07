import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  input,
  OnInit,
  output,
} from '@angular/core';
import {
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormArray,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MultiSelectModule } from 'primeng/multiselect';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { User } from '../../../auth/models/user.model';
import { UsersHttpService } from '../../../auth/services/users-http.service';
import { FluidModule } from 'primeng/fluid';
import { TeamMembersHttpService } from '../../services/team-members-http.service';
import { Role } from '../../models/role.model';
import { RolesHttpService } from '../../services/roles-http.service';

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
    FluidModule,
  ],
  templateUrl: './team-member-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamMemberFormComponent implements OnInit {
  private readonly usersHttpService = inject(UsersHttpService);
  private readonly teamMembersHttpService = inject(TeamMembersHttpService);
  private readonly rolesHttpService = inject(RolesHttpService);
  private readonly fb = inject(FormBuilder);
  public boardId = input.required<string>();
  protected searchCtrl = this.fb.control('');
  protected userSuggestions: User[] = [];
  protected loading = signal(false);
  protected roles = signal<Role[]>([]);
  protected errorMsg = signal('');
  protected dialogVisible = output<boolean>();
  protected membersForm = this.fb.group({
    members: this.fb.array([]),
  });

  ngOnInit(): void {
    this.getRoles();
  }

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
      },
    });
  }

  onSelectUser(user: User) {
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

  removeMember(idx: number) {
    this.members.removeAt(idx);
  }

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

    this.teamMembersHttpService
      .addTeamMembers(this.members.value)
      .subscribe((res) => {
        this.dialogVisible.emit(false);
      });
  }

  getRoles() {
    this.rolesHttpService.findAll().subscribe((res) => this.roles.set(res));
  }

  get members(): FormArray {
    return this.membersForm.get('members') as FormArray;
  }
}
