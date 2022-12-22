import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable, map } from 'rxjs';
import { IBookResponse } from 'src/app/interfaces/book/IBookResponse';
import { ISalesResponse } from 'src/app/interfaces/sales/ISalesDtos';
import { BookService } from 'src/app/services/book.service';
import { SalesService } from 'src/app/services/sales.service';

@Component({
  selector: 'app-book-sale',
  templateUrl: './book-sale.component.html',
  styleUrls: ['./book-sale.component.css'],
})
export class BookSaleComponent implements OnInit {
  constructor(
    private _bookService: BookService,
    private _toastr: ToastrService,
    private _salesService: SalesService
  ) {}

  //#region Display Book Sales FormGroup and form controls
  bookSalesFormGroup: FormGroup;
  bookIdFormControl: FormControl;
  fromDateFormControl: FormControl;
  toDateFormControl: FormControl;
  booksOptions: { id: number; name: string }[] = [];

  //#endregion

  bookSalesList$: Observable<ISalesResponse[]>;
  ngOnInit(): void {
    this.bookIdFormControl = new FormControl('', [Validators.required]);
    this.fromDateFormControl = new FormControl('');
    this.toDateFormControl = new FormControl('');

    this.bookSalesFormGroup = new FormGroup({
      bookId: this.bookIdFormControl,
      fromDate: this.fromDateFormControl,
      toDate: this.toDateFormControl,
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
    let bookId = this.bookSalesFormGroup.value['bookId'];
    let fromDate = this.bookSalesFormGroup.value['fromDate'];
    let toDate = this.bookSalesFormGroup.value['toDate'];

    this.bookSalesList$ = this._salesService.GetBookSales(bookId, {
      fromDate,
      toDate,
    });
  }
}
