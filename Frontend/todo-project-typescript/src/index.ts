import ICategory from "./Interfaces/ICategory";
import CategoryService from "./Services/CategoryService";
import toastr from "toastr";
import {
  categoriesBtn,
  categoriesTableHead,
  createCategoryButton,
  DisplayCategoryModalButton,
} from "./Shared/CategoryHtmlElements";

var _categories: ICategory[] = [];

const tableHead = document.querySelector("#tableHead") as HTMLElement;
const tableBody = document.querySelector("#tableBody") as HTMLElement;

const _categoryService: CategoryService = new CategoryService();

// Start of functions
function MapCategoriesToTable() {
  tableBody.innerHTML = "";
  const resultData = _categories
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

function UpdateTable() {
  tableHead.innerHTML = categoriesTableHead;
  tableBody.innerHTML = "";
}

function SetPageHeader() {
  let page_header = document.querySelector("#page-header") as HTMLElement;
  page_header.innerHTML = "Categories Page";
}

// End of functions

// Start of events
window.addEventListener("load", function (e) {
  _categoryService
    .GetAllCategories()
    .then((response) => {
      _categories = response.data;
    })
    .catch((err) => toastr.error(err.message));
});

categoriesBtn.addEventListener("click", function (event) {
  event.preventDefault();

  UpdateTable();
  SetPageHeader();
  MapCategoriesToTable();
});

createCategoryButton.addEventListener("click", function (e) {
  e.preventDefault();
  let categoryName = document.querySelector(
    "#categoryName"
  ) as HTMLInputElement;

  _categoryService
    .AddCategory({ name: categoryName.value })
    .then((response) => {
      _categories.push(response.data);
      toastr.success(`${response.data.name} is added successfully!`);
      MapCategoriesToTable();
      categoriesBtn.click();
    })
    .catch((err) => {
      toastr.error(err.message);
    })
    .finally(function () {
      DisplayCategoryModalButton.click(); // closes the modal when clicking on the button again
    });
});

// End of events
