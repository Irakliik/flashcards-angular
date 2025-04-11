import { Component, input, OnInit } from '@angular/core';
import { FlashcardsService } from '../../flashcards.service';
import { CardSet, Sets } from '../../sets-model';

@Component({
  selector: 'app-sets-menu-item',
  standalone: true,
  imports: [],
  templateUrl: './sets-menu-item.component.html',
  styleUrl: './sets-menu-item.component.css',
})
export class SetsMenuItemComponent {
  constructor(private flashcardsService: FlashcardsService) {
    console.log(flashcardsService);
  }

  cardSet = input.required<CardSet>();
}
