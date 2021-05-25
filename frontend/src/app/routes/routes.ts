import { RegistrationFormComponent } from './../registration-form/registration-form.component';
import { UserInfoComponent } from './../user-info/user-info.component';
import { RequestListComponent } from './../request-list/request-list.component';
import { LoginFormComponent } from './../login-form/login-form.component';
import { OrderFormComponent } from './../order-form/order-form.component';
import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  { path: '', component: OrderFormComponent, pathMatch: 'full' },
  { path: 'requests', component: RequestListComponent },
  { path: 'user/info', component: UserInfoComponent },
  { path: 'user/login', component: LoginFormComponent },
  { path: 'user/registration', component: RegistrationFormComponent },
];
