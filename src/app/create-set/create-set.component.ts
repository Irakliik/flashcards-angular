import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { CreatingCardComponent } from './creating-card/creating-card.component';
import { FormsModule } from '@angular/forms';
import { ImportModalComponent } from './import-modal/import-modal.component';
import { ButtonComponent } from '../shared/button/button.component';
import { FlashcardsService } from '../flashcards.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-set',
  standalone: true,
  imports: [
    CreatingCardComponent,
    FormsModule,
    ImportModalComponent,
    ButtonComponent,
  ],
  templateUrl: './create-set.component.html',
  styleUrl: './create-set.component.css',
})
export class CreateSetComponent {
  title!: string;
  description!: string;

  isImporting = false;

  @ViewChild('form') form!: ElementRef<HTMLFormElement>;

  constructor(
    private flashcardsService: FlashcardsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  creatingCards: {
    id: string;
    term: string;
    definition: string;
  }[] = [
    {
      id: 'c1',
      term: '',
      definition: '',
    },
    {
      id: 'c2',
      term: '',
      definition: '',
    },
    {
      id: 'c3',
      term: '',
      definition: '',
    },
  ];

  onDelete(id: string) {
    this.creatingCards = this.creatingCards.filter((el) => el.id !== id);
  }

  onAddCard() {
    this.creatingCards.push({
      id: new Date().getTime().toString(),
      term: '',
      definition: '',
    });
  }

  onSubmit() {
    const filteredCreatingCards = this.creatingCards.filter(
      (creatingCard) => creatingCard.definition && creatingCard.term
    );

    // console.log({
    //   title: this.title,
    //   description: this.description,
    //   filteredCreatingCards,
    // });

    this.flashcardsService.addSet({
      title: this.title,
      description: this.description,
      cards: filteredCreatingCards,
    });

    this.form.nativeElement.reset();

    this.router.navigate(['']);
  }

  onSwap() {
    this.creatingCards.forEach((el) => {
      [el.term, el.definition] = [el.definition, el.term];
    });
  }

  onImport() {
    this.isImporting = true;
  }
  onCloseImport() {
    this.isImporting = false;
  }
}
