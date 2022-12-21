import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BookSuggestionService } from 'src/app/services/book-suggestion.service';

@Component({
  selector: 'app-book-suggestion-page',
  templateUrl: './book-suggestion-page.component.html',
  styleUrls: ['./book-suggestion-page.component.css'],
})
export class BookSuggestionPageComponent implements OnInit {
  constructor(
    private _bookSuggestionService: BookSuggestionService,
    private _toastr: ToastrService,
    private _router: Router
  ) {}
  //#region Book Suggestion FormGroup and FormControl
  bookSuggestionFormGroup: FormGroup;
  emailFormControl: FormControl;
  bookNameFormControl: FormControl;
  publisherNameFormControl: FormControl;
  authorNameFormControl: FormControl;
  notesFormControl: FormControl;
  //#endregion

  ngOnInit(): void {
    this.InitFormControls();
    this.bookSuggestionFormGroup = new FormGroup({
      bookName: this.bookNameFormControl,
      email: this.emailFormControl,
      publisherName: this.publisherNameFormControl,
      authorName: this.authorNameFormControl,
      notes: this.notesFormControl,
    });
  }

  OnSubmitBookSuggestionForm() {
    this._bookSuggestionService
      .CreateBookSuggestion(this.bookSuggestionFormGroup.value)
      .subscribe({
        next: (res) => {
          this._toastr.success(
            'سيتم التواصل معك على البريد الالكتروني لاحقا',
            'تم ارسال رسالتك بنجاح ',
            {
              positionClass: 'toast-top-center',
            }
          );

          this._router.navigate(['/home']);
        },
        error: (err) => {
          this._toastr.error('حدث خطأ');
          console.log(err);
        },
      });
  }
  private InitFormControls() {
    this.emailFormControl = new FormControl('', [
      Validators.required,
      Validators.email,
    ]);
    this.bookNameFormControl = new FormControl('', [Validators.required]);
    this.authorNameFormControl = new FormControl('', [Validators.required]);
    this.publisherNameFormControl = new FormControl('', [Validators.required]);
    this.notesFormControl = new FormControl('', [Validators.required]);
  }
}
