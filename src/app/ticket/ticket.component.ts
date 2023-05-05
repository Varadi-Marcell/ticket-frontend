import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {Ticket} from "../model/Ticket";
import {TicketService} from "../service/ticket-service";
import {User} from "../model/User";
import {AuthService} from "../service/auth.service";
import {map, Observable, Subscription, tap} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {OrderManagementService} from "../service/order-management.service";
import {StompService} from "../service/stomp.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {minMaxValidator} from "./validator";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {


  role;
  user: User;
  ticketArray: Ticket[];
  pageSize: number = 10;
  page: number;
  length: number[];
  arraySize: number;
  filterForm: FormGroup;
  selectedLocation: string;
  locationArr: string[];
  genreArr: string[];

  constructor(private ticketService: TicketService,
              private authService: AuthService,
              private toastService: ToastrService,
              private orderService: OrderManagementService,
              private stompService: StompService,
              private formBuilder: FormBuilder,
              private changeDetector: ChangeDetectorRef,
              private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.locationArr = this.activatedRoute.snapshot.data['locations'];
    this.genreArr = this.activatedRoute.snapshot.data['genres'];

    console.log(this.locationArr);
    console.log(this.genreArr)

    this.filterForm = this.formBuilder.group({
      location: new FormControl(''),
      minPrice: new FormControl('',Validators.min(0)),
      maxPrice: new FormControl('',Validators.max(1000)),
      startDate: new FormControl(''),
      endDate: new FormControl(''),
      genre: new FormControl(),
    }, {validator: minMaxValidator()});

    this.subscribeToArrayPayload();
    this.pagination(0, 10);

    this.authService.userSubject.subscribe(user => this.user = user);
    if (this.authService.userSubject.value != null) {
      this.role = this.user.role;
    }

    this.pagination(0, 10);


  }

  pagination(page: number, size: number) {
    let message = JSON.stringify({"page": page, "size": size});
    // this.stompService.stompClient.send('/frontend/secret', {}, message);
    this.submit();
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

  submit() {
      console.log(this.filterForm.value);
      let message = JSON.stringify({
        "location": this.filterForm.get('location').value,
        "minPrice": this.filterForm.get('minPrice').value,
        "maxPrice": this.filterForm.get('maxPrice').value,
        "startDate": this.filterForm.get('startDate').value,
        "endDate": this.filterForm.get('endDate').value,
        "genre": this.filterForm.get('genre').value,
        "page": this.page,
        "size": this.pageSize
      });
      this.stompService.stompClient.send('/frontend/filterTicket', {}, message);



  }

}
