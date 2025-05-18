import { Component, inject, output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-import-modal',
  standalone: true,
  imports: [],
  templateUrl: './import-modal.component.html',
  styleUrl: './import-modal.component.css',
})
export class ImportModalComponent {
  isFocused = false;
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);

  onCancel() {
    this.router.navigate(['..'], { relativeTo: this.activatedRoute });
  }
}
