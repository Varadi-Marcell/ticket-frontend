import {EventEmitter, Injectable} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {CompatClient, Stomp} from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';
import {Subject, Subscription} from "rxjs";
import {TicketDto} from "../model/TicketDto";
import {Cart} from "../model/Cart";
import {ToastrService} from "ngx-toastr";


@Injectable({
  providedIn: 'root'
})
export class StompService {

  public stompClient: CompatClient;
  public onConnect: EventEmitter<void> = new EventEmitter<void>();
  connectionState = new BehaviorSubject<boolean>(false);

  private tickets: TicketDto[] = [];
  private ticketSubject = new Subject<TicketDto[]>();
  private cartSubject = new Subject<Cart>();
  private connected = new BehaviorSubject(false);

  constructor(private toastService: ToastrService) {
  }


  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      const socket = new SockJS('http://localhost:8080/stomp-endpoint');
      this.stompClient = Stomp.over(socket);
      this.stompClient.connect({}, (frame) => {
        this.onConnect.emit();

        this.connectionState.next(true);
        this.stompClient.subscribe('/user/topic/private/userdata', (msg: { body: string; }) => {
          this.toastService.success(msg.body, "Info", {
            positionClass: "toast-bottom-center"
          });
        });
        resolve(); // Kapcsolódás sikeres, megoldjuk a Promise-t
      }, (error) => {
        console.log(error)
        reject(error); // Hiba a kapcsolat során, elutasítjuk a Promise-t
      });
    });
  }

  disconnect(): void {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.disconnect(() => {
        console.log("Disconnected from WebSocket.");
      });
    }
  }

  reconnect(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.disconnect();
      this.connect().then(() => {
        resolve();
      }).catch((error) => {
        reject(error);
      });
    });
  }

  public getTickets(): Observable<any> {
    this.stompClient.subscribe('/topic/ticket-response', (message) => {
      this.tickets = JSON.parse(message.body);
      this.ticketSubject.next(this.tickets);
    });
    return this.ticketSubject.asObservable();
  }


  public secretPayload(): Observable<any> {
    this.stompClient.subscribe('/user/topic/private', (msg: { body: string; }) => {
      const tickets: TicketDto[] = JSON.parse(msg.body);
      this.tickets = tickets;
      this.ticketSubject.next(this.tickets);

    });
    return this.ticketSubject.asObservable();
  }

  // private subscribeToCartUpdates() {
  //   this.stompClient.subscribe('/user/queue/update-cart', (msg: { body: string }) => {
  //     this.cartSubject.next(JSON.parse(msg.body));
  //   });
  // }
  //
  // public listCart(): Observable<Cart> {
  //   return this.cartSubject.asObservable();
  // }


  public listCart(): Observable<Cart> {
    this.stompClient.subscribe('/user/queue/update-cart', (msg: { body: string }) => {
      this.cartSubject.next(JSON.parse(msg.body));
    });
    return this.cartSubject.asObservable();
  }

}
