import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { IBookResponse } from 'src/app/interfaces/book/IBookResponse';
import { AuthService } from 'src/app/services/auth.service';
import { BookService } from 'src/app/services/book.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent implements OnInit {
  constructor(private _bookService: BookService) {}
  imagesUrl = `${environment.baseURL}/images/thumbs/med`;
  books$: Observable<IBookResponse[]>;

  //#region Form Group and Form Controls
  bookSearchFormGroup: FormGroup;

  //#endregion
  ngOnInit(): void {
    this.books$ = this._bookService.GetAllBooks();
    this.bookSearchFormGroup = new FormGroup({
      bookName: new FormControl(''),
      authorName: new FormControl(''),
      year: new FormControl(''),
    });
  }

  OnSearchSubmit() {
    console.log(this.bookSearchFormGroup.value);
    this.books$ = this._bookService.GetAllBooks(this.bookSearchFormGroup.value);
  }
}
