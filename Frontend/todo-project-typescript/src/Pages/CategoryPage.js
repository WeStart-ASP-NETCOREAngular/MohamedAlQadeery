"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CategoryService_1 = __importDefault(require("../Services/CategoryService"));
const toastr_1 = __importDefault(require("toastr"));
const CategoryHtmlElements_1 = require("../Shared/CategoryHtmlElements");
const sweetalert2_1 = __importDefault(require("sweetalert2"));
const tableHead = document.querySelector("#tableHead");
const tableBody = document.querySelector("#tableBody");
class CategoryHtmlPage {
    constructor() {
        this.categories = [];
        this._categoryService = new CategoryService_1.default();
    }
    OnPageLoad() {
        this._categoryService
            .GetAllCategories()
            .then((response) => {
            this.categories = response.data;
        })
            .catch((err) => toastr_1.default.error(err.message));
    }
    OnCategoriesClick() {
        UpdateTable();
        SetPageHeader();
        this.MapToTable();
    }
    OnClickCreateCategory(category) {
        this._categoryService
            .AddCategory(category)
            .then((response) => {
            this.categories.push(response.data);
            toastr_1.default.success(`${response.data.name} is added successfully!`);
            this.MapToTable();
            CategoryHtmlElements_1.categoriesBtn.click();
        })
            .catch((err) => {
            toastr_1.default.error(err.message);
        })
            .finally(function () {
            CategoryHtmlElements_1.DisplayCategoryModalButton.click(); // closes the modal when clicking on the button again
        });
    }
    OnClickDeleteCategory(id) {
        this._categoryService
            .DeleteCategory(id)
            .then((response) => {
            sweetalert2_1.default.fire("Success", `category has been deleted`, "success");
            this.categories = this.categories.filter((c) => c.id != id);
        })
            .catch((err) => {
            toastr_1.default.error(err.message);
            console.log(err);
        })
            .finally(function () {
            CategoryHtmlElements_1.categoriesBtn.click();
        });
    }
    OnUpdateCategory(id, category) {
        this._categoryService
            .UpdateCategory(id, category)
            .then((response) => {
            toastr_1.default.success(`${response.data.name} category has been updated succesfully !`);
            this.categories.find((c) => c.id == id).name = response.data.name;
            CategoryHtmlElements_1.categoriesBtn.click();
        })
            .catch((err) => {
            toastr_1.default.error(err.message);
        })
            .finally(function () {
            let closeButton = document.querySelector("#closeUpdateCategoryModalButton");
            closeButton.click();
        });
    }
    MapToTable() {
        tableBody.innerHTML = "";
        const resultData = this.categories
            .map((el, index) => {
            return ` <tr>
        <th scope="col">${++index}</th>
        <th scope="col">${el.name}</th>
        <th scope="col">${el.todosCount}</th>
        <th scope="col">
          <a data-bs-toggle="modal"
          data-bs-target="#editCategoryModal" data-id="${el.id}" data-todoCount ="${el.todosCount}" data-name="${el.name}" class="btn btn-primary">Edit</a>
         
          <a  data-id="${el.id}" id="delete-category" class="btn btn-danger delete">Delete</a>
        
        </th>
      </tr>`;
        })
            .join(" ");
        tableBody.innerHTML = resultData;
    }
}
exports.default = CategoryHtmlPage;
function UpdateTable() {
    tableHead.innerHTML = CategoryHtmlElements_1.categoriesTableHead;
    tableBody.innerHTML = "";
}
function SetPageHeader() {
    let page_header = document.querySelector("#page-header");
    page_header.innerHTML = "Categories Page";
}
