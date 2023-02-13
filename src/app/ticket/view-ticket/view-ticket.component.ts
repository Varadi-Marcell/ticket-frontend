import {Component, OnInit} from '@angular/core';
import {Ticket} from "../../model/Ticket";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-view-ticket',
  templateUrl: './view-ticket.component.html',
  styleUrls: ['./view-ticket.component.css']
})
export class ViewTicketComponent implements OnInit{

  ticket: Ticket;

  constructor(private activatedRoute: ActivatedRoute) {
  }
  ngOnInit(): void {
    this.ticket = this.activatedRoute.snapshot.data['preload'];
  }
}
