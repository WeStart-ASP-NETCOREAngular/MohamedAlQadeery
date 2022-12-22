import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { IBookResponse } from 'src/app/interfaces/book/IBookResponse';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-sale',
  templateUrl: './book-sale.component.html',
  styleUrls: ['./book-sale.component.css'],
})
export class BookSaleComponent implements OnInit {
  constructor(
    private _bookService: BookService,
    private _toastr: ToastrService
  ) {}

  //#region Display Book Sales FormGroup and form controls
  bookSalesFormGroup: FormGroup;
  bookIdFormControl: FormControl;
  booksOptions: { id: number; name: string }[] = [];

  //#endregion
  ngOnInit(): void {
    this.bookIdFormControl = new FormControl('', [Validators.required]);
    this.bookSalesFormGroup = new FormGroup({
      bookId: this.bookIdFormControl,
    });

    this.FeatchingBooksOptions();
  }

  private FeatchingBooksOptions() {
    this._bookService
      .GetAllBooks()
      .pipe(
        map((res: IBookResponse[]) => {
          return res.map((a) => ({ id: a.id, name: a.name }));
        })
      )
      .subscribe({
        next: (res) => {
          this.booksOptions = res;
        },
        error: (err) => {
          this._toastr.error('خطأ في جلب الكتب', 'حدث خطأ');
        },
      });
  }

  OnSubmitBookSale() {
    console.log(this.bookSalesFormGroup.value);
  }
}
