import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardSet } from '../../../../sets-model';

@Component({
  selector: '[app-search-suggestion]',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './search-suggestion.component.html',
  styleUrl: './search-suggestion.component.css',
})
export class SearchSuggestionComponent {
  set = input.required<CardSet>();

  onClick() {}
}
