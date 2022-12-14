import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { IAuthorResponse } from 'src/app/interfaces/author/IAuthorResponse';
import { ICategoryResponseDto } from 'src/app/interfaces/category/ICategoryResponseDto';
import { IPublisherResponse } from 'src/app/interfaces/publisher/PublisherDtos';
import { ITranslatorResponse } from 'src/app/interfaces/translator/TranslatorDtos';
import { AuthorService } from 'src/app/services/author.service';
import { CategoryService } from 'src/app/services/category.service';
import { PublisherService } from 'src/app/services/publisher.service';
import { TranslatorService } from 'src/app/services/translator.service';

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
  buttonLabel = 'انشاء';
  constructor(
    private _authorService: AuthorService,
    private _categoryService: CategoryService,
    private _publisherService: PublisherService,
    private _translatorService: TranslatorService,
    private _toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.InitForm();
    this.InitSelectOptions();
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
    console.log('Book Cover input changed : ' + files);
  }
}
