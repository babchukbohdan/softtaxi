import { ThemeService, Theme } from './services/theme.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [],
})
export class AppComponent implements OnInit {
  title: string = 'softtaxi';
  theme: Theme;
  constructor(private themeService: ThemeService) {}
  ngOnInit() {
    this.themeService._theme.subscribe((t) => {
      this.theme = t;
    });
  }
}
