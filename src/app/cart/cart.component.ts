import {Component, OnInit} from '@angular/core';
import {Cart} from "../model/Cart";
import {ActivatedRoute} from "@angular/router";
import {Item} from "../model/Item";
import {OrderManagementService} from "../service/order-management.service";
import {ToastrService} from "ngx-toastr";
import {tap} from "rxjs";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  cart:Cart;

  constructor(private activatedRoute:ActivatedRoute,
              private orderService:OrderManagementService,
              private toastService: ToastrService) {
  }

  ngOnInit(): void {
    this.cart = this.activatedRoute.snapshot.data['cart'];
  }


  saveItem(item: Item) {
    this.orderService.updateItem(item.itemId,item.quantity).pipe(
      tap(()=>this.toastService.info("Item Updated!","Info",{
        positionClass:"toast-bottom-center"
      }))
    ).subscribe();
  }
  removeItemFromCart(id:number){
    this.orderService.removeItemFromCart(id).pipe(
      tap(()=>this.toastService.error("Item Removed!","Info",{
        positionClass:"toast-bottom-center"
      }))
    ).subscribe();
  }
}
