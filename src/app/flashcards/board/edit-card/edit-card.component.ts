import { Component, input, output, signal } from '@angular/core';
import { Card } from '../../../sets-model';

@Component({
  selector: 'app-edit-card',
  standalone: true,
  imports: [],
  templateUrl: './edit-card.component.html',
  styleUrl: './edit-card.component.css',
})
export class EditCardComponent {
  selectedCard = input.required<Card>();
  closeModal = output();
  termFocused = false;
  definitionFocused = false;
  onCloseBtn() {
    this.closeModal.emit();
  }

  onSubmit() {
    console.log(1 + 100);
  }
}
