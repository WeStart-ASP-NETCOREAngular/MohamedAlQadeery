import { Component, OnInit } from '@angular/core';
import { IBookReviewResponse } from 'src/app/interfaces/book/IBookResponse';
import { AccountService } from 'src/app/services/account.service';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css'],
})
export class ReviewsComponent implements OnInit {
  constructor(private _accountService: AccountService) {}
  bookReviews: IBookReviewResponse[];

  ngOnInit(): void {
    this._accountService.GetUserReviews().subscribe({
      next: (res) => {
        this.bookReviews = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
