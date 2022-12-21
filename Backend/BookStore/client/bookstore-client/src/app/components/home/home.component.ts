import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IBookResponse } from 'src/app/interfaces/book/IBookResponse';
import { IPublisherResponse } from 'src/app/interfaces/publisher/PublisherDtos';
import { BookService } from 'src/app/services/book.service';
import { PublisherService } from 'src/app/services/publisher.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private _bookService: BookService,
    private _publisherService: PublisherService
  ) {}
  books$: Observable<IBookResponse[]>;
  publishers$: Observable<IPublisherResponse[]>;

  ngOnInit(): void {
    this.books$ = this._bookService.GetAllBooks({ takeCount: 6 });
    this.publishers$ = this._publisherService.GetAllPublishers({
      takeCount: 6,
    });
  }
}
