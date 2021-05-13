import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { RouterModule } from '@angular/router';
import { appRoutes } from './routes/routes';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { OrderComponent } from './order/order.component';
import { ButtonComponent } from './button/button.component';
import { OrderFormComponent } from './order-form/order-form.component';
import { IconComponent } from './icon/icon.component';
import { RequestComponent } from './request/request.component';
import { RequestListComponent } from './request-list/request-list.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { UserComponent } from './user/user.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { CarTypeComponent } from './car-type/car-type.component';

@NgModule({
  declarations: [
    AppComponent,
    OrderComponent,
    NavComponent,
    ButtonComponent,
    OrderFormComponent,
    IconComponent,
    RequestComponent,
    RequestListComponent,
    LoginFormComponent,
    UserComponent,
    UserInfoComponent,
    CarTypeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
