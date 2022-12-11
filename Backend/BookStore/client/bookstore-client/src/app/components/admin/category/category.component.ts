import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  formType = 'create';
  categoryFormGroup: FormGroup;
  categoryNameInput: FormControl;
  constructor() {}

  ngOnInit(): void {}
}
