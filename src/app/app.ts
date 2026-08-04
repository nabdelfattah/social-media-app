import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { initFlowbite } from 'flowbite';
import { NgxSpinnerComponent } from 'ngx-spinner';
import { LangService } from './core/services/lang.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgxSpinnerComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected readonly title = signal('Ripple');
  private readonly langService = inject(LangService);

  ngOnInit(): void {
    initFlowbite();
  }

  private translate = inject(TranslateService);
  constructor() {
    this.translate.addLangs(['ar', 'en']); // used for dropdown in the future

    this.translate.use(localStorage.getItem('rippleLang') || 'en');
    this.langService.changeDirection();
  }
}
