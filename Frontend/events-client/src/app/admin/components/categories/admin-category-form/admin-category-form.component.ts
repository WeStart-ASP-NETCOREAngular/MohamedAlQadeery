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
    if (this.formType == 'create') {
      console.log('Createing new Category ...');
    } else {
      console.log('Updating category........');
    }
  }

  private TryEditForm() {
    this._route.paramMap.subscribe((param) => {
      let id = param.get('id');
      if (id) {
        this._spinner.show();
        this._categoryService.GetCategoryById(+id).subscribe({
          next: (category) => {
            this.categoryForm.controls['name'].setValue(category.name);
            this.categoryForm.addControl(
              'id',
              new FormControl(id, Validators.required)
            );
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
