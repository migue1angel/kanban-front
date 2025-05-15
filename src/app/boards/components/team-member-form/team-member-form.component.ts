import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ChipModule } from 'primeng/chip';
import { rxResource } from '@angular/core/rxjs-interop';
import { UsersHttpService } from '../../../auth/services/users-http.service';
import { of } from 'rxjs';
import { User } from '../../../auth/models/user.model';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { FluidModule } from 'primeng/fluid';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { MultiSelectModule } from 'primeng/multiselect';

@Component({
  selector: 'team-member-form',
  imports: [
    AutoCompleteModule,
    ChipModule,
    ReactiveFormsModule,
    FluidModule,
    ButtonModule,
    DividerModule,
    MultiSelectModule,
  ],
  templateUrl: './team-member-form.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamMemberFormComponent implements OnInit {
  private readonly usersHttpService = inject(UsersHttpService);
  private readonly fb = inject(FormBuilder);
  protected form!: FormGroup;
  query = signal('');
  memberTeam = output<User>();
  rolesOptions = signal<string[]>(['Admin', 'User', 'Guest', 'Member']);

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      user: [null],
      roles: [[]],
    });
  }

  suggestions = rxResource({
    request: () => ({
      query: this.query(),
    }),
    loader: ({ request }) => {
      if (!request.query) {
        return of([]);
      }
      return this.usersHttpService.findByEmailOrUsername(request.query);
    },
  });

  onSelectUser(user: User) {
    this.user.setValue(user);
    this.query.set('');
  }

  get user(): AbstractControl {
    return this.form.controls['user'];
  }

  get roles(): AbstractControl {
    return this.form.controls['roles'];
  }
}
