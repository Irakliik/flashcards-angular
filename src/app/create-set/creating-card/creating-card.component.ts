import { Component, Input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'li[appCreatingCard]',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './creating-card.component.html',
  styleUrl: './creating-card.component.css',
  host: {
    class: 'creating-card',
  },
})
export class CreatingCardComponent {
  @Input({ required: true }) creatingCard!: {
    id: string;
    term: string;
    definition: string;
  };

  @Input({ required: true }) cardNum!: number;

  delete = output<string>();

  onDeleteCreatingCard() {
    this.delete.emit(this.creatingCard.id);
  }
}
