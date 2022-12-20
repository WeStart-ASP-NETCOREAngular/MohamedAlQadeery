import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ICartItem } from 'src/app/interfaces/sales/ISalesDtos';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-content',
  templateUrl: './cart-content.component.html',
  styleUrls: ['./cart-content.component.css'],
})
export class CartContentComponent implements OnInit {
  constructor(private _cartService: CartService) {}
  cartItems$: Observable<ICartItem[]>;
  ngOnInit(): void {
    this.cartItems$ = this._cartService.cartContent$;
  }
}
