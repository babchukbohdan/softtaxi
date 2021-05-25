import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export class Notification {
  public id?: number;

  constructor(
    public title: string = 'Your verify code: ',
    public message: string = '5151',
    public timer?: number
  ) {}
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  public _notifications: BehaviorSubject<Array<Notification>> =
    new BehaviorSubject([]);

  timersId = {};

  setNotifications() {
    this._notifications.next([]);
  }

  deleteNotification(id) {
    clearTimeout(this.timersId[id]);

    const notifications = this._notifications.value;
    const filtredNotifications = notifications.filter((n) => n.id !== id);

    this._notifications.next(filtredNotifications);
  }

  addNotification(n: Notification) {
    const notifications = this._notifications.value;
    const newNote = {
      ...n,
      id: notifications.length,
    };
    notifications.push(newNote);

    this._notifications.next(notifications);

    if (newNote.timer) {
      this.timersId[newNote.id] = setTimeout(() => {
        this.deleteNotification(newNote.id);
      }, newNote.timer);
    }
  }
}
