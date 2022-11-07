import ICategory from "../Interfaces/ICategory";
import CategoryService from "../Services/CategoryService";
import toastr from "toastr";

import {
  categoriesBtn,
  categoriesTableHead,
  DisplayCategoryModalButton,
} from "../Shared/CategoryHtmlElements";

const tableHead = document.querySelector("#tableHead") as HTMLElement;
const tableBody = document.querySelector("#tableBody") as HTMLElement;

export default class CategoryHtmlPage {
  public categories: ICategory[] = [];
  private _categoryService: CategoryService = new CategoryService();
  constructor() {}

  OnPageLoad() {
    this._categoryService
      .GetAllCategories()
      .then((response) => {
        this.categories = response.data;
      })
      .catch((err) => toastr.error(err.message));
  }

  OnCategoriesClick() {
    UpdateTable();
    SetPageHeader();
    this.MapToTable();
  }

  OnClickCreateCategory(category: ICategory) {
    this._categoryService
      .AddCategory(category)
      .then((response) => {
        this.categories.push(response.data);
        toastr.success(`${response.data.name} is added successfully!`);
        this.MapToTable();
        categoriesBtn.click();
      })
      .catch((err) => {
        toastr.error(err.message);
      })
      .finally(function () {
        DisplayCategoryModalButton.click(); // closes the modal when clicking on the button again
      });
  }

  MapToTable() {
    tableBody.innerHTML = "";
    const resultData = this.categories
      .map((el: ICategory, index: number) => {
        return ` <tr>
        <th scope="col">${++index}</th>
        <th scope="col">${el.name}</th>
        <th scope="col">${el.todosCount}</th>
        <th scope="col">
          <a data-bs-toggle="modal"
          data-bs-target="#editCategoryModal" data-id="${el.id}" data-name="${
          el.name
        }" class="btn btn-primary">Edit</a>
         
          <a  data-id="${
            el.id
          }" id="delete-category" class="btn btn-danger delete">Delete</a>
        
        </th>
      </tr>`;
      })
      .join(" ");

    tableBody.innerHTML = resultData;
  }
}

function UpdateTable() {
  tableHead.innerHTML = categoriesTableHead;
  tableBody.innerHTML = "";
}

function SetPageHeader() {
  let page_header = document.querySelector("#page-header") as HTMLElement;
  page_header.innerHTML = "Categories Page";
}
