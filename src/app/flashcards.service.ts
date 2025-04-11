import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { type NewSet, type Sets } from './sets-model';

@Injectable({ providedIn: 'root' })
export class FlashcardsService {
  constructor() {
    const sets = localStorage.getItem('sets');

    if (sets) {
      this.sets = JSON.parse(sets);
    }
  }

  sets: Sets = [
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
  ];

  addSet(newSet: NewSet) {
    this.sets.unshift({ ...newSet, setId: new Date().getTime().toString() });
    this.saveSets();
    console.log(this.sets);
  }

  private saveSets() {
    localStorage.setItem('sets', JSON.stringify(this.sets));
  }
}
