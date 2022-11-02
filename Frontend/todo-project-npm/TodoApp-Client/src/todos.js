import axios from "axios";

import toastr from "toastr";
import bootstrap from "bootstrap";

import swal from "sweetalert";
import axios from "axios";

import toastr from "toastr";
import bootstrap from "bootstrap";

import swal from "sweetalert";

const BASEURL = "https://localhost:7098";
const todosBtn = document.querySelector("#todosBtn");
const DisplayTodoModalButton = document.querySelector(
  "#DisplayTodoModalButton"
);
const categoriesSelectInput = document.querySelector("#CategoriesSelectInput");
const addTodoButton = document.querySelector("#addTodoButton");

let todosTableHead = ` <tr>
<th scope="col">#</th>
<th scope="col">Name</th>
<th scope="col">Category</th>
<th scope="col">Status</th>
<th scope="col">Action</th>

</tr>`;

todosBtn.addEventListener("click", function (event) {
  event.preventDefault();
  tableHead.innerHTML = todosTableHead;
  tableBody.innerHTML = "";

  axios
    .get(BASEURL + "/api/todo")
    .then((response) => {
      console.log(response);
      const resultData = response.data
        .map((el, index) => {
          return ` <tr>
          <th scope="col">${++index}</th>
          <th scope="col">${el.task}</th>
          <th scope="col">${el.categoryName}</th>
          <th scope="col">${
            el.isCompleted == true ? "Completed" : "Pending"
          }</th>
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
    })
    .catch((err) => {
      toastr.error(err.message);
    });
});

DisplayTodoModalButton.addEventListener("click", function (event) {
  event.preventDefault();

  axios
    .get(BASEURL + "/api/category")
    .then((response) => {
      const result = response.data.map(
        (el) => `<option value ="${el.id}">${el.name}</option>`
      );

      categoriesSelectInput.innerHTML = result;
    })
    .catch((err) => toastr.error(err.message));
});

addTodoButton.addEventListener("click", function (event) {
  event.preventDefault();
  let category_input = document.querySelector("#CategoriesSelectInput");
  let categoryId = category_input.options[category_input.selectedIndex].value;

  let todoTask = document.querySelector("#todoTask").value;
  let todoDescription = document.querySelector("#todoDescription").value;

  let dueDate = document.querySelector("#dueDate").value;

  axios
    .post(BASEURL + "/api/todo", {
      categoryId: categoryId,
      task: todoTask,
      description: todoDescription,
      dueDate: dueDate,
    })
    .then((respone) => {
      toastr.success(`${respone.data.task} has been created successfully`);
      todosBtn.click();
    })
    .catch((err) => toastr.error(err.message))
    .finally(function () {
      document.querySelector("#closeCreateTodoModalButton").click();
    });
});
