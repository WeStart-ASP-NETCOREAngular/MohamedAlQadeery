import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IBookResponse } from 'src/app/interfaces/book/IBookResponse';
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
  ngOnInit(): void {
    this.books$ = this._bookService.GetAllBooks();
  }
}
