import {
  ChangeDetectionStrategy,
  Component,
  inject,
  output,
  resource,
  signal,
} from '@angular/core';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ChipModule } from 'primeng/chip';
import { rxResource } from '@angular/core/rxjs-interop';
import { UsersHttpService } from '../../../auth/services/users-http.service';
import { of } from 'rxjs';
import { User } from '../../../auth/models/user.model';

@Component({
  selector: 'team-member-form',
  imports: [AutoCompleteModule, ChipModule],
  templateUrl: './team-member-form.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamMemberFormComponent {
  private readonly usersHttpService = inject(UsersHttpService);
  query = signal('');
  memberTeam = output<User>();
  
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
}
