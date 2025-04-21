import { Routes } from '@angular/router';
import { CreateSetComponent } from './create-set/create-set.component';
import { HomeComponent } from './home/home.component';
import { FlashcardsComponent } from './flashcards/flashcards.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'create-set',
    component: CreateSetComponent,
  },

  {
    path: 'flashcards/:id',
    component: FlashcardsComponent,
  },
];
