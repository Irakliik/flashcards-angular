import {
  Component,
  computed,
  effect,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { FlashcardsService } from '../flashcards.service';
import { Card, CardSet } from '../sets-model';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ButtonComponent } from '../shared/button/button.component';
import { BoardComponent } from './board/board.component';
import { toObservable } from '@angular/core/rxjs-interop';
import { EditCardComponent } from './board/edit-card/edit-card.component';

@Component({
  selector: 'app-flashcards',
  standalone: true,
  imports: [BoardComponent, RouterOutlet],
  templateUrl: './flashcards.component.html',
  styleUrl: './flashcards.component.css',
})
export class FlashcardsComponent implements OnInit {
  setId = input.required<string>();

  flashcardsService = inject(FlashcardsService);

  selectedSet = computed(() =>
    this.flashcardsService.allSets().find((set) => set.setId === this.setId())
  );
  selectedCard = signal({
    term: '',
    definition: '',
    id: '',
  });

  totalCardsNum!: number;
  selectedCardNum: number = 0;

  isTerm = true;

  ngOnInit(): void {
    this.selectedCard.set(this.selectedSet()!.cards[0]);
    this.totalCardsNum = this.selectedSet()!.cards.length;

    this.flashcardsService.updateCard$.subscribe({
      next: (newCard) => {
        this.flashcardsService.replaceCard(newCard, this.selectedSet()!.setId);
        this.selectedCard.set(this.selectedSet()!.cards[this.selectedCardNum]);
      },
    });
  }

  onPreviousCard() {
    if (0 < this.selectedCardNum) {
      this.selectedCardNum--;
      this.selectedCard.set(this.selectedSet()!.cards[this.selectedCardNum]);
      this.isTerm = true;
    }
  }

  onNextCard() {
    if (this.selectedCardNum < this.totalCardsNum - 1) {
      this.selectedCardNum++;
      this.selectedCard.set(this.selectedSet()!.cards[this.selectedCardNum]);
      this.isTerm = true;
    }
  }

  onSwapBtn() {
    this.selectedSet()!.cards.forEach((card) => {
      [card.term, card.definition] = [card.definition, card.term];
    });
    this.isTerm = true;
  }
}
