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

  constructor(
    private _bookSuggestionsService: BookSuggestionService,
    private _toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this._bookSuggestionsService.GetAllMessages().subscribe((res) => {
      this.messages = res;
    });
  }
}
