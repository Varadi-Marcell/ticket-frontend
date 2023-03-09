import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {Ticket} from "../model/Ticket";
import {TicketService} from "../service/ticket-service";
import {TicketFilter} from "../model/TicketFilter";
import {User} from "../model/User";
import {AuthService} from "../service/auth.service";
import {Observable, Subscription, tap} from "rxjs";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  @Input() list;
  @Output() onFilterChange = new EventEmitter();

  @Input()
  role ;
  user: User;
  genre;
  location;
  ticketArray: Ticket[];
  copyData: Ticket[];

  filterlist = {
    genre : ['Rock', 'Pop', 'Jazz', 'Blues'],
    location: ['Budapest', 'Debrecen', 'Miskolc']
  };
  isLoggedin: boolean;
  constructor(private ticketService: TicketService,
              private authService: AuthService,
              private toastService:ToastrService) {
  }
  updateRangeValue(event) {
    // this.filter.price = event.target.value;
  }

  ngOnInit() {
    this.authService.user.subscribe(user => this.user = user);
    this.authService.isLoggedIn.subscribe(value => {
      this.isLoggedin = value;
    })

    if (this.isLoggedin){
      this.role = this.user.role;
    } else {
      this.role = "GUEST";
    }

    this.ticketService.getAllTicket()
      .subscribe(
        data => {
          this.ticketArray = data;
          this.copyData = this.ticketArray;
        }
      );
  }
  filterChange(appliedfilters) {
    this.ticketArray = this.copyData;

    this.genre = appliedfilters.appliedFilterValues.genre;
    this.location = appliedfilters.appliedFilterValues.location;

    if (this.genre){
      this.ticketArray = this.ticketArray.filter(item => item.genre === this.genre);
    }

    if (this.location){
      this.ticketArray = this.ticketArray.filter(item => item.location === this.location);
    }
  }

  deleteTicketById(id: number) {
    this.ticketService.deleteTicketById(id).pipe(
      tap(()=>this.toastService.error("Item Removed!","Info",{
        positionClass:"toast-bottom-center"
      }))
    ).subscribe();
  }


}
