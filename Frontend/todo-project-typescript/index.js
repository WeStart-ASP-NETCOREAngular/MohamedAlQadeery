"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const toastr_1 = __importDefault(require("toastr"));
// Axios
const BASEURL = "https://localhost:7098";
const categoriesBtn = document.querySelector("#categoriesBtn");
const createCategoryButton = document.querySelector("#createCategoryButton");
const updateCategoryButton = document.querySelector("#updateCategoryButton");
const DisplayCategoryModalButton = document.querySelector("#DisplayCategoryModalButton");
const editCategoryModal = document.querySelector("#editCategoryModal");
const tableHead = document.querySelector("#tableHead");
const tableBody = document.querySelector("#tableBody");
//categories table
let categoriesTableHead = ` <tr>
<th scope="col">#</th>
<th scope="col">Name</th>
<th scope="col">Todos Count</th>
<th scope="col">Action</th>
</tr>`;
categoriesBtn.addEventListener("click", function (event) {
    event.preventDefault();
    tableHead.innerHTML = categoriesTableHead;
    tableBody.innerHTML = "";
    let page_header = document.querySelector("#page-header");
    page_header.innerHTML = "Categories Page";
    GetAllCategories();
});
function AddCategory(category) {
    axios_1.default
        .post(BASEURL + "/api/Category", { name: category.name })
        .then((response) => {
        // toastr.success(
        //   `${response.data.name} category has been created succesfully !`
        // );
        //categoriesBtn.click();
    })
        .catch((err) => toastr_1.default.error(err.message))
        .finally(function () {
        //DisplayCategoryModalButton.click();
        console.log("as");
    });
}
function GetAllCategories() {
    axios_1.default
        .get(BASEURL + "/api/category")
        .then((response) => {
        console.log(response.data);
        const resultData = response.data
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
    })
        .catch((err) => {
        toastr_1.default.error(err.message);
    });
}
