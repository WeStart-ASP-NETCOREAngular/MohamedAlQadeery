import { Component, OnInit } from '@angular/core';
import { IBookResponse } from 'src/app/interfaces/book/IBookResponse';
import { BookService } from 'src/app/services/book.service';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-books-popular',
  templateUrl: './books-popular.component.html',
  styleUrls: ['./books-popular.component.css'],
})
export class BooksPopularComponent implements OnInit {
  constructor(
    private _bookService: BookService,
    private _imageService: ImageService
  ) {}
  latestBook: IBookResponse;
  mostOrderdBook: IBookResponse;
  mostSoldBook: IBookResponse;

  ngOnInit(): void {
    this._bookService.GetLatestBook().subscribe((res) => {
      this._imageService.GetImageUrl(res.image).subscribe((imageResponse) => {
        res.image = imageResponse.url!;
        this.latestBook = res;
      });
    });

    this._bookService.GetMostOrderdBook().subscribe((res) => {
      this._imageService.GetImageUrl(res.image).subscribe((imageResponse) => {
        res.image = imageResponse.url!;
        this.mostOrderdBook = res;
      });
    });

    this._bookService.GetMostSoldBook().subscribe((res) => {
      this._imageService.GetImageUrl(res.image).subscribe((imageResponse) => {
        res.image = imageResponse.url!;
        this.mostSoldBook = res;
      });
    });
  }
}
