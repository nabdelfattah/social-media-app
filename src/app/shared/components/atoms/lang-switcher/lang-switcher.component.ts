import { TranslateService } from '@ngx-translate/core';
import { LangService } from './../../../../core/services/lang.service';
import { Component, computed, inject, signal } from '@angular/core';
import { compatForm } from '@angular/forms/signals/compat';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-lang-switcher',
  imports: [],
  templateUrl: './lang-switcher.component.html',
})
export class LangSwitcherComponent {
  private readonly translateService = inject(TranslateService);

  currentLang = signal<string>('en');

  private readonly langService = inject(LangService);
  ngOnInit(): void {
    initFlowbite();
  }

  changeLang(lang: string) {
    this.langService.changeLang(lang);
    this.currentLang.set(this.translateService.getCurrentLang()!);
    console.log(this.translateService.getCurrentLang());
  }
}
