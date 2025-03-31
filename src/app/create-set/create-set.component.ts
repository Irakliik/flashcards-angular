import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { CreatingCardComponent } from './creating-card/creating-card.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ImportModalComponent } from './import-modal/import-modal.component';

@Component({
  selector: 'app-create-set',
  standalone: true,
  imports: [CreatingCardComponent, FormsModule, ImportModalComponent],
  templateUrl: './create-set.component.html',
  styleUrl: './create-set.component.css',
})
export class CreateSetComponent {
  title!: string;
  description?: string;

  isImporting = false;

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
    console.log(this.creatingCards);
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
