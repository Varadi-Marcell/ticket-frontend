import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TicketComponent} from "./ticket/ticket.component";
import {ViewTicketComponent} from "./ticket/view-ticket/view-ticket.component";
import {TicketResolver} from "./service/ticket.resolver";
import {CreateTicketComponent} from "./ticket/create-ticket/create-ticket.component";
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import {UserComponent} from "./user/user.component";
import {ViewUserComponent} from "./user/view-user/view-user.component";
import {AuthGuard} from "./service/auth.guard";
import {UserResolver} from "./service/user.resolver";
import {ViewProfileComponent} from "./user/view-profile/view-profile.component";
import {ViewProfileResolver} from "./service/view-profile.resolver";
import {CartComponent} from "./cart/cart.component";
import {ViewCartResolver} from "./service/view-cart.resolver";

const routes: Routes = [
  {
    path: 'ticket',
    component: TicketComponent,
  },
  {
    path: "view-ticket/:id",
    component: ViewTicketComponent,
    resolve: {ticket:TicketResolver}
  },
  {
    path: "create-ticket",
    component: CreateTicketComponent,
    canActivate:[AuthGuard]

  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "login",
    component: LoginComponent
  },

  {
    path:"user",
    component: UserComponent,
    canActivate:[AuthGuard]
  },
  {
    path: "view-user/:id",
    component: ViewUserComponent,
    resolve: {user:UserResolver}
  },
  {
    path: "view-profile",
    component: ViewProfileComponent,
    resolve: {profile: ViewProfileResolver}
  },
  {
    path:"view-cart",
    component: CartComponent,
    resolve: {cart: ViewCartResolver}
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
