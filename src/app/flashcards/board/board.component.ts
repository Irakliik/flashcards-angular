import {
  Component,
  EventEmitter,
  inject,
  input,
  model,
  output,
  Output,
} from '@angular/core';
import { Card } from '../../sets-model';
import { EditCardComponent } from './edit-card/edit-card.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css',
})
export class BoardComponent {
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  selectedCard = model.required<Card>();
  swap = output();
  isTerm = model.required<boolean>();

  turnCard() {
    this.isTerm.update((isTerm) => !isTerm);
  }

  onSwapBtn(e: Event) {
    e.stopPropagation();
    this.swap.emit();
  }

  onEditCard(e: Event) {
    e.stopPropagation();
    this.router.navigate(['./edit', this.selectedCard().id], {
      relativeTo: this.activatedRoute,
    });
  }
}
