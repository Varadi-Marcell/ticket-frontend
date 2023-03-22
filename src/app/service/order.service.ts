import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {Order} from "../model/Order";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private https:HttpClient) { }

  public getOrders():Observable<Order[]>{
    return this.https.get<Order[]>('/apis/api/v1/order',)
  }
  getOrdersByDates(startDate:string,endDate:string):Observable<Order[]>{
    return this.https.get<Order[]>('/apis/api/v1/order/'+startDate+'/'+endDate).pipe(
      tap(data => console.log(data))
    );
  }
}
