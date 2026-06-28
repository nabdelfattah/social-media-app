import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input-err',
  imports: [],
  templateUrl: './input-err.component.html',
  styleUrl: './input-err.component.css',
})
export class InputErrComponent {
  @Input() message: string = '';
}
