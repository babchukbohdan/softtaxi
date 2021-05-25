import { ThemeService } from '../../services/theme.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.scss'],
})
export class ThemeToggleComponent implements OnInit {
  currentTheme: string;
  constructor(private theme: ThemeService) {}

  ngOnInit(): void {
    this.theme._theme.subscribe((theme) => {
      this.currentTheme = theme;
    });
  }
  toggleTheme() {
    this.theme.toggleTheme();
  }
}
