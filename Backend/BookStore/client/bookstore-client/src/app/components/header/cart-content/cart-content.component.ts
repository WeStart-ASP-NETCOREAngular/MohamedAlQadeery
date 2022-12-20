import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ICartItem } from 'src/app/interfaces/sales/ISalesDtos';
import { CartService } from 'src/app/services/cart.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cart-content',
  templateUrl: './cart-content.component.html',
  styleUrls: ['./cart-content.component.css'],
})
export class CartContentComponent implements OnInit {
  constructor(
    private _cartService: CartService,
    private _toastr: ToastrService
  ) {}
  cartItems$: Observable<ICartItem[]>;

  imagesUrl = `${environment.baseURL}/images/thumbs/med`;

  ngOnInit(): void {
    this.cartItems$ = this._cartService.cartContent$;
  }

  HandleOnDelete(item: ICartItem) {
    if (this._cartService.RemoveFromCart(item)) {
      this._toastr.success('تم ازالة الكتاب من السلة بنجاح', 'ازالة الكتاب');
    } else {
      this._toastr.error('حدث خطأ في ازالة الكتاب', 'ازالة الكتاب');
    }
  }
}
