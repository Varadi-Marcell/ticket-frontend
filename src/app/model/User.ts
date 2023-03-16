import {Order} from "./Order";
import {CardPass} from "./CardPass";

export class User{
  id:number;
  name:string;
  age : number;
  email:string;
  role:string;
  cardPass:CardPass;
  orders:Order[];
}
