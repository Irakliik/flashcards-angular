import {
  Component,
  EventEmitter,
  inject,
  input,
  model,
  Output,
} from '@angular/core';
import { Card } from '../../sets-model';
import { EditCardComponent } from './edit-card/edit-card.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [EditCardComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css',
})
export class BoardComponent {
  isEditing = false;
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
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
    // this.isEditing = true;
    this.router.navigate(['./edit', this.selectedCard().id], {
      relativeTo: this.activatedRoute,
    });
  }

  onCloseModal() {
    console.log(123);
    // this.isEditing = false;
  }
}
