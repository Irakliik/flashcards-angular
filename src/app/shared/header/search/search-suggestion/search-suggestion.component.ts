import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardSet } from '../../../../sets-model';
import { FlashcardsService } from '../../../../flashcards/flashcards.service';

@Component({
  selector: '[app-search-suggestion]',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './search-suggestion.component.html',
  styleUrl: './search-suggestion.component.css',
})
export class SearchSuggestionComponent {
  flashcardsService = inject(FlashcardsService);
  set = input.required<CardSet>();
  cards = this.flashcardsService.getCards(this.set().setId);

  onClick() {}
}
