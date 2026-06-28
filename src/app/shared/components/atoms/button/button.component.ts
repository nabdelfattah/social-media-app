import { NgTemplateOutlet } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-button',
  imports: [RouterLink, NgTemplateOutlet],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent implements OnChanges {
  @Input({ required: true }) tag!: 'button' | 'link';
  @Input() path: string = '';
  @Input() type: 'submit' | 'button' | 'reset' = 'button';
  @Input() disabled: boolean = false;
  @Input() variant: 'primary' | 'outline' | 'ghost' = 'primary';
  @Input() isFullWidth: boolean = false;
  @Input() handler: () => void = () => {};

  styles: Record<string, boolean> = {};

  ngOnChanges() {
    this.styles = {
      'bg-primary': this.variant == 'primary',
      'hover:bg-primary-dark': this.variant == 'primary',
      'text-white': this.variant == 'primary',
      'w-full': this.isFullWidth,
    };
  }
}
