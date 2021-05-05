import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { OrderComponent } from './order/order.component';
import { ButtonComponent } from './button/button.component';
import { OrderFormComponent } from './order-form/order-form.component';

@NgModule({
  declarations: [
    AppComponent,
    OrderComponent,
    NavComponent,
    ButtonComponent,
    OrderFormComponent,
  ],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
