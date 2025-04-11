import { ChangeDetectionStrategy, Component, output, signal } from '@angular/core';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ChipModule } from 'primeng/chip';

@Component({
  selector: 'team-member-form',
  imports: [AutoCompleteModule, ChipModule],
  templateUrl: './team-member-form.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamMemberFormComponent {

  memberTeam = output<string>();
  suggestions: any[] = [
    'John Doe',
    'Jane Smith',
    'Alice Johnson',
    'Bob Brown',
  ];
  filteredSuggestions: any[] = [];

  filterSuggestion(event: any) {
    const query = event.query.toLowerCase();  
    this.filteredSuggestions = this.suggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(query)
    );
  }

  
}
