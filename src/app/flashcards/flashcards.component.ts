import {
  Component,
  computed,
  ElementRef,
  inject,
  OnInit,
  signal,
  viewChild,
  ViewChild,
} from '@angular/core';
import { FlashcardsService } from '../flashcards.service';
import { CardSet } from '../sets-model';
import { ActivatedRoute } from '@angular/router';
import { ButtonComponent } from '../shared/button/button.component';
import { BoardComponent } from './board/board.component';

@Component({
  selector: 'app-flashcards',
  standalone: true,
  imports: [BoardComponent],
  templateUrl: './flashcards.component.html',
  styleUrl: './flashcards.component.css',
})
export class FlashcardsComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute) {}
  flashcardsService = inject(FlashcardsService);

  selectedSet!: CardSet;
  selectedCard = signal<{
    term: string;
    definition: string;
    id: string;
  }>({
    term: '',
    definition: '',
    id: '',
  });

  totalCardsNum!: number;
  selectedCardNum: number = 0;

  term = true;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.selectedSet = this.flashcardsService
        .allSets()
        .find((set) => set.setId === params['id'])!;
    });
    this.selectedCard.set(this.selectedSet.cards[0]);
    this.totalCardsNum = this.selectedSet.cards.length;

    this.flashcardsService.updateCard$.subscribe((newCard) => {
      this.flashcardsService.updateCard(
        this.selectedCard().id,
        newCard.cardId,
        newCard.newTerm,
        newCard.newDefinition
      );
    });
  }

  onPreviousCard() {
    if (0 < this.selectedCardNum) {
      this.selectedCardNum--;
      // console.log(this.selectedCardNum);
      this.selectedCard.set(this.selectedSet.cards[this.selectedCardNum]);
      this.term = true;
    }
  }

  onNextCard() {
    if (this.selectedCardNum < this.totalCardsNum - 1) {
      this.selectedCardNum++;
      this.selectedCard.set(this.selectedSet.cards[this.selectedCardNum]);
      console.log(this.selectedCardNum, this.totalCardsNum);
      this.term = true;
    }
  }

  onSwapBtn() {
    this.selectedSet.cards.forEach((card) => {
      [card.term, card.definition] = [card.definition, card.term];
    });
    this.term = true;

    console.log(this.selectedCard);
  }
}
