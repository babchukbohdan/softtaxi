import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type Theme = 'dark' | 'light';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  public _theme: BehaviorSubject<Theme> = new BehaviorSubject('dark');

  changeTheme(theme: Theme) {
    this._theme.next(theme);
  }
  toggleTheme() {
    this._theme.value === 'dark'
      ? this._theme.next('light')
      : this._theme.next('dark');
  }
}
