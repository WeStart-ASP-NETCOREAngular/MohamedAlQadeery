"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CategoryService_1 = __importDefault(require("./Services/CategoryService"));
const toastr_1 = __importDefault(require("toastr"));
const CategoryHtmlElements_1 = require("./Shared/CategoryHtmlElements");
var _categories = [];
const tableHead = document.querySelector("#tableHead");
const tableBody = document.querySelector("#tableBody");
const _categoryService = new CategoryService_1.default();
window.addEventListener("load", function (e) {
    _categoryService
        .GetAllCategories()
        .then((response) => {
        _categories = response.data;
    })
        .catch((err) => toastr_1.default.error(err.message));
});
CategoryHtmlElements_1.categoriesBtn.addEventListener("click", function (event) {
    event.preventDefault();
    UpdateTable();
    SetPageHeader();
    MapCategoriesToTable();
});
function MapCategoriesToTable() {
    const resultData = _categories
        .map((el, index) => {
        return ` <tr>
      <th scope="col">${++index}</th>
      <th scope="col">${el.name}</th>
      <th scope="col">${el.todosCount}</th>
      <th scope="col">
        <a data-bs-toggle="modal"
        data-bs-target="#editCategoryModal" data-id="${el.id}" data-name="${el.name}" class="btn btn-primary">Edit</a>
       
        <a  data-id="${el.id}" id="delete-category" class="btn btn-danger delete">Delete</a>
      
      </th>
    </tr>`;
    })
        .join(" ");
    tableBody.innerHTML = resultData;
}
function UpdateTable() {
    tableHead.innerHTML = CategoryHtmlElements_1.categoriesTableHead;
    tableBody.innerHTML = "";
}
function SetPageHeader() {
    let page_header = document.querySelector("#page-header");
    page_header.innerHTML = "Categories Page";
}
