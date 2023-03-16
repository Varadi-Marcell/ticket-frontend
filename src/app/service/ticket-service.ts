import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, tap, throwError} from "rxjs";
import { Ticket } from "../model/Ticket";
import {EntityService} from "./EntityService";
import {TicketDto} from "../model/TicketDto";



@Injectable({
  providedIn: 'root'
})
export class TicketService {


  constructor(private http: HttpClient) {
  }

  getAllTicket(page:number,size:number): Observable<TicketDto> {
    return this.http.get<TicketDto>('/apis/api/v1/ticket',{
      params:{
        page:page,
        size:size
      }
    })
  }

  getTicketById(id:number) : Observable<Ticket>{
    return this.http.get<Ticket>('/apis/api/v1/ticket/'+id);
  }

  deleteTicketById(id:number):Observable<number>{
    return this.http.delete<number>('/apis/api/v1/ticket/'+id);
  }

  createTicket(ticket:any){
    return this.http.post('/api/api/v1/ticket',ticket);
  }

  // getEntityById(id: number): Observable<any> {
  //   return this.http.get<Ticket>('/apis/api/v1/ticket/'+id);
  //   ;

  // createTicket(ticket:Ticket): Observable<Ticket[]> {
  //   console.log(ticket)
  //   return this.http.post<Ticket[]>("/api/ticket", ticket);
  // }

}
