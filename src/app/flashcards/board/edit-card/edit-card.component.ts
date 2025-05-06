import { Component, inject, input, model, output, signal } from '@angular/core';
import { Card } from '../../../sets-model';
import { FlashcardsService } from '../../../flashcards.service';

@Component({
  selector: 'app-edit-card',
  standalone: true,
  imports: [],
  templateUrl: './edit-card.component.html',
  styleUrl: './edit-card.component.css',
})
export class EditCardComponent {
  private flashcardsService = inject(FlashcardsService);
  selectedCard = model.required<Card>();
  closeModal = output();
  termFocused = false;
  definitionFocused = false;

  onCloseBtn() {
    this.closeModal.emit();
  }

  onSubmit(newTerm: string, newDefinition: string, e: Event) {
    // e.preventDefault();
    e.preventDefault();

    this.selectedCard.update((oldCard) => {
      return { ...oldCard, term: newTerm, definition: newDefinition };
    });

    this.flashcardsService.updateCard$.next({
      newTerm,
      newDefinition,
      cardId: this.selectedCard().id,
    });

    this.onCloseBtn();
  }
}
