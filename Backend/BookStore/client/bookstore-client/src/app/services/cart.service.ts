import { Injectable } from '@angular/core';
import { ICartItem } from '../interfaces/sales/ISalesDtos';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartContent = new BehaviorSubject<ICartItem[]>([]);
  public cartContent$ = this.cartContent.asObservable();
  constructor() {
    this.cartContent.next(this.GetCartItems());
  }

  public addToCart(item: ICartItem): boolean {
    if (!localStorage.getItem('cart')) {
      localStorage.setItem('cart', JSON.stringify([]));
    }
    var items: ICartItem[] = JSON.parse(localStorage.getItem('cart')!);
    if (items.find((i) => i.bookId == item.bookId)) {
      console.log('item already exist');
      return false;
    }

    items.push(item);
    localStorage.setItem('cart', JSON.stringify(items));
    this.cartContent?.next(items);
    return true;
  }

  public RemoveFromCart(item: ICartItem) {
    if (!localStorage.getItem('cart')) {
      return;
    }
    var items: ICartItem[] = JSON.parse(localStorage.getItem('cart')!);
    if (!items.includes(item)) {
      return;
    }
    items = items.filter((i) => i.bookId != item.bookId);
    localStorage.setItem('cart', JSON.stringify(items));
    this.cartContent?.next(items);
  }
  public GetCartItems() {
    if (!localStorage.getItem('cart')) {
      return [];
    }

    var items: ICartItem[] = JSON.parse(localStorage.getItem('cart')!);
    return items;
  }
}
