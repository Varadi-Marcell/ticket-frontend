import {Component, OnInit} from '@angular/core';
import {AuthService} from "./service/auth.service";
import {StompService} from "./service/stomp.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Ticket_frontend';
  constructor(private stompService:StompService) {
  }
}
