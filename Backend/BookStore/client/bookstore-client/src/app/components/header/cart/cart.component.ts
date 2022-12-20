import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ICartItem } from 'src/app/interfaces/sales/ISalesDtos';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(private _cartService: CartService) {}
  cart$: Observable<ICartItem[]>;
  ngOnInit(): void {
    this.cart$ = this._cartService.cartContent$;
  }
}
