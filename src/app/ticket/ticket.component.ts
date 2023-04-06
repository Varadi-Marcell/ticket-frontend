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
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {minMaxValidator} from "./validator";


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
  filterForm: FormGroup;

  constructor(private ticketService: TicketService,
              private authService: AuthService,
              private toastService: ToastrService,
              private orderService: OrderManagementService,
              private stompService: StompService,
              private formBuilder: FormBuilder) {
    this.filterForm = this.formBuilder.group({
      minPrice: ['', [Validators.required, Validators.min(0)]],
      maxPrice: ['', [Validators.required, Validators.max(1000)]],
    }, {validator: minMaxValidator()});
  }


  async ngOnInit() {
    try {
      await this.stompService.connect();
      this.subscribeToArrayPayload();
      this.pagination(0, 10);

    } catch (error) {
      console.error('Error connecting to StompService:', error);
    }

    // this.stompService.userDataChanged().subscribe(data =>console.log(data));

    this.authService.user.subscribe(user => this.user = user);
    this.authService.isLoggedIn.subscribe(value => {
      this.isLoggedin = value;
    })

    if (this.isLoggedin) {
      this.role = this.user.role;
    } else {
      this.role = "GUEST";
    }

    this.pagination(0, 10);


  }

  pagination(page: number, size: number) {
    let message = JSON.stringify({"page": page, "size": size});
    this.stompService.stompClient.send('/frontend/secret', {}, message);
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
      this.ticketArray = data.ticketDtoList;
      this.arraySize = data.size;
      // @ts-ignore
      this.length = Array(Math.ceil(data.size / this.pageSize)).fill().map((x, i) => i);

    });
  }

  filterTicketsByPrice() {

    let message = JSON.stringify({
      "minPrice": this.filterForm.get('minPrice').value,
      "maxPrice": this.filterForm.get('maxPrice').value,
      "page": this.page,
      "size": this.pageSize
    });
    this.stompService.stompClient.send('/frontend/ticketsAbovePrice', {}, message);
  }

  deleteTicketById(id: number) {
    this.ticketService.deleteTicketById(id, this.page, this.pageSize).pipe(
      tap(() => {
        this.toastService.error("Item Removed!", "Info", {
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
    this.pagination(0, this.pageSize);
  }

  updatePageNumber(event) {
    this.page = event;
    this.pagination(this.page, this.pageSize);

  }
}
