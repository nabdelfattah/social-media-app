import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LangService {
  private renderer: Renderer2;

  constructor(private rendererFactory: RendererFactory2) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  changeDirection(): void {
    if (localStorage.getItem('rippleLang') == 'ar') {
      // set language to be arabic for better SEO
      this.renderer.setAttribute(document.documentElement, 'lang', 'ar');
      // set dir to be rtl
      this.renderer.setAttribute(document.documentElement, 'dir', 'rtl');
      document;
    } else if (localStorage.getItem('rippleLang') == 'en') {
      // set language to be english for better SEO
      this.renderer.setAttribute(document.documentElement, 'lang', 'en');
      // set dir to be ltr
      this.renderer.setAttribute(document.documentElement, 'dir', 'ltr');
    }
  }
}
