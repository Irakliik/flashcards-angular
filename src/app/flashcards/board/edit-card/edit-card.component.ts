import {
  afterNextRender,
  Component,
  inject,
  model,
  output,
  viewChild,
} from '@angular/core';
import { Card } from '../../../sets-model';
import { FlashcardsService } from '../../../flashcards.service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-card',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-card.component.html',
  styleUrl: './edit-card.component.css',
})
export class EditCardComponent {
  private form = viewChild.required<NgForm>('form');
  private flashcardsService = inject(FlashcardsService);
  selectedCard = model.required<Card>();
  closeModal = output();
  termFocused = false;
  definitionFocused = false;

  constructor() {
    afterNextRender(() => {
      setTimeout(() => {
        this.form().setValue({
          newTerm: this.selectedCard().term,
          newDefinition: this.selectedCard().definition,
        });
      }, 1);
    });
  }

  onCloseBtn() {
    this.closeModal.emit();
  }

  onSubmit(e: Event) {
    // e.preventDefault();
    e.preventDefault();

    const newTerm = this.form().form.value.newTerm;
    const newDefinition = this.form().form.value.newDefinition;

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
