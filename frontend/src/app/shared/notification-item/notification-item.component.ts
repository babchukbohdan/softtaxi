import { NotificationService } from '../../services/notification.service';
import { transition, trigger, style, animate } from '@angular/animations';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification-item',
  templateUrl: './notification-item.component.html',
  styleUrls: ['./notification-item.component.scss'],
})
export class NotificationItemComponent implements OnInit, OnDestroy {
  @Input() title;
  @Input() message;
  @Input() id;
  noteState = '';
  constructor(public notificationService: NotificationService) {}

  ngOnInit(): void {}

  closeNotification(idx) {
    this.notificationService.deleteNotification(idx);
  }
  ngOnDestroy() {}
}
