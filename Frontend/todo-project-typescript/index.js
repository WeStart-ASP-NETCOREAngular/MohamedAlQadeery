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
createCategoryButton.addEventListener("click", function (event) {
    event.preventDefault();
    let nameInput = document.querySelector("#categoryName");
    AddCategory({ name: nameInput.value });
});
editCategoryModal === null || editCategoryModal === void 0 ? void 0 : editCategoryModal.addEventListener("show.bs.modal", function (event) {
    // Button that triggered the modal
    const editButton = event.relatedTarget;
    var categoryName = editButton.getAttribute("data-name");
    let id = editButton.getAttribute("data-id");
    const modalCategoryName = editCategoryModal.querySelector(".categoryUpdateName");
    const modalcategoryId = editCategoryModal.querySelector(".categoryId");
    modalCategoryName === null || modalCategoryName === void 0 ? void 0 : modalCategoryName.setAttribute("value", `${categoryName}`);
    modalcategoryId === null || modalcategoryId === void 0 ? void 0 : modalcategoryId.setAttribute("value", `${id}`);
});
updateCategoryButton === null || updateCategoryButton === void 0 ? void 0 : updateCategoryButton.addEventListener("click", function (event) {
    event.preventDefault();
    let categoryNameInput = editCategoryModal === null || editCategoryModal === void 0 ? void 0 : editCategoryModal.querySelector(".categoryUpdateName");
    let categoryId = editCategoryModal === null || editCategoryModal === void 0 ? void 0 : editCategoryModal.querySelector(".categoryId");
    UpdateCategory(+categoryId.value, { name: categoryNameInput.value });
});
function AddCategory(category) {
    axios_1.default
        .post(BASEURL + "/api/Category", { name: category.name })
        .then((response) => {
        toastr_1.default.success(`${response.data.name} category has been created succesfully !`);
        categoriesBtn.click();
    })
        .catch((err) => toastr_1.default.error(err.message))
        .finally(function () {
        DisplayCategoryModalButton.click();
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
function UpdateCategory(id, category) {
    axios_1.default
        .put(BASEURL + "/api/category/" + id, category)
        .then((response) => {
        toastr_1.default.success(`${response.data.name} category has been updated succesfully !`);
        categoriesBtn.click();
    })
        .catch((err) => {
        toastr_1.default.error(err.message);
    })
        .finally(function () {
        let closeButton = document.querySelector("#closeUpdateCategoryModalButton");
        closeButton.click();
    });
}
