import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IBookResponse } from 'src/app/interfaces/book/IBookResponse';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private _bookService: BookService) {}
  books$: Observable<IBookResponse[]>;

  ngOnInit(): void {
    this.books$ = this._bookService.GetAllBooks({ takeCount: 6 });
  }
}
