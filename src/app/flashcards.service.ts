import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class FlashcardsService {
  constructor() {
    const sets = localStorage.getItem('sets');

    if (sets) {
      this.sets = JSON.parse(sets);
    }
  }

  sets: {
    title: string;
    description: string;
    setId: string;
    cards: {
      term: string;
      definition: string;
      id: string;
    }[];
  }[] = [
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

  addSet(newSet: {
    title: string;
    description: string;
    cards: {
      term: string;
      definition: string;
      id: string;
    }[];
  }) {
    this.sets.unshift({ ...newSet, setId: new Date().getTime().toString() });
    this.saveSets();
    console.log(this.sets);
  }

  private saveSets() {
    localStorage.setItem('sets', JSON.stringify(this.sets));
  }
}
