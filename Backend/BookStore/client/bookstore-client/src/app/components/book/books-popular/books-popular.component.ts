import { Component, OnInit } from '@angular/core';
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
  latestBook: IBookResponse;
  mostOrderdBook: IBookResponse;
  mostSoldBook: IBookResponse;

  imagesUrl = `${environment.baseURL}/images/thumbs/med`;

  ngOnInit(): void {
    this._bookService.GetLatestBook().subscribe((res) => {
      this.latestBook = res;
      this.latestBook.image = `${this.imagesUrl}/${this.latestBook.image}`;
    });

    this._bookService.GetMostOrderdBook().subscribe((res) => {
      this.mostOrderdBook = res;
      this.mostOrderdBook.image = `${this.imagesUrl}/${this.mostOrderdBook.image}`;
    });

    this._bookService.GetMostSoldBook().subscribe((res) => {
      this.mostSoldBook = res;
      this.mostSoldBook.image = `${this.imagesUrl}/${this.mostSoldBook.image}`;
    });
  }
}
