import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TicketComponent} from './ticket/ticket.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {NavbarComponent} from './navbar/navbar.component';
import {ViewTicketComponent} from './ticket/view-ticket/view-ticket.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgSelectConfig, NgSelectModule} from "@ng-select/ng-select";
import {CreateTicketComponent} from './ticket/create-ticket/create-ticket.component';
import {LoginComponent} from './login/login.component';
import {TokenInterceptor} from "./interceptor/tokenInterceptor";
import {RegisterComponent} from './register/register.component';
import {UserComponent} from './user/user.component';
import {ViewUserComponent} from './user/view-user/view-user.component';
import {ViewProfileComponent} from './user/view-profile/view-profile.component';
import {CartComponent} from './cart/cart.component';
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {PaymentComponent} from './cart/payment/payment.component';
import {StompService} from "./service/stomp.service";
import {UpdateUserComponent} from './user/update-user/update-user.component';

export function preloadProviderFactory(stompService: StompService) {
  return async () => await stompService.connect();
}

@NgModule({
  declarations: [
    AppComponent,
    TicketComponent,
    NavbarComponent,
    ViewTicketComponent,
    CreateTicketComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    ViewUserComponent,
    ViewProfileComponent,
    CartComponent,
    PaymentComponent,
    UpdateUserComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    NgSelectModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {
      provide: APP_INITIALIZER,
      useFactory: preloadProviderFactory,
      deps: [StompService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})


export class AppModule {

  constructor(private config:NgSelectConfig) {
    this.config.notFoundText = 'Custom not found';
    this.config.appendTo = 'body';
    this.config.bindValue = 'value';
  }


}
