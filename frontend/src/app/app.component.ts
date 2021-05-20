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
  // page: string = 'make-order';
  constructor(private themeService: ThemeService) {}
  ngOnInit() {
    this.themeService._theme.subscribe((t) => {
      this.theme = t;
    });
  }
  // changePage(page: string) {
  //   this.page = page;
  // }
  // requests: Request[] = [
  //   {
  //     customerId: '1',
  //     driverId: '',
  //     createdDate: new Date(),
  //     lastUpdate: new Date(),
  //     destinationLocation: 'Головна, 246',
  //     passangerLocation: 'Комарова 2-А',
  //     price: 0,
  //     carType: CarType.Basic,
  //     status: StatusType.Active,
  //     description: 'Air conditioning',
  //   },
  // ];

  // updateRequests(request: Request) {
  //   console.log('post', request);
  //   this.requests.unshift(request);
  // }
}
