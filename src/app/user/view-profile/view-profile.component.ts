import {Component, OnInit} from '@angular/core';
import {User} from "../../model/User";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {OrderManagementService} from "../../service/order-management.service";
import {Order} from "../../model/Order";
import {OrderService} from "../../service/order.service";

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit{

  user:User;
  orderArray:Order[];
  dateFilterForm: FormGroup;
  constructor(private activatedRoute:ActivatedRoute,
              private formBuilder:FormBuilder,
              private orderService:OrderService) {
  }

  ngOnInit(): void {
    this.user = this.activatedRoute.snapshot.data['profile'];
    this.orderArray = this.activatedRoute.snapshot.data['order']
    this.dateFilterForm = this.formBuilder.group({
      startDate : ['',Validators.required],
      endDate : ['',Validators.required],
    })
  }

  filterDates() {
    this.orderService.getOrdersByDates(this.dateFilterForm.value.startDate,this.dateFilterForm.value.endDate)
      .subscribe(data => this.orderArray = data);
  }
}
