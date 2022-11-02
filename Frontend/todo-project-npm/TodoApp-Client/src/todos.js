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
