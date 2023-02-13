import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TicketComponent } from './ticket/ticket.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { NavbarComponent } from './navbar/navbar.component';
import { ViewTicketComponent } from './ticket/view-ticket/view-ticket.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {NgSelectModule} from "@ng-select/ng-select";
import { CreateTicketComponent } from './ticket/create-ticket/create-ticket.component';
import { LoginComponent } from './login/login.component';
import {TokenInterceptor} from "./interceptor/tokenInterceptor";
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    TicketComponent,
    NavbarComponent,
    ViewTicketComponent,
    CreateTicketComponent,
    LoginComponent,
    RegisterComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgbModule,
        NgSelectModule
    ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:TokenInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
