import axios from "axios";
import toastr from "toastr";
import * as bootstrap from "bootstrap";

import Swal from "sweetalert2";
// Axios

const BASEURL = "https://localhost:7098";

const categoriesBtn = document.querySelector(
  "#categoriesBtn"
) as HTMLButtonElement;
const createCategoryButton = document.querySelector(
  "#createCategoryButton"
) as HTMLButtonElement;
const updateCategoryButton = document.querySelector("#updateCategoryButton");

const DisplayCategoryModalButton = document.querySelector(
  "#DisplayCategoryModalButton"
) as HTMLButtonElement;
const editCategoryModal = document.querySelector("#editCategoryModal");

const tableHead = document.querySelector("#tableHead") as HTMLElement;
const tableBody = document.querySelector("#tableBody") as HTMLElement;

//categories table
let categoriesTableHead = ` <tr>
<th scope="col">#</th>
<th scope="col">Name</th>
<th scope="col">Todos Count</th>
<th scope="col">Action</th>
</tr>`;

type Category = {
  id?: number;
  name: string;
  todosCount?: number;
};

categoriesBtn.addEventListener("click", function (event) {
  event.preventDefault();
  tableHead.innerHTML = categoriesTableHead;
  tableBody.innerHTML = "";
  let page_header = document.querySelector("#page-header") as HTMLElement;
  page_header.innerHTML = "Categories Page";

  GetAllCategories();
});

createCategoryButton.addEventListener("click", function (event) {
  event.preventDefault();

  let nameInput: HTMLInputElement = document.querySelector(
    "#categoryName"
  ) as HTMLInputElement;

  AddCategory({ name: nameInput.value });
});

editCategoryModal?.addEventListener("show.bs.modal", function (event) {
  // Button that triggered the modal
  const editButton = event.relatedTarget as HTMLButtonElement;
  var categoryName = editButton.getAttribute("data-name");

  let id = editButton.getAttribute("data-id");

  const modalCategoryName = editCategoryModal.querySelector(
    ".categoryUpdateName"
  );
  const modalcategoryId = editCategoryModal.querySelector(".categoryId");

  modalCategoryName?.setAttribute("value", `${categoryName}`);
  modalcategoryId?.setAttribute("value", `${id}`);
});

updateCategoryButton?.addEventListener("click", function (event) {
  event.preventDefault();
  let categoryNameInput = editCategoryModal?.querySelector(
    ".categoryUpdateName"
  ) as HTMLInputElement;
  let categoryId = editCategoryModal?.querySelector(
    ".categoryId"
  ) as HTMLInputElement;

  UpdateCategory(+categoryId.value, { name: categoryNameInput.value });
});

function AddCategory(category: Category) {
  axios
    .post(BASEURL + "/api/Category", { name: category.name })
    .then((response) => {
      toastr.success(
        `${response.data.name} category has been created succesfully !`
      );
      categoriesBtn.click();
    })
    .catch((err) => toastr.error(err.message))
    .finally(function () {
      DisplayCategoryModalButton.click();
    });
}

function GetAllCategories() {
  axios
    .get(BASEURL + "/api/category")
    .then((response) => {
      console.log(response.data);
      const resultData = response.data
        .map((el: Category, index: number) => {
          return ` <tr>
            <th scope="col">${++index}</th>
            <th scope="col">${el.name}</th>
            <th scope="col">${el.todosCount}</th>
            <th scope="col">
              <a data-bs-toggle="modal"
              data-bs-target="#editCategoryModal" data-id="${
                el.id
              }" data-name="${el.name}" class="btn btn-primary">Edit</a>
             
              <a  data-id="${
                el.id
              }" id="delete-category" class="btn btn-danger delete">Delete</a>
            
            </th>
          </tr>`;
        })
        .join(" ");

      tableBody.innerHTML = resultData;
    })
    .catch((err) => {
      toastr.error(err.message);
    });
}

function UpdateCategory(id: number, category: Category) {
  axios
    .put(BASEURL + "/api/category/" + id, category)
    .then((response) => {
      toastr.success(
        `${response.data.name} category has been updated succesfully !`
      );
      categoriesBtn.click();
    })
    .catch((err) => {
      toastr.error(err.message);
    })
    .finally(function () {
      let closeButton = document.querySelector(
        "#closeUpdateCategoryModalButton"
      ) as HTMLButtonElement;

      closeButton.click();
    });
}
