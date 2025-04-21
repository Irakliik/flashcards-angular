import { Component, input, OnInit, output } from '@angular/core';
import { FlashcardsService } from '../../flashcards.service';
import { CardSet, Sets } from '../../sets-model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sets-menu-item',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sets-menu-item.component.html',
  styleUrl: './sets-menu-item.component.css',
})
export class SetsMenuItemComponent {
  constructor(private flashcardsService: FlashcardsService) {
    // console.log(flashcardsService);
  }

  delete = output<string>();

  cardSet = input.required<CardSet>();

  onDeleteBtn(e: Event) {
    e.preventDefault();
    this.delete.emit(this.cardSet().setId);
  }
}
