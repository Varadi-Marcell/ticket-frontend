import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {Cart} from "../model/Cart";
import {OrderManagementService} from "./order-management.service";

@Injectable({
  providedIn: 'root'
})
export class ViewCartResolver implements Resolve<Cart> {

  constructor(private service:OrderManagementService) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Cart> {
    return this.service.viewCart();
  }
}
