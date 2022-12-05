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
  ngOnInit(): void {
    this.categoryForm = new FormGroup({
      name: this.categoryNameInput,
    });

    this._route.paramMap.subscribe((param) => {
      console.log(param.get('id'));
    });
  }

  HandleOnSubmit() {
    console.log(this.categoryForm.value);
  }
}
