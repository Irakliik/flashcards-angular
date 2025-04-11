import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { FlashcardsService } from '../flashcards.service';
import { Sets } from '../sets-model';
import { SetsMenuItemComponent } from './sets-menu-item/sets-menu-item.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SetsMenuItemComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  constructor(private flashcardsService: FlashcardsService) {
    console.log(flashcardsService);
  }

  sets!: Sets;

  ngOnInit(): void {
    this.sets = this.flashcardsService.sets;
  }
}
