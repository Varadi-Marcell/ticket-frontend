import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import { Ticket } from "../model/Ticket";
import {EntityService} from "./EntityService";



@Injectable({
  providedIn: 'root'
})
export class TicketService {


  constructor(private http: HttpClient) {
  }

  getAllTicket(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>('/apis/api/v1/ticket');
  }

  getTicketById(id:number) : Observable<Ticket>{
    return this.http.get<Ticket>('/apis/api/v1/ticket/'+id);
  }

  deleteTicketById(id:number):Observable<number>{
    return this.http.delete<number>('/api/api/v1/ticket-and-user/'+id);
  }

  createTicket(ticket:any){
    return this.http.post('/api/api/v1ticket',ticket);
  }

  // getEntityById(id: number): Observable<any> {
  //   return this.http.get<Ticket>('/apis/api/v1/ticket/'+id);
  //   ;

  // createTicket(ticket:Ticket): Observable<Ticket[]> {
  //   console.log(ticket)
  //   return this.http.post<Ticket[]>("/api/ticket", ticket);
  // }

}
