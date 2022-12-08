import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { TagService } from 'src/app/services/tag.service';

@Component({
  selector: 'app-admin-tag-form',
  templateUrl: './admin-tag-form.component.html',
  styleUrls: ['./admin-tag-form.component.css'],
})
export class AdminTagFormComponent implements OnInit {
  tagForm: FormGroup;
  tagNameInput: FormControl = new FormControl('', Validators.required);
  id: number | null;
  formType = 'create';
  constructor(
    private _route: ActivatedRoute,
    private _tagService: TagService,
    private _router: Router,
    private _spinner: NgxSpinnerService,
    private _toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.tagForm = new FormGroup({
      name: this.tagNameInput,
    });

    this.TryEditForm();
  }

  HandleOnSubmit() {
    console.log(this.tagForm.value);
    this._spinner.show();
    if (this.formType == 'create') {
      this.CreateTag();
    } else {
      console.log('Updating tag........ for ' + this.id);
      this.UpdateTag();
    }
  }

  private UpdateTag() {
    this._tagService.UpdateTag(this.tagForm.value, +this.id!).subscribe({
      next: (res) => {
        console.log(res);
        this._spinner.hide();
        this._toastr.success(
          `Tag : ${res.name} has been updated successfully !`
        );

        this._router.navigate(['admin/tags']);
      },

      error: (err) => {
        console.log(err);
        this._spinner.hide();
      },
    });
  }

  private CreateTag() {
    this._tagService.CreateTag(this.tagForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this._spinner.hide();
        this._toastr.success(
          `Tag : ${res.name} has been created successfully !`
        );
        this._router.navigate(['admin/tags']);
      },

      error: (err) => {
        console.log(err);
        this._spinner.hide();
      },
    });
  }

  private TryEditForm() {
    this._route.paramMap.subscribe((param) => {
      this.id = +param.get('id')!;
      if (this.id) {
        this._spinner.show();
        this._tagService.GetTagById(+this.id).subscribe({
          next: (tag) => {
            this.tagForm.controls['name'].setValue(tag.name);

            this.formType = 'Update';
            this._spinner.hide();
          },

          error: (err) => {
            console.log(err);
            this._router.navigate(['admin/tags']);
          },
        });
      }
    });
  }
}
