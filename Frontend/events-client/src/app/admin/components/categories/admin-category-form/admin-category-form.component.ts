import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-category-form',
  templateUrl: './admin-category-form.component.html',
  styleUrls: ['./admin-category-form.component.css'],
})
export class AdminCategoryFormComponent implements OnInit {
  constructor(private _route: ActivatedRoute) {}
  categoryForm: FormGroup;
  categoryNameInput: FormControl = new FormControl('', Validators.required);

  formType = 'create';
  ngOnInit(): void {
    this.categoryForm = new FormGroup({
      name: this.categoryNameInput,
    });

    this._route.paramMap.subscribe((param) => {
      let id = param.get('id');
      if (id) {
        this.categoryForm.addControl(
          'id',
          new FormControl(id, Validators.required)
        );
        this.formType = 'Update';
      }
    });

    console.log(this.categoryForm.controls);
  }

  HandleOnSubmit() {
    console.log(this.categoryForm.value);
    if (this.formType == 'create') {
      console.log('Createing new Category ...');
    } else {
      console.log('Updating category........');
    }
  }
}
