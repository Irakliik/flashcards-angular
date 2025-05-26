import { Component, inject } from '@angular/core';
import { CreatingCardComponent } from './creating-card/creating-card.component';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ImportModalComponent } from './import-modal/import-modal.component';
import { ButtonComponent } from '../shared/button/button.component';
import { FlashcardsService } from '../flashcards.service';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { Card } from '../sets-model';

@Component({
  selector: 'app-create-set',
  standalone: true,
  imports: [
    CreatingCardComponent,
    ReactiveFormsModule,
    ButtonComponent,
    RouterOutlet,
  ],
  templateUrl: './create-set.component.html',
  styleUrl: './create-set.component.css',
})
export class CreateSetComponent {
  flashcardsService = inject(FlashcardsService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);

  form = new FormGroup({
    title: new FormControl('', {
      validators: [Validators.required],
    }),
    description: new FormControl(''),

    creatingCards: new FormArray([
      new FormGroup({
        term: new FormControl(''),
        definition: new FormControl(''),
        id: new FormControl('c1'),
      }),
      new FormGroup({
        term: new FormControl(''),
        definition: new FormControl(''),
        id: new FormControl('c2'),
      }),
      new FormGroup({
        term: new FormControl(''),
        definition: new FormControl(''),
        id: new FormControl('c3'),
      }),
    ]),
  });

  get creatingCards() {
    return this.form.controls.creatingCards.controls;
  }

  onDelete(id: string) {
    const index = this.form.controls.creatingCards.value.findIndex(
      (el) => el.id === id
    );

    (this.form.get('creatingCards') as FormArray).removeAt(index);
  }

  onAddCard() {
    this.form.controls.creatingCards.push(
      new FormGroup({
        term: new FormControl(''),
        definition: new FormControl(''),
        id: new FormControl(new Date().getTime().toString()),
      })
    );
  }

  onSubmit() {
    const cardsValue = this.form.get('creatingCards')!.value as Card[];
    const title = this.form.get('title')!.value as string;
    const description = this.form.get('description')!.value as string;

    const cards = cardsValue.filter(
      (creatingCard) => creatingCard.definition && creatingCard.term
    );

    this.flashcardsService.addSet({
      title: title,
      description: description,
      cards: cards,
    });
    this.router.navigate(['']);
  }

  onSwap() {
    (this.form.get('creatingCards') as FormArray).controls.forEach((el) => {
      const term = el.get('term')!.value;
      const definition = el.get('definition')!.value;

      el.patchValue({
        term: definition,
        definition: term,
      });
    });
  }

  onImport() {
    this.router.navigate(['import'], { relativeTo: this.activatedRoute });
  }
}
