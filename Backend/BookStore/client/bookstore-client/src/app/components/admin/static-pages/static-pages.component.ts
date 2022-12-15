import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IStaticPageResponse } from 'src/app/interfaces/static-pages/IStaticPagesDtos';
import { StaticPagesService } from 'src/app/services/static-pages.service';

@Component({
  selector: 'app-static-pages',
  templateUrl: './static-pages.component.html',
  styleUrls: ['./static-pages.component.css'],
})
export class StaticPagesComponent implements OnInit {
  formType = 'create';
  buttonLabel = 'انشاء';

  //#region StaticPage Forms Controls
  staticPageFormGroup: FormGroup;
  pageNameInput: FormControl;
  detailsInput: FormControl;
  //#endregion

  staticPageId: number;
  staticPages: IStaticPageResponse[] = [];

  constructor(
    private _staticPageService: StaticPagesService,
    private _toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.InitForm();

    this._staticPageService.GetAllStaticPages().subscribe((res) => {
      this.staticPages = res;
    });
  }

  private InitForm() {
    this.pageNameInput = new FormControl('', [Validators.required]);
    this.detailsInput = new FormControl('', [Validators.required]);

    this.staticPageFormGroup = new FormGroup({
      pageName: this.pageNameInput,
      details: this.detailsInput,
    });
  }

  HandleOnSubmit() {
    console.log(this.staticPageFormGroup.value);
    if (this.formType == 'create') {
      this.CreateStaticPage();
    } else {
      this.UpdateStaticPage();
    }

    this.ResetForm();
  }

  HandleOnEdit(staticPageId: number) {
    this._staticPageService.GetStaticPageById(staticPageId).subscribe((res) => {
      this.formType = 'update';
      this.buttonLabel = 'تحديث';
      this.pageNameInput.setValue(res.pageName);
      this.detailsInput.setValue(res.details);

      this.staticPageId = res.id;
    });
  }

  private UpdateStaticPage() {
    this._staticPageService
      .UpdateStaticPage(this.staticPageFormGroup.value, this.staticPageId)
      .subscribe((res) => {
        let staticPage = this.staticPages.find((c) => c.id == res.id)!;
        staticPage.pageName = res.pageName;
        staticPage.details = res.details;

        this._toastr.success(`تم تحديث الصفحة الثابته بنجاح `, 'تمت العملية');
      });
  }

  private CreateStaticPage() {
    this._staticPageService
      .CreateStaticPage(this.staticPageFormGroup.value)
      .subscribe((res) => {
        this.staticPages.push(res);
        this._toastr.success(`تم اضافة الصفحة الثابتة بنجاح `, 'تمت العملية');
      });
  }

  HandleOnDelete(staticPageId: number) {
    this._staticPageService.DeleteStaticPage(staticPageId).subscribe({
      next: () => {
        this._toastr.success('تم حذف لبصفحة الثابته بنجاح', 'تمت العملية');
        this.staticPages = this.staticPages.filter((c) => c.id != staticPageId);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  private ResetForm() {
    this.formType = 'create';
    this.buttonLabel = 'انشاء';

    this.staticPageFormGroup.reset();
  }
}
