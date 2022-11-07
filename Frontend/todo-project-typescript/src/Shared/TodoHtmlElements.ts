export const BASEURL = "https://localhost:7098";
export const todosBtn = document.querySelector(
  "#todosBtn"
) as HTMLButtonElement;
export const DisplayTodoModalButton = document.querySelector(
  "#DisplayTodoModalButton"
) as HTMLButtonElement;

export const addTodoButton = document.querySelector(
  "#addTodoButton"
) as HTMLButtonElement;
export const updateTodoButton = document.querySelector(
  "#updateTodoButton"
) as HTMLButtonElement;
export const editTodoModal = document.querySelector("#editTodoModal")!;

export const categoriesSelectInput = document.querySelector(
  "#CategoriesSelectInput"
) as HTMLInputElement;
export const todosTableHead = ` <tr>
<th scope="col">#</th>
<th scope="col">Name</th>
<th scope="col">Category</th>
<th scope="col">Status</th>
<th scope="col">Action</th>
</tr>`;

export const editCategoriesSelectInput = document.querySelector(
  "#editCategoriesSelectInput"
) as HTMLInputElement;
