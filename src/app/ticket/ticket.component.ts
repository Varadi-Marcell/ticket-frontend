import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {Ticket} from "../model/Ticket";
import {TicketService} from "../service/ticket-service";
import {User} from "../model/User";
import {AuthService} from "../service/auth.service";
import {map, Observable, Subject, Subscription, tap} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {OrderManagementService} from "../service/order-management.service";
import {StompService} from "../service/stomp.service";
import {TicketDto} from "../model/TicketDto";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  @Input() list;
  @Output() onFilterChange = new EventEmitter();

  @Input()
  role;
  user: User;
  genre;
  location;
  ticketArray: Ticket[];
  copyData: Ticket[];

  filterlist = {
    genre: ['Rock', 'Pop', 'Jazz', 'Blues'],
    location: ['Budapest', 'Debrecen', 'Miskolc']
  };
  isLoggedin: boolean;
  pageSize: number = 10;
  page: number;
  length: number[];
  arraySize: number;
  private subscriptions: Array<Subscription> = new Array<Subscription>();

  constructor(private ticketService: TicketService,
              private authService: AuthService,
              private toastService: ToastrService,
              private orderService: OrderManagementService,
              private stompService: StompService) {

  }


  async ngOnInit() {

    try {
      await this.stompService.connect();
      this.subscribeToArrayPayload();
      this.btn(0,10);

    } catch (error) {
      console.error('Error connecting to StompService:', error);
    }

    this.authService.user.subscribe(user => this.user = user);
    this.authService.isLoggedIn.subscribe(value => {
      this.isLoggedin = value;
    })

    if (this.isLoggedin) {
      this.role = this.user.role;
    } else {
      this.role = "GUEST";
    }

    this.btn(0,10);

    this.stompService.getTickets().subscribe(data => {
      this.ticketArray=data.ticketDtoList;
      this.arraySize = data.size;
            // @ts-ignore
            this.length = Array(Math.ceil(data.size / this.pageSize)).fill().map((x, i) => i);

    });

    // this.ticketService.getAllTicket(0, 10)
    //   .subscribe(
    //     data => {
    //       this.ticketArray = data.ticketDtoList;
    //       this.copyData = this.ticketArray;
    //       // Array(5).fill().map((x,i)=>i);
    //       // this.length = Math.ceil(this.ticketArray.length / this.pageSize);
    //       this.arraySize = data.size;
    //       // @ts-ignore
    //       this.length = Array(Math.ceil(data.size / this.pageSize)).fill().map((x, i) => i);
    //     }
    //   );

  }

  btn(page:number,size:number){
    let message = JSON.stringify({"page":page,"size":size});
    this.stompService.stompClient.send('/frontend/secret',{},message);
  }

  filterChange(appliedfilters) {
    this.ticketArray = this.copyData;

    this.genre = appliedfilters.appliedFilterValues.genre;
    this.location = appliedfilters.appliedFilterValues.location;

    if (this.genre) {
      this.ticketArray = this.ticketArray.filter(item => item.genre === this.genre);
    }

    if (this.location) {
      this.ticketArray = this.ticketArray.filter(item => item.location === this.location);
    }
  }

  private subscribeToArrayPayload() {
    this.stompService.secretPayload().subscribe(data => {
      this.page = 0;
      this.ticketArray = data.ticketDtoList;
      this.arraySize = data.size;
      // @ts-ignore
      this.length = Array(Math.ceil(data.size / this.pageSize)).fill().map((x, i) => i);
    });

    this.stompService.getTickets().subscribe(data => {
      this.ticketArray=data.ticketDtoList;
      this.arraySize = data.size;
      // @ts-ignore
      this.length = Array(Math.ceil(data.size / this.pageSize)).fill().map((x, i) => i);

    });
  }

  deleteTicketById(id: number) {
    this.ticketService.deleteTicketById(id).pipe(
      tap(() => {this.toastService.error("Item Removed!", "Info", {
        positionClass: "toast-bottom-center"
      });
      })
    ).subscribe();
  }

  buyTicket(ticket: Ticket) {
    const item = {
      amount: ticket.price,
      quantity: 1,
      ticketId: ticket.id
    };
    this.orderService.addItemToCart(item).pipe(
      tap(() => this.toastService.success("Ticket Added To Cart!", "Info", {
        positionClass: "toast-bottom-center"
      }))
    ).subscribe();
  }
  onPageSizeChange() {
    // @ts-ignore
    this.length = Array(Math.ceil(this.arraySize / this.pageSize)).fill().map((x, i) => i);
    this.page = 0;
    this.btn(0, this.pageSize);
  }
  updatePageNumber(event) {
    this.page = event;
    this.btn(this.page, this.pageSize);

  }
}
