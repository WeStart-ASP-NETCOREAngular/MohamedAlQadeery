import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { IBookResponse } from 'src/app/interfaces/book/IBookResponse';
import { AuthService } from 'src/app/services/auth.service';
import { BookService } from 'src/app/services/book.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent implements OnInit, OnDestroy {
  constructor(
    private _bookService: BookService,
    private _activeRoute: ActivatedRoute
  ) {}

  imagesUrl = `${environment.baseURL}/images/thumbs/med`;
  books$: Observable<IBookResponse[]>;

  //#region Form Group and Form Controls
  bookSearchFormGroup: FormGroup;
  searchLabel: string;

  //#endregion

  sub: Subscription;
  ngOnInit(): void {
    this.books$ = this._bookService.GetAllBooks();

    this.sub = this._bookService.OnSearchBook.subscribe(
      (bookSearchValFromHeader) => {
        if (bookSearchValFromHeader) {
          this.searchLabel = `نتائج البحث عن : ${bookSearchValFromHeader}`;
        } else {
          this.searchLabel = '';
        }

        this.books$ = this._bookService.GetAllBooks({
          bookName: bookSearchValFromHeader,
        });
      }
    );

    this.bookSearchFormGroup = new FormGroup({
      bookName: new FormControl(''),
      authorName: new FormControl(''),
      year: new FormControl(''),
    });
  }

  OnSearchSubmit() {
    console.log(this.bookSearchFormGroup.value);
    this.books$ = this._bookService.GetAllBooks(this.bookSearchFormGroup.value);
    this.searchLabel = this.bookSearchFormGroup.value['bookName']
      ? `نتائج البحث عن : ${this.bookSearchFormGroup.value['bookName']}`
      : '';
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
