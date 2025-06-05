import { Component, inject, input, OnInit, output } from '@angular/core';
import { FlashcardsService } from '../../flashcards/flashcards.service';
import { CardSet, Sets } from '../../sets-model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sets-menu-item',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sets-menu-item.component.html',
  styleUrl: './sets-menu-item.component.css',
})
export class SetsMenuItemComponent {
  delete = output<string>();

  flashcardsService = inject(FlashcardsService);

  cardSet = input.required<CardSet>();

  cards = this.flashcardsService.getCards(this.cardSet().setId);

  onDeleteBtn(e: Event) {
    e.preventDefault();
    this.delete.emit(this.cardSet().setId);
  }
}
