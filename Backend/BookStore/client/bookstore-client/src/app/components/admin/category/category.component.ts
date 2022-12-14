import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
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

  constructor(
    private _categoryService: CategoryService,
    private _toastr: ToastrService
  ) {}

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

    this.ResetForm();
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
        this._toastr.success(
          `تم تحديث التصنيف : ${category.name}, بنجاح`,
          'تمت العملية'
        );
      });
  }

  private CreateCategory() {
    this._categoryService
      .CreateCategory(this.categoryFormGroup.value)
      .subscribe((res) => {
        this.categories.push(res);
        this._toastr.success(
          `تم اضافة التصنيف : ${res.name}, بنجاح`,
          'تمت العملية'
        );
      });
  }

  HandleOnDelete(categoryId: number) {
    this._categoryService.DeleteCategory(categoryId).subscribe({
      next: () => {
        this._toastr.success('تم حذف التصنيف بنجاح', 'تمت العملية');
        this.categories = this.categories.filter((c) => c.id != categoryId);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  private ResetForm() {
    this.formType = 'create';
    this.buttonLabel = 'انشاء';

    this.categoryFormGroup.reset();
  }
}
