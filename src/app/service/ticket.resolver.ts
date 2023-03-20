import {Inject, Injectable} from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {Ticket} from "../model/Ticket";
import {TicketService} from "./ticket-service";

@Injectable({
  providedIn: 'root'
})
export class TicketResolver implements Resolve<Ticket> {

  constructor(private  service: TicketService) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Ticket> {
    return this.service.getTicketById((route.params['id']));
  }
}
