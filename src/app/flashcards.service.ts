import { Injectable, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { type NewSet, type Sets } from './sets-model';

@Injectable({ providedIn: 'root' })
export class FlashcardsService {
  constructor() {
    const sets = localStorage.getItem('sets');

    if (sets) {
      this.sets.set(JSON.parse(sets));
    }
  }

  private sets = signal<Sets>([
    {
      title: 'italian-english',
      description: 'animals',
      setId: 'm1',
      cards: [
        {
          id: 'c1',
          term: 'cane',
          definition: 'dog',
        },
        {
          id: 'c2',
          term: 'gatto',
          definition: 'cat',
        },
        {
          id: 'c3',
          term: 'pecora',
          definition: 'sheep',
        },
      ],
    },
  ]);

  allSets = this.sets.asReadonly();

  addSet(newSet: NewSet) {
    this.sets.update((oldSet) => [
      ...oldSet,
      { ...newSet, setId: new Date().getTime().toString() },
    ]);
    this.saveSets();
  }

  deleteSet(id: string) {
    this.sets.update((oldSets) => oldSets.filter((set) => set.setId !== id));
    this.saveSets();
  }

  private saveSets() {
    localStorage.setItem('sets', JSON.stringify(this.sets()));
  }
}
