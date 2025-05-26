import {
  afterNextRender,
  Component,
  inject,
  output,
  viewChild,
} from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateSetService } from '../create-set.service';

@Component({
  selector: 'app-import-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './import-modal.component.html',
  styleUrl: './import-modal.component.css',
})
export class ImportModalComponent {
  isFocused = false;
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  form = viewChild.required<NgForm>('form');
  createSetService = inject(CreateSetService);

  constructor() {
    afterNextRender(() => {
      setTimeout(() => {
        this.form().controls['import'].setValue(
          'lamazo fakizo\nzura zaza\ngaga gugu'
        );
      }, 1);
    });
  }

  onCancel() {
    this.router.navigate(['..'], { relativeTo: this.activatedRoute });
  }

  onSubmit(form: NgForm) {
    const extractedCards = form.value.import.split('\n').map((el: string) => {
      const split = el.split(' ');

      return {
        term: split[0],
        definition: split[1],
      };
    });

    this.createSetService.extractedCards$.next(extractedCards);
    this.onCancel();
  }
}
