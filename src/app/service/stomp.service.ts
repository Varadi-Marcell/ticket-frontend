import {EventEmitter, Injectable, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {Client, CompatClient, Message, Stomp, StompSubscription} from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import {filter, first, switchMap} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';
import {SocketClientState} from './socket-client-state';
import {Ticket} from "../model/Ticket";
import {Subject, tap} from "rxjs";
import {TicketDto} from "../model/TicketDto";
import {Cart} from "../model/Cart";
import {Item} from "../model/Item";
import {ToastrService} from "ngx-toastr";


@Injectable({
  providedIn: 'root'
})
export class StompService {

  public stompClient: CompatClient;
  public onConnect: EventEmitter<void> = new EventEmitter<void>();

  private tickets: TicketDto[] = [];
  private cart: Cart;
  private ticketSubject = new Subject<TicketDto[]>();
  private cartSubject = new Subject<Cart>();
  private itemCount = new Subject();

  constructor(private toastService: ToastrService) {
  }


  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      const socket = new SockJS('http://localhost:8080/stomp-endpoint');
      this.stompClient = Stomp.over(socket);
      this.stompClient.connect({}, (frame) => {
        console.log('Connected: ' + frame);
        this.onConnect.emit();

        this.stompClient.subscribe('/user/topic/private/userdata', (msg: { body: string; }) => {
          console.log(msg);
          console.log(msg.body);
          this.toastService.success(msg.body, "Info", {
            positionClass: "toast-bottom-center"
          });
        });


        resolve(); // Kapcsolódás sikeres, megoldjuk a Promise-t
      }, (error) => {
        console.error('Error connecting to StompService:', error);
        reject(error); // Hiba a kapcsolat során, elutasítjuk a Promise-t
      });
    });
  }

  public getTickets(): Observable<any> {
    this.stompClient.subscribe('/topic/ticket-response', (message) => {
      console.log(JSON.parse(message.body));
      const tickets: TicketDto[] = JSON.parse(message.body);
      this.tickets = tickets;
      this.ticketSubject.next(this.tickets);
    });
    return this.ticketSubject.asObservable();
  }


  public secretPayload(): Observable<any> {
    this.stompClient.subscribe('/user/topic/private', (msg: { body: string; }) => {
      console.log(JSON.parse(msg.body));
      const tickets: TicketDto[] = JSON.parse(msg.body);
      this.tickets = tickets;
      this.ticketSubject.next(this.tickets);

    });
    return this.ticketSubject.asObservable();
  }

  public listCart(): Observable<Cart> {
    this.stompClient.subscribe('/user/queue/update-cart', (msg: { body: string }) => {
      this.cartSubject.next(JSON.parse(msg.body));

    });
    return this.cartSubject.asObservable();
  }

}
