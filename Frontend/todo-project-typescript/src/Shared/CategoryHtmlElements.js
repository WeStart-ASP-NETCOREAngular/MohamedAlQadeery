"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoriesTableHead = exports.editCategoryModal = exports.DisplayCategoryModalButton = exports.updateCategoryButton = exports.createCategoryButton = exports.categoriesBtn = void 0;
exports.categoriesBtn = document.querySelector("#categoriesBtn");
exports.createCategoryButton = document.querySelector("#createCategoryButton");
exports.updateCategoryButton = document.querySelector("#updateCategoryButton");
exports.DisplayCategoryModalButton = document.querySelector("#DisplayCategoryModalButton");
exports.editCategoryModal = document.querySelector("#editCategoryModal");
exports.categoriesTableHead = ` <tr>
<th scope="col">#</th>
<th scope="col">Name</th>
<th scope="col">Todos Count</th>
<th scope="col">Action</th>
</tr>`;
// // Start of functions
// function MapCategoriesToTable() {
//   tableBody.innerHTML = "";
//   const resultData = categories
//     .map((el: ICategory, index: number) => {
//       return ` <tr>
//       <th scope="col">${++index}</th>
//       <th scope="col">${el.name}</th>
//       <th scope="col">${el.todosCount}</th>
//       <th scope="col">
//         <a data-bs-toggle="modal"
//         data-bs-target="#editCategoryModal" data-id="${el.id}" data-name="${
//         el.name
//       }" class="btn btn-primary">Edit</a>
//         <a  data-id="${
//           el.id
//         }" id="delete-category" class="btn btn-danger delete">Delete</a>
//       </th>
//     </tr>`;
//     })
//     .join(" ");
//   tableBody.innerHTML = resultData;
// }
// End of functions
