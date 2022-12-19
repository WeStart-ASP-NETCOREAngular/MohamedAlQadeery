import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import {
  IBookResponse,
  IBookReviewResponse,
} from 'src/app/interfaces/book/IBookResponse';
import { AuthService } from 'src/app/services/auth.service';
import { BookService } from 'src/app/services/book.service';
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
    private _authService: AuthService
  ) {}

  imagesUrl = `${environment.baseURL}/images/thumbs/big`;

  book$: Observable<IBookResponse>;
  bookId: number;

  favBooks: IBookResponse[];

  bookReviews: IBookReviewResponse[];

  isLoggedIn$: Observable<boolean>;

  //#region review Form Controls
  reviewFormGroup: FormGroup;
  ratingFormControl: FormControl;
  commentFormControl: FormControl;
  //#endregion
  ngOnInit(): void {
    this._route.paramMap.subscribe((param) => {
      this.bookId = +param.get('id')!;
    });

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

    this.InitReviewForm();
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
    this._bookService
      .AddReviewToBook(this.bookId, this.reviewFormGroup.value)
      .subscribe({
        next: (res) => {
          this.bookReviews.push(res);
          this._toastr.success('تم اضافة مراجعتك بنجاح ', 'تمت العملية');
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
