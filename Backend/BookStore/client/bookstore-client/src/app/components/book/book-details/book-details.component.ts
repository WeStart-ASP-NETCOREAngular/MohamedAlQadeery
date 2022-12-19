import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { IBookResponse } from 'src/app/interfaces/book/IBookResponse';
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
  isLoggedIn$: Observable<boolean>;
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

    this.isLoggedIn$ = this._authService.isLoggedin$;
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
}
