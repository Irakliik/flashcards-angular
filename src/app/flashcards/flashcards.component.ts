import {
  Component,
  computed,
  effect,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { FlashcardsService } from './flashcards.service';
import { RouterOutlet } from '@angular/router';
import { BoardComponent } from './board/board.component';
import { Card } from '../sets-model';

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

  selectedCards = signal<Card[]>([
    {
      id: '',
      term: '',
      definition: '',
      setId: '',
    },
  ]);

  totalCardsNum = computed(() => this.selectedCards().length);
  selectedCardNum = signal(0);

  selectedCard = computed(() => this.selectedCards()[this.selectedCardNum()]);

  isTerm = true;
  hintShown = false;

  constructor() {
    effect(() => {
      console.log(this.selectedCard());
    });
  }

  ngOnInit(): void {
    this.selectedCards.set(
      this.flashcardsService
        .allCards()
        .filter((set) => set.setId === this.setId())
    );

    this.flashcardsService.updateCard$.subscribe({
      next: (newCard) => {
        this.flashcardsService.replaceCard({
          ...newCard,
          setId: this.selectedSet()!.setId,
        });
      },
    });
  }

  onPreviousCard() {
    if (0 < this.selectedCardNum()) {
      this.selectedCardNum.update((val) => --val);
      this.isTerm = true;
      this.hintShown = false;
    }
  }

  onNextCard() {
    if (this.selectedCardNum() < this.totalCardsNum() - 1) {
      this.selectedCardNum.update((val) => ++val);
      this.isTerm = true;
      this.hintShown = false;
    }
  }

  onSwapBtn() {
    this.flashcardsService.swapCards(this.selectedSet()!.setId);
    this.isTerm = true;
    this.hintShown = false;
  }

  onShuffle() {
    this.selectedCards.update((oldCards) => [
      ...this.flashcardsService.shuffleCards(oldCards),
    ]);
  }
}
