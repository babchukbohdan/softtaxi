import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit, Input } from '@angular/core';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  animations: [
    trigger('note', [
      transition(':enter', [
        style({
          opacity: '0',
          transform: 'translateY(-100%)',
        }),
        animate('200ms ease-in'),
      ]),
      transition(':leave', [
        style({
          opacity: '1',
          transform: 'scale(1)',
        }),
        animate(
          '200ms ease-out',
          style({
            opacity: '0',
            transform: 'translateY(-100%)',
          })
        ),
        // animate('200ms'),
      ]),
    ]),
  ],
})
export class NotificationComponent implements OnInit {
  notifications;
  constructor(public notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService._notifications.subscribe((val) => {
      this.notifications = val;
    });
  }

  closeNotification(id) {
    this.notificationService.deleteNotification(id);
  }
}
