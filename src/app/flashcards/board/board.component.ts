import { Component, EventEmitter, input, model, Output } from '@angular/core';
import { Card } from '../../sets-model';
import { EditCardComponent } from './edit-card/edit-card.component';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [EditCardComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css',
})
export class BoardComponent {
  isEditing = false;
  selectedCard = model.required<Card>();

  term = model.required<boolean>();

  turnCard() {
    this.term.update((term) => !term);
  }

  @Output() swap = new EventEmitter();

  onSwapBtn(e: Event) {
    e.stopPropagation();
    this.swap.emit();
  }

  onEditCard(e: Event) {
    e.stopPropagation();
    this.isEditing = true;
  }

  onCloseModal() {
    console.log(123);
    this.isEditing = false;
  }
}
