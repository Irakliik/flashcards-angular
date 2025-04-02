import { Component, output } from '@angular/core';

@Component({
  selector: 'app-import-modal',
  standalone: true,
  imports: [],
  templateUrl: './import-modal.component.html',
  styleUrl: './import-modal.component.css',
})
export class ImportModalComponent {
  isFocused = false;
  close = output<void>();

  onCancel() {
    this.close.emit();
  }
}
