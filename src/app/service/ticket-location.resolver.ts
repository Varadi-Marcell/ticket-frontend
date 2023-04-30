import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {TicketService} from "./ticket-service";

@Injectable({
  providedIn: 'root'
})
export class TicketLocationResolver implements Resolve<string[]> {

  constructor(private service:TicketService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<string[]> {
    return this.service.getLocations();
  }
}
