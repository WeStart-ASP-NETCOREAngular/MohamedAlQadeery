export const categoriesBtn = document.querySelector(
  "#categoriesBtn"
) as HTMLButtonElement;
export const createCategoryButton = document.querySelector(
  "#createCategoryButton"
) as HTMLButtonElement;
export const updateCategoryButton = document.querySelector(
  "#updateCategoryButton"
) as HTMLButtonElement;

export const DisplayCategoryModalButton = document.querySelector(
  "#DisplayCategoryModalButton"
) as HTMLButtonElement;
export const editCategoryModal = document.querySelector("#editCategoryModal");

export const categoriesTableHead = ` <tr>
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
