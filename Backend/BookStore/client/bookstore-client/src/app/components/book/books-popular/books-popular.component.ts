import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IBookResponse } from 'src/app/interfaces/book/IBookResponse';
import { BookService } from 'src/app/services/book.service';
import { ImageService } from 'src/app/services/image.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-books-popular',
  templateUrl: './books-popular.component.html',
  styleUrls: ['./books-popular.component.css'],
})
export class BooksPopularComponent implements OnInit {
  constructor(private _bookService: BookService) {}
  latestBook$: Observable<IBookResponse>;
  mostOrderdBook$: Observable<IBookResponse>;
  mostSoldBook$: Observable<IBookResponse>;

  imagesUrl = `${environment.baseURL}/images/thumbs/med`;

  ngOnInit(): void {
    this.latestBook$ = this._bookService.GetLatestBook();
    this.mostOrderdBook$ = this._bookService.GetMostOrderdBook();
    this.mostSoldBook$ = this._bookService.GetMostSoldBook();
  }
}
