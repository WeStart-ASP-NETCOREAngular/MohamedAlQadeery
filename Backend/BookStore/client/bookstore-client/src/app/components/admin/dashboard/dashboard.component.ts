import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IBookResponse } from 'src/app/interfaces/book/IBookResponse';
import { IContactusResponse } from 'src/app/interfaces/contact-us/IContactusDtos';
import { BookService } from 'src/app/services/book.service';
import { ContactUsService } from 'src/app/services/contact-us.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, AfterContentChecked {
  constructor(
    private _router: Router,
    private _bookService: BookService,
    private contactusService: ContactUsService
  ) {}

  currentUrl = '';
  imagesUrl = `${environment.baseURL}/images/thumbs/med`;
  mostOrderdBook$: Observable<IBookResponse>;
  mostSoldBook$: Observable<IBookResponse>;
  messages$: Observable<IContactusResponse[]>;

  ngOnInit(): void {
    this.mostOrderdBook$ = this._bookService.GetMostOrderdBook();
    this.mostSoldBook$ = this._bookService.GetMostSoldBook();
    this.messages$ = this.contactusService.GetAllMessages();
  }

  ngAfterContentChecked(): void {
    this.currentUrl = this._router.url;
  }

  OnClickShowMessage(messageId: number) {
    this._router.navigate(['admin/contactus'], {
      queryParams: { messageId: messageId },
    });
  }
}
