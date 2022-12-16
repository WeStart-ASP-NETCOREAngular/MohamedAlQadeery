import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IBookResponse } from 'src/app/interfaces/book/IBookResponse';
import { BookService } from 'src/app/services/book.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-books-row',
  templateUrl: './books-row.component.html',
  styleUrls: ['./books-row.component.css'],
})
export class BooksRowComponent implements OnInit {
  constructor(private _bookService: BookService) {}
  books$: Observable<IBookResponse[]>;
  imagesUrl = `${environment.baseURL}/images/thumbs/med`;

  ngOnInit(): void {
    this.books$ = this._bookService.GetAllBooks({ takeCount: 6 });
  }
}
