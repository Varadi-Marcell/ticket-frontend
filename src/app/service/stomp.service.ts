import {EventEmitter, Injectable, OnDestroy, OnInit} from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import {Client, Message, Stomp, StompSubscription} from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { filter, first, switchMap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { SocketClientState } from './socket-client-state';
import {Ticket} from "../model/Ticket";
import {Subject} from "rxjs";
import {TicketDto} from "../model/TicketDto";
import {Cart} from "../model/Cart";
import {Item} from "../model/Item";


@Injectable({
  providedIn: 'root'
})
export class StompService {

  public stompClient;
  public onConnect: EventEmitter<void> = new EventEmitter<void>();

  private tickets: TicketDto[] = [];
  private cart:Cart;
  private ticketSubject = new Subject<TicketDto[]>();
  private cartSubject = new Subject<Cart>();
  private temp = new Subject();

  constructor() {
    // const socket = new SockJS('http://localhost:8080/stomp-endpoint');
    // this.stompClient = Stomp.over(socket);
    // this.stompClient.connect({}, (frame) => {
    //   console.log('Connected: ' + frame);
    //   this.onConnect.emit();
    //
    // });
  }
  // connect(){
  //   const socket = new SockJS('http://localhost:8080/stomp-endpoint');
  //   this.stompClient = Stomp.over(socket);
  //   this.stompClient.connect({}, (frame) => {
  //     console.log('Connected: ' + frame);
  //     this.onConnect.emit();
  //
  //   });
  // }

  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      const socket = new SockJS('http://localhost:8080/stomp-endpoint');
      this.stompClient = Stomp.over(socket);
      this.stompClient.connect({}, (frame) => {
        console.log('Connected: ' + frame);
        this.onConnect.emit();
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
        this.tickets=tickets;
        this.ticketSubject.next(this.tickets);
      });
      return this.ticketSubject.asObservable();

  }


  public secretPayload():Observable<any>{
    // this.stompClient.send('/frontend/secret', {},{});
    this.stompClient.subscribe('/user/topic/private', (msg: { body: string; }) => {
      console.log(JSON.parse(msg.body));
      const tickets: TicketDto[] = JSON.parse(msg.body);
      this.tickets=tickets;
      this.ticketSubject.next(this.tickets);

    });
    return this.ticketSubject.asObservable();
  }

  public updateCart(item: Item){
    let message = JSON.stringify({"item":item});
    this.stompClient.send('/frontend/update-cart',{},message);
  }


  public listCart():Observable<Cart>{
    this.stompClient.subscribe('/user/queue/update-cart', (msg: {body:string}) => {

      this.cartSubject.next(JSON.parse(msg.body));

    });
    return this.cartSubject.asObservable();
  }

}
