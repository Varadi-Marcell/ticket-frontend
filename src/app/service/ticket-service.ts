import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {catchError, map, Observable, tap, throwError} from "rxjs";
import {Ticket} from "../model/Ticket";
import {TicketDto} from "../model/TicketDto";
import {StompService} from "./stomp.service";
import {first} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class TicketService {


  constructor(private http: HttpClient) {
  }

  getTicketById(id: number): Observable<Ticket> {
    return this.http.get<Ticket>('/apis/api/v1/ticket/' + id);
  }

  deleteTicketById(id: number,page:number,size:number): Observable<number> {
    const params = new HttpParams().set('page', page.toString()).set('size', size.toString());

    return this.http.delete<number>('/apis/api/v1/ticket/' + id, { params });
  }

  createTicket(ticket: any) {
    return this.http.post('/apis/api/v1/ticket', ticket);
  }

  getLocations(): Observable<string[]> {
    return this.http.get<string[]>("/apis/api/v1/ticket/location");
  }

  getGenres(): Observable<string[]> {
    return this.http.get<string[]>("/apis/api/v1/ticket/genre");
  }
}
