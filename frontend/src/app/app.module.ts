import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouterModule } from '@angular/router';
import { appRoutes } from './routes/routes';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { ButtonComponent } from './shared/button/button.component';
import { OrderFormComponent } from './order-form/order-form.component';
import { IconComponent } from './shared/icon/icon.component';
import { RequestComponent } from './request/request.component';
import { RequestListComponent } from './request-list/request-list.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { UserComponent } from './user/user.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { CarTypeComponent } from './shared/car-type/car-type.component';
import { PaginationComponent } from './shared/pagination/pagination.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { NotificationComponent } from './shared/notification/notification.component';
import { NotificationItemComponent } from './shared/notification-item/notification-item.component';
import { ToggleComponent } from './shared/toggle/toggle.component';
import { ThemeToggleComponent } from './shared/theme-toggle/theme-toggle.component';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
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
    PaginationComponent,
    RegistrationFormComponent,
    NotificationComponent,
    NotificationItemComponent,
    ToggleComponent,
    ThemeToggleComponent,
    SettingsComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
