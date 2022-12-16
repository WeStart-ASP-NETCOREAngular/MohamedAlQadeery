import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { IBookResponse } from 'src/app/interfaces/book/IBookResponse';
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
    private _toastr: ToastrService
  ) {}

  imagesUrl = `${environment.baseURL}/images/thumbs/big`;

  book$: Observable<IBookResponse>;
  bookId: number;
  ngOnInit(): void {
    this._route.paramMap.subscribe((param) => {
      this.bookId = +param.get('id')!;
    });

    this.book$ = this._bookService.GetBookById(this.bookId);
  }
}
