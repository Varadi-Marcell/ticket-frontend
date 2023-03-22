import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {Order} from "../model/Order";
import {OrderService} from "./order.service";

@Injectable({
  providedIn: 'root'
})
export class OrderResolver implements Resolve<Order[]> {

  constructor(private service:OrderService) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Order[]> {
    return this.service.getOrders();
  }
}
