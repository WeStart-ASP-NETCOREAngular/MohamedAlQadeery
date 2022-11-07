import {
  categoriesBtn,
  createCategoryButton,
  editCategoryModal,
  updateCategoryButton,
} from "./Shared/CategoryHtmlElements";
import CategoryPage from "./Pages/CategoryPage";
import Swal from "sweetalert2";
import TodoPage from "./Pages/TodoPage";
import {
  addTodoButton,
  DisplayTodoModalButton,
  editTodoModal,
  todosBtn,
  updateTodoButton,
} from "./Shared/TodoHtmlElements";

const _categoryHtmlPage: CategoryPage = new CategoryPage();
const _todoHtmlPage: TodoPage = new TodoPage();

// Start of events
window.addEventListener("load", function (e) {
  e.preventDefault();
  _categoryHtmlPage.OnPageLoad();
  _todoHtmlPage.OnPageLoad();
});

categoriesBtn.addEventListener("click", function (e) {
  e.preventDefault();
  _categoryHtmlPage.OnCategoriesClick();
});

createCategoryButton.addEventListener("click", function (e) {
  e.preventDefault();
  let categoryName = document.querySelector(
    "#categoryName"
  ) as HTMLInputElement;

  _categoryHtmlPage.OnClickCreateCategory({ name: categoryName.value });
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

  _categoryHtmlPage.OnUpdateCategory(+categoryId.value, {
    name: categoryNameInput.value,
  });
});

todosBtn.addEventListener("click", function (e) {
  e.preventDefault();
  _todoHtmlPage.OnTodosClick();
});

DisplayTodoModalButton.addEventListener("click", function (e) {
  e.preventDefault();
  _todoHtmlPage.OnCreateTodoModalDisplay();
});

addTodoButton.addEventListener("click", function (e) {
  e.preventDefault();
  let category_input = document.querySelector(
    "#CategoriesSelectInput"
  ) as HTMLInputElement;
  let category_Id = category_input.value;

  let todoTask = document.querySelector("#todoTask") as HTMLInputElement;
  let todoDescription = document.querySelector(
    "#todoDescription"
  ) as HTMLInputElement;

  let dueDate = document.querySelector("#dueDate") as HTMLInputElement;

  _todoHtmlPage.OnClickCreateTodo({
    categoryId: +category_Id,
    task: todoTask.value,
    description: todoDescription.value,
    dueDate: new Date(dueDate.value),
  });
});

editTodoModal?.addEventListener("show.bs.modal", function (event) {
  const editButton = event.relatedTarget!;
  let id = editButton.getAttribute("data-id")!;
  let task = editButton.getAttribute("data-task")!;
  let description = editButton.getAttribute("data-description")!;
  let isCompleted = editButton.getAttribute("data-isCompleted")!;
  let categoryName = editButton.getAttribute("data-categoryName")!;

  const todo_id = editTodoModal.querySelector("#todo_id") as HTMLInputElement;
  const editTodoTask = editTodoModal.querySelector(
    "#editTodoTask"
  ) as HTMLInputElement;
  const editTodoDescription = editTodoModal.querySelector(
    "#editTodoDescription"
  ) as HTMLInputElement;

  const todoStatus = editTodoModal.querySelector(
    "#todoStatus"
  ) as HTMLInputElement;

  todo_id.setAttribute("value", id);
  editTodoTask.setAttribute("value", task);
  editTodoDescription.innerHTML = description;

  _todoHtmlPage.OnUpdateTodoModalDisplay(categoryName);
});

updateTodoButton.addEventListener("click", function (e) {
  e.preventDefault();
  let id = editTodoModal.querySelector("#todo_id") as HTMLInputElement;

  let editTodoTask = editTodoModal.querySelector(
    "#editTodoTask"
  ) as HTMLInputElement;

  let editTodoDescription = editTodoModal.querySelector(
    "#editTodoDescription"
  ) as HTMLInputElement;

  let todoStatus_input = editTodoModal?.querySelector(
    "#todoStatus"
  ) as HTMLInputElement;

  let todoStatus: boolean = todoStatus_input.value === "true";
  let editDueDate = document.querySelector("#editDueDate") as HTMLInputElement;
  let categoryId = document.querySelector(
    "#editCategoriesSelectInput"
  ) as HTMLInputElement;

  _todoHtmlPage.OnUpdateTodo(+id.value, {
    task: editTodoTask.value,
    description: editTodoDescription.value,
    isCompleted: todoStatus,
    categoryId: parseInt(categoryId.value),
    dueDate: editDueDate.value,
  });
});

document.addEventListener("click", function (e) {
  if (e.target && (<HTMLElement>e.target).id == "delete-category") {
    const deleteButton = e.target as HTMLButtonElement;
    let id = deleteButton.getAttribute("data-id")!;

    Swal.fire({
      title: "Are you sure to delete this category?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((willDelete) => {
      if (willDelete.dismiss) {
        Swal.fire("Category is not deleted");
      } else if (willDelete) {
        _categoryHtmlPage.OnClickDeleteCategory(+id);
      }
    });
  } else if (e.target && (<HTMLElement>e.target).id == "delete-todo") {
    const deleteButton = e.target as HTMLButtonElement;
    let id = deleteButton.getAttribute("data-id")!;

    Swal.fire({
      title: "Are you sure to delete this Todo?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((willDelete) => {
      if (willDelete.dismiss) {
        Swal.fire("Todo is not deleted");
      } else if (willDelete) {
        _todoHtmlPage.OnClickDeleteTodo(+id);
      }
    });
  }
});
// End of events
