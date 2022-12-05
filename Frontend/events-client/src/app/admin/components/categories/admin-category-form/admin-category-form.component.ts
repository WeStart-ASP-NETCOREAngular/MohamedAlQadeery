import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-admin-category-form',
  templateUrl: './admin-category-form.component.html',
  styleUrls: ['./admin-category-form.component.css'],
})
export class AdminCategoryFormComponent implements OnInit {
  categoryForm: FormGroup;
  categoryNameInput: FormControl = new FormControl('', Validators.required);
  id: string | null;
  formType = 'create';
  constructor(
    private _route: ActivatedRoute,
    private _categoryService: CategoryService,
    private _router: Router,
    private _spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.categoryForm = new FormGroup({
      name: this.categoryNameInput,
    });

    this.TryEditForm();
  }

  HandleOnSubmit() {
    console.log(this.categoryForm.value);
    this._spinner.show();
    if (this.formType == 'create') {
      this._categoryService.CreateCategory(this.categoryForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this._spinner.hide();
          this._router.navigate(['admin/categories']);
        },

        error: (err) => {
          console.log(err);
          this._spinner.hide();
        },
      });
    } else {
      console.log('Updating category........');

      this._categoryService
        .UpdateCategory(this.categoryForm.value, +this.id!)
        .subscribe({
          next: (res) => {
            console.log(res);
            this._spinner.hide();
            this._router.navigate(['admin/categories']);
          },

          error: (err) => {
            console.log(err);
            this._spinner.hide();
          },
        });
    }
  }

  private TryEditForm() {
    this._route.paramMap.subscribe((param) => {
      this.id = param.get('id');
      if (this.id) {
        this._spinner.show();
        this._categoryService.GetCategoryById(+this.id).subscribe({
          next: (category) => {
            this.categoryForm.controls['name'].setValue(category.name);

            this.formType = 'Update';
            this._spinner.hide();
          },

          error: (err) => {
            console.log(err);
            this._router.navigate(['admin/categories']);
          },
        });
      }
    });
  }
}
