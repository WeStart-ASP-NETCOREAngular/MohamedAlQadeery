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
const editCategoriesSelectInput = document.querySelector(
  "#editCategoriesSelectInput"
);
const addTodoButton = document.querySelector("#addTodoButton");
const updateTodoButton = document.querySelector("#updateTodoButton");
const editTodoModal = document.querySelector("#editTodoModal");

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
            data-bs-target="#editTodoModal" data-id="${el.id}" data-task="${
            el.task
          }" data-categoryName ="${el.categoryName}" data-description = "${
            el.description
          }" data-isCompleted = "${
            el.isCompleted
          }" class="btn btn-primary">Edit</a>
           
            <a  data-id="${
              el.id
            }" id="delete-todo" class="btn btn-danger delete">Delete</a>
          
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

editTodoModal.addEventListener("show.bs.modal", function (event) {
  const editButton = event.relatedTarget;
  let id = editButton.getAttribute("data-id");
  let task = editButton.getAttribute("data-task");
  let description = editButton.getAttribute("data-description");
  let isCompleted = editButton.getAttribute("data-isCompleted");
  let categoryName = editButton.getAttribute("data-categoryName");

  const todo_id = editTodoModal.querySelector("#todo_id");
  const editTodoTask = editTodoModal.querySelector("#editTodoTask");
  const editTodoDescription = editTodoModal.querySelector(
    "#editTodoDescription"
  );

  const todoStatus = editTodoModal.querySelector("#todoStatus");

  todo_id.setAttribute("value", id);
  editTodoTask.setAttribute("value", task);
  editTodoDescription.innerHTML = description;

  axios
    .get(BASEURL + "/api/category")
    .then((response) => {
      const result = response.data.map(
        (el) =>
          `<option value ="${el.id}" ${
            categoryName == el.name ? "selected" : ""
          }>${el.name}</option>`
      );

      editCategoriesSelectInput.innerHTML = result;
    })
    .catch((err) => toastr.error(err.message));
});

updateTodoButton.addEventListener("click", function (event) {
  event.preventDefault();

  let id = editTodoModal.querySelector("#todo_id").value;

  let editTodoTask = editTodoModal.querySelector("#editTodoTask").value;

  let editTodoDescription = editTodoModal.querySelector(
    "#editTodoDescription"
  ).value;

  let todoStatus = editTodoModal.querySelector("#todoStatus").value === "true";
  console.log(todoStatus);
  let editDueDate = document.querySelector("#editDueDate").value;

  let categoryId = parseInt(
    document.querySelector("#editCategoriesSelectInput").value
  );

  axios
    .put(BASEURL + "/api/todo/" + id, {
      categoryId: categoryId,
      task: editTodoTask,
      description: editTodoDescription,
      dueDate: editDueDate,
      isCompleted: todoStatus,
    })
    .then((response) => {
      toastr.success(
        `${response.data.task} todo has been updated succesfully !`
      );
      todosBtn.click();
    })
    .catch((err) => {
      console.log(err);
      toastr.error(err.message);
    })
    .finally(function () {
      document.querySelector("#closeEditTodoModalButton").click();
    });
});

document.addEventListener("click", function (e) {
  if (e.target && e.target.id == "delete-todo") {
    const deleteButton = e.target;
    let id = deleteButton.getAttribute("data-id");

    swal({
      title: "Are you sure?",
      text: `Once deleted, you will not be able to recover this Todo! `,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(BASEURL + "/api/todo/" + id)
          .then((response) => {
            swal("Poof! Your todo has been deleted!", {
              icon: "success",
            });
          })
          .catch((err) => {
            toastr.error(err.message);
            console.log(err);
          })
          .finally(function () {
            todosBtn.click();
          });
      } else {
        swal("todo is not deleted");
      }
    });
  }
});
