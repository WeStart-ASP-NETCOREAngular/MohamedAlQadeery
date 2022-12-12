import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { timeout } from 'rxjs';
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

  showAlert = false;
  alertMessage = '';
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
      this.CreateCategory();
    } else {
      this.UpdateCategory();
    }

    this.ShowAlertMessage('تم انشاء/تحديث البيانات بنجاح');

    this.categoryFormGroup.reset();
  }

  HandleOnEdit(categoryId: number) {
    this._categoryService.GetCategoryById(categoryId).subscribe((res) => {
      this.formType = 'update';
      this.buttonLabel = 'تحديث';
      this.categoryNameInput.setValue(res.name);
      this.categoryId = res.id;
    });
  }

  private UpdateCategory() {
    this._categoryService
      .UpdateCategory(this.categoryFormGroup.value, this.categoryId)
      .subscribe((res) => {
        let category = this.categories.find((c) => c.id == res.id)!;
        category.name = res.name;
      });
  }

  private CreateCategory() {
    this._categoryService
      .CreateCategory(this.categoryFormGroup.value)
      .subscribe((res) => {
        this.categories.push(res);
      });
  }

  HandleOnDelete(categoryId: number) {
    this._categoryService.DeleteCategory(categoryId).subscribe({
      next: () => {
        this.ShowAlertMessage('تم حذف التصنيف بنجاح');
        this.categories = this.categories.filter((c) => c.id != categoryId);
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
}
