import {Component, NgZone, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TicketService} from "../../service/ticket-service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.css']
})
export class CreateTicketComponent implements OnInit{
  ticketForm!: FormGroup;

  constructor(private ticketService: TicketService,
              private fb: FormBuilder,
              private ngZone: NgZone,
              private router: Router
  ) { }

  ngOnInit(): void {
    this.ticketForm = this.fb.group({
      name:  ['', [Validators.required, Validators.minLength(5)]],
      location:  ['', [Validators.required,]],
      genre:  ['', [Validators.required,]],
      price:  ['', [Validators.required]],
      startDate:  ['', [Validators.required]],
      endDate:  ['', [Validators.required]],
    });
  }

  onSubmit(){
    if(!this.ticketForm.valid){
      return false;
    }else{
      return this.ticketService
        .createTicket(this.ticketForm.value)
        .subscribe({
          complete: () => {
            this.ngZone.run(() => this.router.navigateByUrl('/ticket'));
          }
        })
    }
  }
}
