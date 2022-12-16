import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IBookSuggestionResponse } from 'src/app/interfaces/book-suggestions/IBookSuggestionDtos';
import { BookSuggestionService } from 'src/app/services/book-suggestion.service';

@Component({
  selector: 'app-book-suggestion',
  templateUrl: './book-suggestion.component.html',
  styleUrls: ['./book-suggestion.component.css'],
})
export class BookSuggestionComponent implements OnInit {
  messages: IBookSuggestionResponse[] = [];
  selectedMessage: IBookSuggestionResponse;
  showMessage = false;

  constructor(
    private _bookSuggestionsService: BookSuggestionService,
    private _toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this._bookSuggestionsService.GetAllMessages().subscribe((res) => {
      this.messages = res;
    });
  }

  OnShowMessage(messageId: number) {
    this._bookSuggestionsService.MarkMessageAsRead(messageId).subscribe({
      next: () => {
        this.selectedMessage = this.messages.find((m) => m.id == messageId)!;
        if (!this.selectedMessage.readAt) {
          this.selectedMessage.readAt = new Date();
          this._toastr.success(
            'تغير حالة الرسالة',
            'تم تحديث حالة الرسالة الى تم قرائتها'
          );
        }
        this.showMessage = true;
      },
      error: (err) => {
        this._toastr.error(err);
      },
    });
  }

  OnClickBack() {
    this.showMessage = false;
  }

  MarkAsUnRead(messageId: number) {
    this._bookSuggestionsService.MarkMessageAsUnRead(messageId).subscribe({
      next: () => {
        this.selectedMessage = this.messages.find((m) => m.id == messageId)!;
        if (this.selectedMessage.readAt) {
          this.selectedMessage.readAt = null;
          this._toastr.success(
            'تغير حالة الرسالة',
            'تم تحديث حالة الرسالة الى لم يتم قرائتها'
          );
        }
        this.showMessage = true;
      },
      error: (err) => {
        this._toastr.error(err);
      },
    });
  }
}
