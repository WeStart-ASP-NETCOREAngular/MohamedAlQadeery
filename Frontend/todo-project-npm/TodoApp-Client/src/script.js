import axios from "axios";

import toastr from "toastr";
import bootstrap from "bootstrap";

import swal from "sweetalert";

//Buttons click listeners

// Axios
console.log("Axios scripts goes here");

const BASEURL = "https://localhost:7098";

const categoriesBtn = document.querySelector("#categoriesBtn");
const todosBtn = document.querySelector("#todosBtn");
const createCategoryButton = document.querySelector("#createCategoryButton");
const updateCategoryButton = document.querySelector("#updateCategoryButton");

const DisplayCategoryModalButton = document.querySelector(
  "#DisplayCategoryModalButton"
);
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

let todosTableHead = ` <tr>
<th scope="col">#</th>
<th scope="col">Name</th>
<th scope="col">Category</th>
<th scope="col">Status</th>
<th scope="col">Action</th>

</tr>`;

categoriesBtn.addEventListener("click", function (event) {
  event.preventDefault();
  tableHead.innerHTML = categoriesTableHead;
  tableBody.innerHTML = "";
  axios
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
      console.log(error);
    });
});

createCategoryButton.addEventListener("click", function (event) {
  event.preventDefault();
  let categoryName = document.querySelector("#categoryName").value;
  axios
    .post(BASEURL + "/api/Category", { name: categoryName })
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
});

editCategoryModal.addEventListener("show.bs.modal", function (event) {
  // Button that triggered the modal
  const editButton = event.relatedTarget;
  let categoryName = editButton.getAttribute("data-name");

  let id = editButton.getAttribute("data-id");

  const modalCategoryName = editCategoryModal.querySelector(
    ".categoryUpdateName"
  );
  const modalcategoryId = editCategoryModal.querySelector(".categoryId");

  modalCategoryName.setAttribute("value", categoryName);
  modalcategoryId.setAttribute("value", id);
});

updateCategoryButton.addEventListener("click", function (event) {
  console.log(event.relatedTarget);
  event.preventDefault();
  let categoryName = editCategoryModal.querySelector(
    ".categoryUpdateName"
  ).value;
  let categoryId = editCategoryModal.querySelector(".categoryId").value;

  axios
    .put(BASEURL + "/api/category/" + categoryId, { name: categoryName })
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
      document.querySelector("#closeUpdateCategoryModalButton").click();
    });
});

todosBtn.addEventListener("click", function (event) {
  event.preventDefault();
  tableHead.innerHTML = todosTableHead;
  tableBody.innerHTML = "";
});

document.addEventListener("click", function (e) {
  if (e.target && e.target.id == "delete-category") {
    const deleteButton = e.target;
    let id = deleteButton.getAttribute("data-id");

    swal({
      title: "Are you sure?",
      text: `Once deleted, you will not be able to recover this Data! `,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(BASEURL + "/api/category/" + id)
          .then((response) => {
            swal("Poof! Your category has been deleted!", {
              icon: "success",
            });
          })
          .catch((err) => {
            toastr.error(err.message);
            console.log(err);
          })
          .finally(function () {
            categoriesBtn.click();
          });
      } else {
        swal("Category is not deleted");
      }
    });
  }
});
