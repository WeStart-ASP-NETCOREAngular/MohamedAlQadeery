import axios from "axios";

import toastr from "toastr";
import bootstrap from "bootstrap";
//Buttons click listeners

// Axios
console.log("Axios scripts goes here");

const BASEURL = "https://localhost:7098";

const categoriesBtn = document.querySelector("#categoriesBtn");
const todosBtn = document.querySelector("#todosBtn");
const createCategoryButton = document.querySelector("#createCategoryButton");
const DisplayCategoryModalButton = document.querySelector(
  "#DisplayCategoryModalButton"
);

const tableHead = document.querySelector("#tableHead");
const tableBody = document.querySelector("#tableBody");

//categories table
let categoriesTableHead = ` <tr>
<th scope="col">#</th>
<th scope="col">Name</th>
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
      const resultData = response.data
        .map((el, index) => {
          return ` <tr>
            <th scope="col">${++index}</th>
            <th scope="col">${el.name}</th>
            <th scope="col">
              <a href="#" class="btn btn-primary">Edit</a>
              <a href="#" class="btn btn-primary">Delete</a>

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

todosBtn.addEventListener("click", function (event) {
  event.preventDefault();
  tableHead.innerHTML = todosTableHead;
  tableBody.innerHTML = "";
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
