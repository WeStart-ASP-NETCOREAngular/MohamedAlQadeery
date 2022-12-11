import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ICategoryResponseDto } from 'src/app/interfaces/category/ICategoryResponseDto';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  formType = 'create';
  buttonLabel = 'انشاء';
  categoryFormGroup: FormGroup;
  categoryNameInput: FormControl;
  categoryId: number;
  categories: ICategoryResponseDto[] = [];

  constructor(private _categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryNameInput = new FormControl('', [Validators.required]);
    this.categoryFormGroup = new FormGroup({ name: this.categoryNameInput });

    this._categoryService.GetAllCategories().subscribe((res) => {
      this.categories = res;
    });
  }

  HandleOnSubmit() {
    console.log(this.categoryFormGroup.value);
    if (this.formType == 'create') {
      this._categoryService
        .CreateCategory(this.categoryFormGroup.value)
        .subscribe((res) => {
          this.categories.push(res);
        });
    } else {
      this._categoryService
        .UpdateCategory(this.categoryFormGroup.value, this.categoryId)
        .subscribe((res) => {
          let category = this.categories.find((c) => c.id == res.id)!;
          category.name = res.name;
        });
    }

    this.categoryFormGroup.reset();
  }

  OnEdit(categoryId: number) {
    this._categoryService.GetCategoryById(categoryId).subscribe((res) => {
      this.formType = 'update';
      this.buttonLabel = 'تحديث';
      this.categoryNameInput.setValue(res.name);
      this.categoryId = res.id;
    });
  }
}
