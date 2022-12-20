import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IBookReviewResponse } from 'src/app/interfaces/book/IBookResponse';
import { AuthService } from 'src/app/services/auth.service';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-reviews',
  templateUrl: './book-reviews.component.html',
  styleUrls: ['./book-reviews.component.css'],
})
export class BookReviewsComponent implements OnInit {
  constructor(
    private _authService: AuthService,
    private _bookService: BookService,
    private _toastr: ToastrService,
    private _route: Router
  ) {}
  @Input() bookReviews: IBookReviewResponse[];

  @Output() OnReviewRemovedId = new EventEmitter<number>();
  currentUserId = '';
  currentUrl = '';

  ngOnInit(): void {
    this.SetCurrentUserId();
    this.currentUrl = this._route.url;
  }

  HandleOnRemoveReview(reviewId: number) {
    this._bookService.RemoveReviewFromBook(reviewId).subscribe({
      next: () => {
        this.bookReviews = this.bookReviews?.filter((br) => br.id != reviewId);
        this._toastr.success('تم حذف مراجعتك بنجاح', 'تمت العملية');
        this.OnReviewRemovedId?.emit(reviewId);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  private SetCurrentUserId() {
    this.currentUserId = this._authService.GetFieldFromJWT(
      'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
    );
  }
}
