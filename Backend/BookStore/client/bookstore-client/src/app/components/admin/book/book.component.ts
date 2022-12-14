import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { IAuthorResponse } from 'src/app/interfaces/author/IAuthorResponse';
import { IBookResponse } from 'src/app/interfaces/book/IBookResponse';
import { ICategoryResponseDto } from 'src/app/interfaces/category/ICategoryResponseDto';
import { IPublisherResponse } from 'src/app/interfaces/publisher/PublisherDtos';
import { ITranslatorResponse } from 'src/app/interfaces/translator/TranslatorDtos';
import { AuthorService } from 'src/app/services/author.service';
import { BookService } from 'src/app/services/book.service';
import { CategoryService } from 'src/app/services/category.service';
import { PublisherService } from 'src/app/services/publisher.service';
import { TranslatorService } from 'src/app/services/translator.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
})
export class BookComponent implements OnInit {
  //#region book forms input
  bookFormGroup: FormGroup;
  name: FormControl;
  price: FormControl;
  discount: FormControl;
  about: FormControl;
  publishYear: FormControl;
  pageCount: FormControl;
  authorId: FormControl;
  translatorId: FormControl;
  publisherId: FormControl;
  categoryId: FormControl;
  bookCoverFileInput: FormControl;
  //#endregion

  //#region select inputs options
  authorsOptions: { id: number; name: string }[] = [];
  categoriesOptions: { id: number; name: string }[] = [];
  publishersOptions: { id: number; name: string }[] = [];
  translatorOptions: { id: number; name: string }[] = [];

  //#endregion

  //#region Book Page variables
  books: IBookResponse[] = [];
  imagesUrl = `${environment.baseURL}/images`;
  buttonLabel = 'انشاء';
  formType = 'create';
  bookId: number;
  imagePreview = '';
  //#endregion
  constructor(
    private _authorService: AuthorService,
    private _categoryService: CategoryService,
    private _publisherService: PublisherService,
    private _translatorService: TranslatorService,
    private _bookService: BookService,
    private _toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.InitForm();
    this.InitSelectOptions();
    this._bookService.GetAllBooks().subscribe({
      next: (res) => {
        this.books = res;
      },

      error: (err) => {
        this._toastr.error(err);
      },
    });
  }

  private InitSelectOptions() {
    this._authorService
      .GetAllAuthors()
      .pipe(
        map((res: IAuthorResponse[]) => {
          return res.map((a) => ({ id: a.id, name: a.name }));
        })
      )
      .subscribe({
        next: (res) => {
          this.authorsOptions = res;
        },
        error: (err) => {
          this._toastr.error(err, 'Error in fetching authors');
        },
      });

    this._categoryService
      .GetAllCategories()
      .pipe(
        map((res: ICategoryResponseDto[]) => {
          return res.map((a) => ({ id: a.id, name: a.name }));
        })
      )
      .subscribe({
        next: (res) => {
          this.categoriesOptions = res;
        },
        error: (err) => {
          this._toastr.error(err, 'Error in fetching categories');
        },
      });

    this._translatorService
      .GetAllTranslators()
      .pipe(
        map((res: ITranslatorResponse[]) => {
          return res.map((a) => ({ id: a.id, name: a.name }));
        })
      )
      .subscribe({
        next: (res) => {
          this.translatorOptions = res;
        },
        error: (err) => {
          this._toastr.error(err, 'Error in fetching translators');
        },
      });

    this._publisherService
      .GetAllPublishers()
      .pipe(
        map((res: IPublisherResponse[]) => {
          return res.map((a) => ({ id: a.id, name: a.name }));
        })
      )
      .subscribe({
        next: (res) => {
          this.publishersOptions = res;
        },
        error: (err) => {
          this._toastr.error(err, 'Error in fetching publishers');
        },
      });
  }

  private InitForm() {
    this.name = new FormControl('', [Validators.required]);
    this.price = new FormControl('', [Validators.required]);
    this.discount = new FormControl('', [Validators.required]);
    this.about = new FormControl('', [Validators.required]);
    this.publishYear = new FormControl('', [Validators.required]);
    this.pageCount = new FormControl('', [Validators.required]);
    this.translatorId = new FormControl('');
    this.publisherId = new FormControl('', [Validators.required]);
    this.categoryId = new FormControl('', [Validators.required]);
    this.authorId = new FormControl('', [Validators.required]);
    this.bookCoverFileInput = new FormControl('', [Validators.required]);

    this.bookFormGroup = new FormGroup({
      name: this.name,
      price: this.price,
      discount: this.discount,
      about: this.about,
      publishYear: this.publishYear,
      pageCount: this.pageCount,
      authorId: this.authorId,
      translatorId: this.translatorId,
      publisherId: this.publisherId,
      categoryId: this.categoryId,
      ImageFile: this.bookCoverFileInput,
    });
  }

  HandleFileInputChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files!;
    if (files.length > 0) {
      // file exist
      this.bookCoverFileInput.setValue(files[0]);
    }
    console.log(this.bookFormGroup.controls['ImageFile'].value);
  }

  HandleOnSubmit() {
    console.log(this.bookFormGroup.value);

    if (this.formType == 'create') {
      this.CreateBook();
    } else {
      this.UpdateBook();
    }
    this.ResetForm();
  }

  private UpdateBook() {
    this._bookService
      .UpdateBook(this.bookId, this.bookFormGroup.value)
      .subscribe({
        next: (res) => {
          this.books = this.books.filter((b) => b.id != res.id);
          this.books.push(res);

          this._toastr.success(
            `تم تحديث كتاب :${res.name},بنجاح`,
            'تمت العملية '
          );
        },
        error: (err) => {
          this._toastr.error(err, 'فشل العملية');
        },
      });
  }

  private CreateBook() {
    this._bookService.CreateBook(this.bookFormGroup.value).subscribe({
      next: (res) => {
        this._toastr.success(
          `تم اضافة كتاب :${res.name},بنجاح`,
          'تمت العملية '
        );
        this.books.push(res);
      },
      error: (err) => {
        this._toastr.error(err, 'فشل العملية');
      },
    });
  }

  HandleOnEdit(id: number) {
    this._bookService.GetBookById(id).subscribe({
      next: (res) => {
        this.bookFormGroup.controls['ImageFile'].clearValidators();
        this.bookFormGroup.controls['ImageFile'].updateValueAndValidity();

        this.name.setValue(res.name);
        this.price.setValue(res.price);
        this.discount.setValue(res.discount);
        this.about.setValue(res.about);
        this.publishYear.setValue(res.publishYear);
        this.pageCount.setValue(res.pageCount);
        this.authorId.setValue(res.author.id);
        this.publisherId.setValue(res.publisher.id);
        this.categoryId.setValue(res.category.id);

        if (res.translator) {
          this.translatorId.setValue(res.translator.id);
        }

        this.formType = 'update';
        this.buttonLabel = 'تحديث';
        this.imagePreview = `${this.imagesUrl}/${res.image}`;
        this.bookId = res.id;
      },
      error: (err) => {
        this._toastr.error(err);
      },
    });
  }

  private ResetForm() {
    this.formType = 'create';
    this.buttonLabel = 'انشاء';
    this.imagePreview = '';
    this.bookFormGroup.reset();

    this.bookFormGroup.controls['ImageFile'].setValidators([
      Validators.required,
    ]);
    this.bookFormGroup.controls['ImageFile'].updateValueAndValidity();
    console.log('form is reset back to create mode');
  }
}
