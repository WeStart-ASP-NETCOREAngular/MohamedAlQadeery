import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import {
  IBookResponse,
  IBookReviewResponse,
} from 'src/app/interfaces/book/IBookResponse';
import { ICartItem, ISalesResponse } from 'src/app/interfaces/sales/ISalesDtos';
import { AuthService } from 'src/app/services/auth.service';
import { BookService } from 'src/app/services/book.service';
import { CartService } from 'src/app/services/cart.service';
import { SalesService } from 'src/app/services/sales.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
})
export class BookDetailsComponent implements OnInit {
  constructor(
    private _route: ActivatedRoute,
    private _bookService: BookService,
    private _toastr: ToastrService,
    private _authService: AuthService,
    private _cartService: CartService,
    private _salesService: SalesService
  ) {}

  imagesUrl = `${environment.baseURL}/images/thumbs/big`;

  bookId: number;

  favBooks: IBookResponse[];

  bookReviews: IBookReviewResponse[];

  //#region Observables
  isLoggedIn$: Observable<boolean>;
  book$: Observable<IBookResponse>;
  ownsBookSale$: Observable<ISalesResponse>;
  //#endregion
  //#region review Form Controls
  reviewFormGroup: FormGroup;
  ratingFormControl: FormControl;
  commentFormControl: FormControl;
  //#endregion

  //#region Cart Form Controls
  cartFormGroup: FormGroup;
  amountToBuyFormControl: FormControl;
  //#endregion
  selectedBook: IBookResponse;

  ngOnInit(): void {
    this.SetBookId();

    this.book$ = this._bookService.GetBookById(this.bookId);

    this._bookService.GetFavoriteBooks().subscribe({
      next: (res) => {
        this.favBooks = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
    this._bookService.GetBookReviews(this.bookId).subscribe({
      next: (res) => {
        this.bookReviews = res;
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.isLoggedIn$ = this._authService.isLoggedin$;
    this.ownsBookSale$ = this._salesService.CheckUserOwnsBook(this.bookId);
    this.InitReviewForm();
    this.InitCartForm();

    this.book$.subscribe((res) => {
      this.selectedBook = res;
    });
  }

  public isFavoriteAlready(bookId: number): boolean {
    return this.favBooks?.findIndex((b) => b.id == bookId) != -1;
  }

  public OnAddToFavorite(bookId: number) {
    this._bookService.AddBookToFavorite(bookId).subscribe({
      next: (res) => {
        this.favBooks.push(res);
        this._toastr.success('تم اضافة الكتاب للمفضلة', 'تمت عملية الاضافة');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  public OnRemoveFromFavorite(bookId: number) {
    this._bookService.RemoveBookFromFavorite(bookId).subscribe({
      next: () => {
        this.favBooks = this.favBooks?.filter((b) => b.id != bookId);
        this._toastr.success('تم ازالة الكتاب من المفضلة', 'تمت عملية الحذف');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  private InitReviewForm() {
    this.ratingFormControl = new FormControl('', [
      Validators.required,
      Validators.max(5),
      Validators.min(1),
    ]);
    this.commentFormControl = new FormControl('', [Validators.required]);
    this.reviewFormGroup = new FormGroup({
      rate: this.ratingFormControl,
      comment: this.commentFormControl,
    });
  }

  HandleOnAddReview() {
    //check if user already add review or not
    let userId = this._authService.GetUserId();
    if (this.bookReviews.findIndex((br) => br.appUserId == userId) != -1) {
      this._toastr.error(
        'يجب عليك حذف مراجعتك لاضافة مراجعة جديدة',
        'خطأ في الاضافة'
      );
      return;
    }
    this._bookService
      .AddReviewToBook(this.bookId, this.reviewFormGroup.value)
      .subscribe({
        next: (res) => {
          this.bookReviews.push(res);
          this._toastr.success('تم اضافة مراجعتك بنجاح ', 'تمت العملية');
          this.reviewFormGroup.reset();
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  private SetBookId() {
    this._route.paramMap.subscribe((param) => {
      this.bookId = +param.get('id')!;
    });
  }

  private InitCartForm() {
    this.amountToBuyFormControl = new FormControl('', [Validators.required]);
    this.cartFormGroup = new FormGroup({
      amount: new FormControl('', [Validators.required]),
    });
  }

  public OnAddToCart() {
    let amount = this.cartFormGroup.value['amount'];
    let cartItem: ICartItem = {
      amount: amount,
      bookId: this.selectedBook.id,
      totalPrice: this.selectedBook.price * amount,
      bookImage: this.selectedBook.image,
      bookName: this.selectedBook.name,
    };
    console.log(cartItem);
    if (this._cartService.addToCart(cartItem)) {
      this._toastr.success('تم اضافة الكتاب للسلة بنجاح', 'اضافة للسلة', {
        positionClass: 'toast-top-center',
      });
    } else {
      this._toastr.error('الكتاب موجود مسبقا في السلة', 'خطأ في الاضافة', {
        positionClass: 'toast-top-center',
      });
    }
  }

  HandleOnReviewRemoved(event: number) {
    this.bookReviews = this.bookReviews?.filter((br) => br.id != event);
  }
}
