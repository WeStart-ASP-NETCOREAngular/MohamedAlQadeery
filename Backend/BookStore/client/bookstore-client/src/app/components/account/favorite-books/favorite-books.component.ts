import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IBookResponse } from 'src/app/interfaces/book/IBookResponse';
import { BookService } from 'src/app/services/book.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-favorite-books',
  templateUrl: './favorite-books.component.html',
  styleUrls: ['./favorite-books.component.css'],
})
export class FavoriteBooksComponent implements OnInit {
  constructor(private _bookService: BookService) {}
  favBooks$: Observable<IBookResponse[]>;
  imagesUrl = `${environment.baseURL}/images/thumbs/med`;

  ngOnInit(): void {
    this.favBooks$ = this._bookService.GetFavoriteBooks();
  }
}
