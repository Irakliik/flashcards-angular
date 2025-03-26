import { Component } from '@angular/core';

@Component({
  selector: 'li[appCreatingCard]',
  standalone: true,
  imports: [],
  templateUrl: './creating-card.component.html',
  styleUrl: './creating-card.component.css',
  host: {
    class: 'creating-card',
  },
})
export class CreatingCardComponent {}
