import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, tap } from 'rxjs';
import { ICartItem } from 'src/app/interfaces/sales/ISalesDtos';
import { CartService } from 'src/app/services/cart.service';
import { SalesService } from 'src/app/services/sales.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cart-content',
  templateUrl: './cart-content.component.html',
  styleUrls: ['./cart-content.component.css'],
})
export class CartContentComponent implements OnInit {
  constructor(
    private _cartService: CartService,
    private _toastr: ToastrService,
    private _salesService: SalesService
  ) {}
  cartItems$: Observable<ICartItem[]>;
  confirmedItems: ICartItem[] = [];

  imagesUrl = `${environment.baseURL}/images/thumbs/med`;

  ngOnInit(): void {
    this.cartItems$ = this._cartService.cartContent$;

    this.cartItems$.subscribe((res) => {
      this.confirmedItems = res;
    });
  }

  HandleOnDelete(item: ICartItem) {
    if (this._cartService.RemoveFromCart(item)) {
      this._toastr.success('تم ازالة الكتاب من السلة بنجاح', 'ازالة الكتاب', {
        positionClass: 'toast-top-center',
      });
    } else {
      this._toastr.error('حدث خطأ في ازالة الكتاب', 'ازالة الكتاب', {
        positionClass: 'toast-top-center',
      });
    }
  }

  ConfirmBuy() {
    console.log(this.confirmedItems);
    this.confirmedItems.forEach((item) => {
      this._salesService
        .CreateSale(item.bookId, {
          amount: item.amount,
          totalPrice: item.totalPrice,
        })
        .pipe(
          tap((r) => {
            if (this.confirmedItems.length == 1) {
              this._toastr.success(
                'تم ارسال طلباتك بنجاح الرجاء انتظار الموافقة',
                'تأكيد الشراء',
                {
                  positionClass: 'toast-top-center',
                }
              );
            }
          })
        )
        .subscribe((res) => {
          this._cartService.RemoveFromCart(item);
        });
    });
  }
}
