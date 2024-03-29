import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Item } from "../model/Item";
import {catchError, Observable, tap, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OrderManagementService {


  constructor(private http:HttpClient) {
  }

  addItemToCart(item: { amount: number; quantity: number; ticketId: number }):Observable<any> {
    return this.http.post("/apis/api/v1/cart",item);
  }

  removeItemFromCart(id:number): Observable<any>{
    return this.http.delete("/apis/api/v1/cart/"+id);
  }

  viewCart():Observable<any>{
    return this.http.get("/apis/api/v1/cart/view-cart").pipe(
      tap(res =>{
        console.log(res);
      })
    );
  }

  updateItem(id:number,quantity:number):Observable<any>{
    return this.http.put("/apis/api/v1/cart",{"itemId":id,"quantity":quantity});
  }
  //Nincs végpont beállítva
  order(order: { firstName: string; lastName: string; email: string }, itemList: Item[]):Observable<any>{
    console.log(order);
    return this.http.post("/apis/api/v1/order",order)
      .pipe(
        catchError((error) => {
          if (error.status === 400 && error.error && error.error.message) {
            // console.log(error.error.message());
            return throwError(error.error.message);
          } else {
            // console.log(error.error);
            return throwError(error);
          }
        })
      );
  }


}
