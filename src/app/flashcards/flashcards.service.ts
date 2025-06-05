import { Injectable, signal } from '@angular/core';
import { Card, NewCard, type NewSet, type Sets } from '../sets-model';
import { Subject } from 'rxjs';
import { cards, Flashcards } from './flashcards';

@Injectable({ providedIn: 'root' })
export class FlashcardsService {
  constructor() {
    const sets = localStorage.getItem('sets');
    const cards = localStorage.getItem('cards');

    if (sets) {
      this.sets.set(JSON.parse(sets));
    }

    if (cards) {
      this.cards.set(JSON.parse(cards));
    }
  }

  private sets = signal<Sets>(Flashcards);

  private cards = signal<Card[]>(cards);

  allSets = this.sets.asReadonly();

  allCards = this.cards.asReadonly();

  updateCard$ = new Subject<{
    term: string;
    definition: string;
    id: string;
  }>();

  addSetAndCards(newSet: NewSet, newCards: NewCard[]) {
    const setId = new Date().getTime().toString();

    this.sets.update((oldsets) => [...oldsets, { ...newSet, setId: setId }]);

    const cards: Card[] = newCards.map((newCards) => ({
      ...newCards,
      setId: setId,
    }));

    this.cards.update((oldCards) => [...oldCards, ...cards]);
  }

  getCards(setId: string) {
    return this.cards().filter((card) => card.setId === setId);
  }

  deleteSet(setId: string) {
    this.sets.update((oldSets) => oldSets.filter((set) => set.setId !== setId));
    this.cards.update((oldcards) =>
      oldcards.filter((card) => card.setId !== setId)
    );
    this.saveSets();
    this.saveCards();
  }

  getCard(cardId: string) {
    return this.allCards().find((card) => card.id === cardId);
  }

  replaceCard(updatedCard: Card) {
    this.cards.update((oldCards) =>
      oldCards.map((card) => (card.id === updatedCard.id ? updatedCard : card))
    );
    this.saveCards();
  }

  swapCards(setId: string) {
    this.cards.update((oldCards) =>
      oldCards.map((card) =>
        card.setId === setId
          ? { ...card, term: card.definition, definition: card.term }
          : card
      )
    );

    this.saveCards();
  }

  private saveSets() {
    localStorage.setItem('sets', JSON.stringify(this.sets()));
  }

  private saveCards() {
    localStorage.setItem('cards', JSON.stringify(this.cards()));
  }

  // addSet(newSet: NewSet) {
  //   this.sets.update((oldSet) => [
  //     ...oldSet,
  //     { ...newSet, setId: new Date().getTime().toString() },
  //   ]);
  //   this.saveSets();
  // }

  // deleteSet(id: string) {
  //   this.sets.update((oldSets) => oldSets.filter((set) => set.setId !== id));
  //   this.saveSets();
  // }

  // getCard(setId: string, cardId: string) {
  //   return this.allSets()
  //     .find((set) => set.setId === setId)!
  //     .cards.find((card) => card.id === cardId);
  // }

  // replaceCard(updatedCard: Card, setId: string) {
  //   this.sets.update((sets) =>
  //     sets.map((oldSet) =>
  //       oldSet.setId === setId
  //         ? {
  //             ...oldSet,
  //             cards: oldSet.cards.map((card) =>
  //               updatedCard.id === card.id ? updatedCard : card
  //             ),
  //           }
  //         : oldSet
  //     )
  //   );
  //   this.saveSets();
  // }

  // private saveSets() {
  //   localStorage.setItem('sets', JSON.stringify(this.sets()));
  // }

  // swapCards(setId: string) {
  //   this.sets.update((oldSets) =>
  //     oldSets.map((oldSet) =>
  //       oldSet.setId !== setId
  //         ? oldSet
  //         : {
  //             ...oldSet,
  //             cards: oldSet.cards.map((oldCard) => ({
  //               ...oldCard,
  //               term: oldCard.definition,
  //               definition: oldCard.term,
  //             })),
  //           }
  //     )
  //   );

  //   this.saveSets();
  // }
}
