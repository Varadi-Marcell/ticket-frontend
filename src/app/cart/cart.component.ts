import {Component, OnDestroy, OnInit} from '@angular/core';
import {Cart} from "../model/Cart";
import {ActivatedRoute} from "@angular/router";
import {Item} from "../model/Item";
import {OrderManagementService} from "../service/order-management.service";
import {ToastrService} from "ngx-toastr";
import {Subscription, tap} from "rxjs";
import {flip} from "@popperjs/core";
import {StompService} from "../service/stomp.service";
import {User} from "../model/User";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {

  cart: Cart;
  private cartSubscription: Subscription;

  constructor(private activatedRoute: ActivatedRoute,
              private orderService: OrderManagementService,
              private toastService: ToastrService,
              private stompService: StompService) {
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
  }

  async ngOnInit() {
    this.cart = this.activatedRoute.snapshot.data['cart'];
    await this.stompService.connect();
    this.cartSubscription = this.stompService.listCart().subscribe(data => {
      console.log("ASD", data);
      this.cart = data;
    })
  }


  saveItem(item: Item) {
    this.orderService.updateItem(item.itemId, item.quantity).pipe(
      tap(() => this.toastService.info("Item Updated!", "Info", {
        positionClass: "toast-bottom-center"
      }))
    ).subscribe();
  }

  removeItemFromCart(id: number) {
    this.orderService.removeItemFromCart(id).pipe(
      tap(() => this.toastService.error("Item Removed!", "Info", {
        positionClass: "toast-bottom-center"
      }))
    ).subscribe();
  }

  checkCartItems(): boolean {
    if (this.cart && this.cart.itemList == null) {
    }
    return !(this.cart && this.cart.itemList.length == 0);
  }

  subscribeCartEvents() {

  }
}
