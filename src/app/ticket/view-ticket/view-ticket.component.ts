import {Component, OnInit} from '@angular/core';
import {Ticket} from "../../model/Ticket";
import {ActivatedRoute} from "@angular/router";
import {OrderManagementService} from "../../service/order-management.service";
import {Item} from "../../model/Item";

@Component({
  selector: 'app-view-ticket',
  templateUrl: './view-ticket.component.html',
  styleUrls: ['./view-ticket.component.css']
})
export class ViewTicketComponent implements OnInit {

  ticket: Ticket;

  item = {
    ticketId: null,
    amount: null,
    quantity: null
  };
  constructor(private activatedRoute: ActivatedRoute,
              private orderService:OrderManagementService) {
  }

  ngOnInit(): void {
    this.ticket = this.activatedRoute.snapshot.data['ticket'];

  }

  inputnumber = 0;

  plus() {
    this.inputnumber = this.inputnumber + 1;
  }

  minus() {
    if (this.inputnumber != 0) {
      this.inputnumber = this.inputnumber - 1;
    }

  }

  addToBasket() {
    if (this.ticket) {
      console.log(this.ticket.id);
      this.item.ticketId = this.ticket.id;
      this.item.amount = this.ticket.price;
      this.item.quantity = this.inputnumber;
      this.orderService.addItemToCart(this.item).subscribe();
    } else {
      console.error('Ticket is not defined yet!');
    }
  }

}
