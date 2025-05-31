import { Component, inject, OnInit, Signal, signal } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { FlashcardsService } from '../flashcards/flashcards.service';
import { Sets } from '../sets-model';
import { SetsMenuItemComponent } from './sets-menu-item/sets-menu-item.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SetsMenuItemComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  flashcardsService = inject(FlashcardsService);

  sets = this.flashcardsService.allSets;

  onDelete(id: string) {
    this.flashcardsService.deleteSet(id);
  }
}
