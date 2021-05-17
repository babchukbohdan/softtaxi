import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export class Notification {
  public id?: number;

  constructor(
    public title: string = 'Your verify code: ',
    public message: string = '5151',
    public timer: number = 2000
  ) {}
}

// @Injectable({
//   providedIn: 'root',
// })
// export class NotificationService {
//   public notifications: Notification[] = [
//     {
//       title: 'Your verify code',
//       message: '5151',
//     },
//   ];

//   constructor() {}

//   getNotifications() {
//     return this.notifications;
//   }

//   addNotification(n: Notification) {
//     this.notifications = this.notifications.concat(n);
//   }
//   deleteNotification(idx) {
//     this.notifications = this.notifications.filter((_, i) => i !== idx);
//     console.log('note service', this.notifications);
//   }
// }

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  public _notifications: BehaviorSubject<Array<Notification>> =
    new BehaviorSubject([]);

  timersId = {};

  // public readonly notifications: Observable<Notification> =
  //   this._notifications.asObservable();

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
    const length = notifications.push(newNote);

    this._notifications.next(notifications);

    if (newNote.timer) {
      this.timersId[newNote.id] = setTimeout(() => {
        this.deleteNotification(newNote.id);
      }, newNote.timer);
    }
  }
}
