import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Item } from "../model/Item";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OrderManagementService {

  constructor(private http:HttpClient) {
  }

  addItemToCart(item: { amount: null; quantity: null; ticketId: null }):Observable<any> {
    console.log(item);
    return this.http.post("/apis/api/v1/cart",item);
  }

  removeItemFromCart(id:number): Observable<any>{
    return this.http.delete("/apis/api/v1/cart/"+id);
  }

  viewCart():Observable<any>{
    return this.http.get("/apis/api/v1/cart/view-cart");
  }

  updateItem(id:number,quantity:number):Observable<any>{
    return this.http.put("/apis/api/v1/cart",{"itemId":id,"quantity":quantity});
  }
}
