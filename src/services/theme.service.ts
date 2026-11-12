import { DOCUMENT } from '@angular/common';
import { afterNextRender, inject, Service, signal } from '@angular/core';

type Theme = 'light' | 'dark';

@Service()
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly currentTheme = signal<Theme>('light');
  readonly theme = this.currentTheme.asReadonly();

  constructor() {
    afterNextRender(() => this.applyTheme(this.getInitialTheme()));
  }

  toggleTheme(): void {
    const theme = this.currentTheme() === 'light' ? 'dark' : 'light';
    this.applyTheme(theme);

    try {
      this.document.defaultView?.localStorage.setItem('theme', theme);
    } catch {
      // The switch remains usable when browser storage is unavailable.
    }
  }

  private applyTheme(theme: Theme): void {
    this.currentTheme.set(theme);
    this.document.documentElement.dataset['theme'] = theme;
  }

  private getInitialTheme(): Theme {
    const browser = this.document.defaultView;

    try {
      const savedTheme = browser?.localStorage.getItem('theme');
      if (savedTheme === 'light' || savedTheme === 'dark') {
        return savedTheme;
      }
    } catch {
      // Fall back to the system preference when storage access is blocked.
    }

    return browser?.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
}
