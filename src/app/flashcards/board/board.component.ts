import {
  Component,
  computed,
  ElementRef,
  inject,
  model,
  signal,
  ViewChild,
} from '@angular/core';
import { Card } from '../../sets-model';
import { ActivatedRoute, Router } from '@angular/router';
import { single } from 'rxjs';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css',
})
export class BoardComponent {
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  selectedCard = model.required<Card>();
  isTerm = model.required<boolean>();
  front = signal(true);
  // deg = signal(0);
  rotate = false;
  backVisible = false;
  frontVisible = true;
  toolsInvisible = false;
  hidden = false;

  turnCard() {
    // this.deg.set((this.deg() + 180) % 360);
    this.rotate = !this.rotate;
    this.front.update((pos) => !pos);

    if (this.rotate) {
      this.frontVisible = false;
      this.toolsInvisible = true;
      setTimeout(() => {
        this.backVisible = true;
        this.hidden = true;
      }, 100);
    }

    if (!this.rotate) {
      this.backVisible = false;
      this.toolsInvisible = false;

      setTimeout(() => {
        this.frontVisible = true;
        this.hidden = false;
      }, 100);
    }
  }

  onEditCard(e: Event) {
    e.stopPropagation();
    this.router.navigate(['./edit', this.selectedCard().id], {
      relativeTo: this.activatedRoute,
    });
  }
}
