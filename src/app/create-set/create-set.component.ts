import { Component } from '@angular/core';
import { CreatingCardComponent } from './creating-card/creating-card.component';

@Component({
  selector: 'app-create-set',
  standalone: true,
  imports: [CreatingCardComponent],
  templateUrl: './create-set.component.html',
  styleUrl: './create-set.component.css',
})
export class CreateSetComponent {}
