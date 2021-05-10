import { UserComponent } from './../user/user.component';
import { UserInfoComponent } from './../user-info/user-info.component';
import { RequestListComponent } from './../request-list/request-list.component';
import { LoginFormComponent } from './../login-form/login-form.component';
import { OrderFormComponent } from './../order-form/order-form.component';
import { OrderComponent } from './../order/order.component';
import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  { path: '', component: OrderFormComponent, pathMatch: 'full' },
  { path: 'login', component: UserComponent },
  { path: 'requests', component: RequestListComponent },
  // { path: '**', component: NotFoundComponent }
];
