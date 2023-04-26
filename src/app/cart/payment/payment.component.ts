import {Component, OnInit} from '@angular/core';
import {Cart} from "../../model/Cart";
import {ActivatedRoute, Router} from "@angular/router";
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {OrderManagementService} from "../../service/order-management.service";
import {tap} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {User} from "../../model/User";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  cart: Cart

  paymentForm: FormGroup;
  creditCardNumber: string = '';

  constructor(private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              private orderService: OrderManagementService,
              private toastService: ToastrService,
              private router:Router
  ) {

    this.paymentForm = this.formBuilder.group({
      email: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      // creditCardNumber: new FormControl('', [
      //   Validators.required,
      //   Validators.pattern(/^\d{1,4}(\-?\d{1,4}){0,3}$/),
      //   Validators.maxLength(19),
      //   Validators.minLength(19)
      //
      // ]),
    })

    // this.paymentForm.get('creditCardNumber').valueChanges.subscribe(value => {
    //   if (value.length > 19) {
    //     this.paymentForm.patchValue({
    //       'creditCardNumber': value.slice(0, 19)
    //     }, {
    //       emitEvent: false
    //     });
    //   }
    // });

  }

  ngOnInit() {
    this.cart = this.activatedRoute.snapshot.data['cart'];
  }

  // onSubmit() {
  //   console.log(this.paymentForm.value.firstName);
  //   this.orderService.order(this.paymentForm.value, this.cart.itemList).pipe(
  //     tap(() => this.toastService.success("Successful transaction!", "Info", {
  //       positionClass: "toast-bottom-center"
  //     }))
  //
  //   ).subscribe(
  //     (error) => {
  //       console.log(error); // kiíratjuk az error-t a konzolra
  //       tap(() => this.toastService.error(error, "Info", {
  //         positionClass: "toast-bottom-center"
  //       }))
  //     }
  //   );
  // }

  onSubmit() {
    if (this.paymentForm.valid) {
      console.log(this.paymentForm.value.firstName);
      this.orderService.order(this.paymentForm.value, this.cart.itemList).pipe(
        tap(() => {
          this.toastService.success("Successful transaction!", "Info", {
            positionClass: "toast-bottom-center"
          });
        })
      ).subscribe(
        () => {
          this.router.navigate(['/ticket']);

        },
        (error) => {
          console.error(error);
          this.toastService.error(error.error, "Error", {
            positionClass: "toast-bottom-center"
          });
        }
      );
    } else {
      this.paymentForm.markAllAsTouched();
    }

  }


  // onCreditCardNumberChange(): void {
  //   let formattedCreditCardNumber = '';
  //   let value = this.paymentForm.get('creditCardNumber').value.replace(/\D/g, ''); // eltávolítjuk az összes nem szám karaktert
  //
  //   for (let i = 0; i < value.length; i++) {
  //     formattedCreditCardNumber += value.charAt(i);
  //     if ((i + 1) % 4 === 0 && i !== value.length - 1) { // minden negyedik karakter után beszúrjuk az elválasztó jelet, kivéve az utolsó karakter után
  //       formattedCreditCardNumber += '-';
  //     }
  //   }
  //   this.paymentForm.patchValue({'creditCardNumber': formattedCreditCardNumber}); // frissítjük az input mező értékét
  // }
}
