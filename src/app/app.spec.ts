import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    })
      .compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Musa');
  });
  it('switches themes and saves the preference', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const button = (fixture.nativeElement as HTMLElement).querySelector('button');
    const initialTheme = document.documentElement.dataset['theme'];
    const nextTheme = initialTheme === 'dark' ? 'light' : 'dark';

    button?.click();
    await fixture.whenStable();

    expect(document.documentElement.dataset['theme']).toBe(nextTheme);
    expect(localStorage.getItem('theme')).toBe(nextTheme);
    expect(button?.getAttribute('aria-label')).toBe(
      `Switch to ${initialTheme} mode`,
    );
  });

});

