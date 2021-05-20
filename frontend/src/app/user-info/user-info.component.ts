import { NotificationService } from './../services/notification.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  user;
  profileForm: FormGroup;
  @Output() onLogedOut = new EventEmitter();

  public isDriver: boolean;

  public currentRequest: string;

  constructor(
    public authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/user/login']);
    }

    this.initForm();
    this.setUser();
  }

  initForm() {
    this.profileForm = new FormGroup({
      name: new FormControl(``, []),
      email: new FormControl(``, [Validators.email]),
      phone: new FormControl('', [Validators.pattern('380[0-9]{9}')]),

      carColor: new FormControl('', []),
      carModel: new FormControl('', []),
      carNumber: new FormControl('', []),
      carType: new FormControl('', []),
    });

    this.profileForm.valueChanges.subscribe(() => {
      console.log(this.profileForm);
    });
  }

  setUser() {
    // console.log(this.user, 'user in user info');
    if (this.authService.isAuthenticated()) {
      this.profileForm.patchValue({
        name: this.user.name,
        email: this.user.email,
        phone: this.user.phone_number,
      });
      this.isDriver = false;

      if (this.user?.driverInfo) {
        this.setDriver();
      }
    }
  }

  setDriver() {
    this.profileForm.patchValue({
      carColor: this.user.driverInfo.car_color || '',
      carModel: this.user.driverInfo.car_model || '',
      carNumber: this.user.driverInfo.car_number || '',
      carType: this.user.driverInfo.car_type || '',
    });
    this.isDriver = true;
  }

  updateUser() {
    this.profileForm.markAsPristine();
    this.authService.updateUser({
      id: this.user.id,
      name: this.profileForm.value.name || '',
      phone: this.profileForm.value.phone || '',
      email: this.profileForm.value.email || '',
    });

    if (this.isDriver) {
      this.updateDriver();
    }

    this.notificationService.addNotification({
      message: 'Your data saved.',
      title: '',
      timer: 1600,
    });
  }

  updateDriver() {
    console.log('update driver');

    const body = {
      id: this.user.driverInfo.id,
      carColor: this.profileForm.value.carColor,
      carModel: this.profileForm.value.carModel,
      carNumber: this.profileForm.value.carNumber,
      carType: this.profileForm.value.carType,
    };
    console.log(body);

    this.authService.updateDriver(body);
  }

  logout() {
    this.authService.logout();
    this.onLogedOut.emit();
    this.router.navigate(['/user/login']);
  }
}
