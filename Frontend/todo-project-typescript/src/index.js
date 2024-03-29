"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CategoryHtmlElements_1 = require("./Shared/CategoryHtmlElements");
const CategoryPage_1 = __importDefault(require("./Pages/CategoryPage"));
const sweetalert2_1 = __importDefault(require("sweetalert2"));
const TodoPage_1 = __importDefault(require("./Pages/TodoPage"));
const TodoHtmlElements_1 = require("./Shared/TodoHtmlElements");
const _categoryHtmlPage = new CategoryPage_1.default();
const _todoHtmlPage = new TodoPage_1.default();
// Start of events
window.addEventListener("load", function (e) {
    e.preventDefault();
    _categoryHtmlPage.OnPageLoad();
    _todoHtmlPage.OnPageLoad();
});
CategoryHtmlElements_1.categoriesBtn.addEventListener("click", function (e) {
    e.preventDefault();
    _categoryHtmlPage.OnCategoriesClick();
});
CategoryHtmlElements_1.createCategoryButton.addEventListener("click", function (e) {
    e.preventDefault();
    let categoryName = document.querySelector("#categoryName");
    _categoryHtmlPage.OnClickCreateCategory({ name: categoryName.value });
});
CategoryHtmlElements_1.editCategoryModal === null || CategoryHtmlElements_1.editCategoryModal === void 0 ? void 0 : CategoryHtmlElements_1.editCategoryModal.addEventListener("show.bs.modal", function (event) {
    // Button that triggered the modal
    const editButton = event.relatedTarget;
    var categoryName = editButton.getAttribute("data-name");
    let id = editButton.getAttribute("data-id");
    const modalCategoryName = CategoryHtmlElements_1.editCategoryModal.querySelector(".categoryUpdateName");
    const modalcategoryId = CategoryHtmlElements_1.editCategoryModal.querySelector(".categoryId");
    modalCategoryName === null || modalCategoryName === void 0 ? void 0 : modalCategoryName.setAttribute("value", `${categoryName}`);
    modalcategoryId === null || modalcategoryId === void 0 ? void 0 : modalcategoryId.setAttribute("value", `${id}`);
});
CategoryHtmlElements_1.updateCategoryButton === null || CategoryHtmlElements_1.updateCategoryButton === void 0 ? void 0 : CategoryHtmlElements_1.updateCategoryButton.addEventListener("click", function (event) {
    event.preventDefault();
    let categoryNameInput = CategoryHtmlElements_1.editCategoryModal === null || CategoryHtmlElements_1.editCategoryModal === void 0 ? void 0 : CategoryHtmlElements_1.editCategoryModal.querySelector(".categoryUpdateName");
    let categoryId = CategoryHtmlElements_1.editCategoryModal === null || CategoryHtmlElements_1.editCategoryModal === void 0 ? void 0 : CategoryHtmlElements_1.editCategoryModal.querySelector(".categoryId");
    _categoryHtmlPage.OnUpdateCategory(+categoryId.value, {
        name: categoryNameInput.value,
    });
});
TodoHtmlElements_1.todosBtn.addEventListener("click", function (e) {
    e.preventDefault();
    _todoHtmlPage.OnTodosClick();
});
TodoHtmlElements_1.DisplayTodoModalButton.addEventListener("click", function (e) {
    e.preventDefault();
    _todoHtmlPage.OnCreateTodoModalDisplay();
});
TodoHtmlElements_1.addTodoButton.addEventListener("click", function (e) {
    e.preventDefault();
    let category_input = document.querySelector("#CategoriesSelectInput");
    let category_Id = category_input.value;
    let todoTask = document.querySelector("#todoTask");
    let todoDescription = document.querySelector("#todoDescription");
    let dueDate = document.querySelector("#dueDate");
    _todoHtmlPage.OnClickCreateTodo({
        categoryId: +category_Id,
        task: todoTask.value,
        description: todoDescription.value,
        dueDate: new Date(dueDate.value),
    });
});
TodoHtmlElements_1.editTodoModal === null || TodoHtmlElements_1.editTodoModal === void 0 ? void 0 : TodoHtmlElements_1.editTodoModal.addEventListener("show.bs.modal", function (event) {
    const editButton = event.relatedTarget;
    let id = editButton.getAttribute("data-id");
    let task = editButton.getAttribute("data-task");
    let description = editButton.getAttribute("data-description");
    let isCompleted = editButton.getAttribute("data-isCompleted");
    let categoryName = editButton.getAttribute("data-categoryName");
    const todo_id = TodoHtmlElements_1.editTodoModal.querySelector("#todo_id");
    const editTodoTask = TodoHtmlElements_1.editTodoModal.querySelector("#editTodoTask");
    const editTodoDescription = TodoHtmlElements_1.editTodoModal.querySelector("#editTodoDescription");
    const todoStatus = TodoHtmlElements_1.editTodoModal.querySelector("#todoStatus");
    todo_id.setAttribute("value", id);
    editTodoTask.setAttribute("value", task);
    editTodoDescription.innerHTML = description;
    _todoHtmlPage.OnUpdateTodoModalDisplay(categoryName);
});
TodoHtmlElements_1.updateTodoButton.addEventListener("click", function (e) {
    e.preventDefault();
    let id = TodoHtmlElements_1.editTodoModal.querySelector("#todo_id");
    let editTodoTask = TodoHtmlElements_1.editTodoModal.querySelector("#editTodoTask");
    let editTodoDescription = TodoHtmlElements_1.editTodoModal.querySelector("#editTodoDescription");
    let todoStatus_input = TodoHtmlElements_1.editTodoModal === null || TodoHtmlElements_1.editTodoModal === void 0 ? void 0 : TodoHtmlElements_1.editTodoModal.querySelector("#todoStatus");
    let todoStatus = todoStatus_input.value === "true";
    let editDueDate = document.querySelector("#editDueDate");
    let categoryId = document.querySelector("#editCategoriesSelectInput");
    _todoHtmlPage.OnUpdateTodo(+id.value, {
        task: editTodoTask.value,
        description: editTodoDescription.value,
        isCompleted: todoStatus,
        categoryId: parseInt(categoryId.value),
        dueDate: editDueDate.value,
    });
});
document.addEventListener("click", function (e) {
    if (e.target && e.target.id == "delete-category") {
        const deleteButton = e.target;
        let id = deleteButton.getAttribute("data-id");
        sweetalert2_1.default.fire({
            title: "Are you sure to delete this category?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((willDelete) => {
            if (willDelete.dismiss) {
                sweetalert2_1.default.fire("Category is not deleted");
            }
            else if (willDelete) {
                _categoryHtmlPage.OnClickDeleteCategory(+id);
            }
        });
    }
    else if (e.target && e.target.id == "delete-todo") {
        const deleteButton = e.target;
        let id = deleteButton.getAttribute("data-id");
        sweetalert2_1.default.fire({
            title: "Are you sure to delete this Todo?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((willDelete) => {
            if (willDelete.dismiss) {
                sweetalert2_1.default.fire("Todo is not deleted");
            }
            else if (willDelete) {
                _todoHtmlPage.OnClickDeleteTodo(+id);
            }
        });
    }
});
// End of events
