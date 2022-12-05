import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICategoryResponseDto } from 'src/app/interfaces/category/ICategoryResponseDto';
import { CategoryService } from 'src/app/services/category.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories-list.component.html',
  styleUrls: ['./admin-categories-list.component.css'],
})
export class AdminCategoriesListComponent implements OnInit {
  categoires: ICategoryResponseDto[] = [];

  constructor(
    private _categoryService: CategoryService,
    private _toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this._categoryService.GetAllCategories().subscribe({
      next: (categories) => {
        this.categoires = categories;
      },

      error: (err) => {
        console.log(err);
      },
    });
  }

  HandleOnDelete(id: number) {
    this._categoryService.DeleteCategory(id).subscribe({
      next: () => {
        this._toastr.info('category has been deleted successfully!');
        this.categoires = this.categoires.filter((c) => c.id != id);
      },

      error: (err) => {
        console.log(err);
      },
    });
  }
}
