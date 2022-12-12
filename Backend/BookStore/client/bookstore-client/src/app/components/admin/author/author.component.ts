import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IAuthorResponse } from 'src/app/interfaces/author/IAuthorResponse';
import { AuthorService } from 'src/app/services/author.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css'],
})
export class AuthorComponent implements OnInit {
  formType = 'create';
  buttonLabel = 'انشاء';
  authorFormGroup: FormGroup;
  authorNameInput: FormControl;
  authorId: number;
  authors: IAuthorResponse[] = [];

  showAlert = false;
  alertMessage = '';
  constructor(private _authorService: AuthorService) {}

  ngOnInit(): void {
    this.authorNameInput = new FormControl('', [Validators.required]);
    this.authorFormGroup = new FormGroup({ name: this.authorNameInput });

    this._authorService.GetAllAuthors().subscribe((res) => {
      this.authors = res;
    });
  }

  HandleOnSubmit() {
    console.log(this.authorFormGroup.value);
    if (this.formType == 'create') {
      this.CreateAuthor();
    } else {
      this.UpdateAuthor();
    }

    this.ResetForm();
  }

  HandleOnEdit(authorId: number) {
    this._authorService.GetAuthorById(authorId).subscribe((res) => {
      this.formType = 'update';
      this.buttonLabel = 'تحديث';
      this.authorNameInput.setValue(res.name);
      this.authorId = res.id;
    });
  }

  private UpdateAuthor() {
    this._authorService
      .UpdateAuthor(this.authorFormGroup.value, this.authorId)
      .subscribe((res) => {
        let author = this.authors.find((c) => c.id == res.id)!;
        author.name = res.name;
      });
  }

  private CreateAuthor() {
    this._authorService
      .CreateAuthor(this.authorFormGroup.value)
      .subscribe((res) => {
        this.authors.push(res);
      });
  }

  HandleOnDelete(authorId: number) {
    this._authorService.DeleteAuthor(authorId).subscribe({
      next: () => {
        this.ShowAlertMessage('تم حذف المؤلف بنجاح');
        this.authors = this.authors.filter((c) => c.id != authorId);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ShowAlertMessage(message: string) {
    this.alertMessage = message;
    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false;
    }, 3000);
  }

  private ResetForm() {
    this.ShowAlertMessage('تم انشاء/تحديث البيانات بنجاح');
    this.formType = 'create';
    this.buttonLabel = 'انشاء';

    this.authorFormGroup.reset();
  }
}
