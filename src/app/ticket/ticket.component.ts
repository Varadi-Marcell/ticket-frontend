import {Component, OnInit} from '@angular/core';
import {Ticket} from "../model/Ticket";
import {TicketService} from "../service/ticket-service";
import {TicketFilter} from "../model/TicketFilter";

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {



  ticketArray: Ticket[];
  displayedTicketArray: Ticket[];

  filteredTickets: Ticket[];

  genreArray: string[];
  filter: TicketFilter = {
    isAvailable: false,
    isUpComing: false,
    isLimited: false,
    price: 10000,
    selectedGenre: '',
  };
  constructor(private ticketService: TicketService) {
  }
  updateRangeValue(event) {
    this.filter.price = event.target.value;
  }



  ngOnInit() {
    this.ticketService.getAllTicket()
      .subscribe(
        data => {
          this.ticketArray = data;
          this.displayedTicketArray = data;
          this.genreArray = Array.from(new Set(this.ticketArray.map(item => item.genre)));
        }
      );
  }

  deleteTicketById(id: number) {
    this.ticketService.deleteTicketById(id).subscribe();
  }

  handleFilterChange(filterType: string) {
    switch (filterType) {
      case 'available':
        this.displayedTicketArray = this.ticketArray.filter(ticket => ticket.isAvailable);
        break;
      case 'upcoming':
        this.displayedTicketArray = this.ticketArray.filter(ticket => ticket.isUpComing);
        break;
      case 'limited':
        this.displayedTicketArray = this.ticketArray.filter(ticket => ticket.isLimited);
        break;
      default:
        this.displayedTicketArray = this.ticketArray;
        break;
    }
  }






}
