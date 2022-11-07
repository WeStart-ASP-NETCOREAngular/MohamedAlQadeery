"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sweetalert2_1 = __importDefault(require("sweetalert2"));
const TodoService_1 = __importDefault(require("../Services/TodoService"));
const TodoHtmlElements_1 = require("../Shared/TodoHtmlElements");
const tableHead = document.querySelector("#tableHead");
const tableBody = document.querySelector("#tableBody");
class TodoPage {
    constructor() {
        this.todos = [];
        this._todosService = new TodoService_1.default();
    }
    OnPageLoad() {
        this._todosService
            .GetAllTodos()
            .then((response) => {
            this.todos = response.data;
        })
            .catch((err) => toastr.error(err.message));
    }
    OnTodosClick() {
        UpdateTable();
        SetPageHeader();
        this.MapToTable();
    }
    OnClickCreateTodo(todo) {
        this._todosService
            .AddTodo(todo)
            .then((response) => {
            this.todos.push(response.data);
            toastr.success(`Task is added successfully!`);
            this.MapToTable();
            TodoHtmlElements_1.todosBtn.click();
        })
            .catch((err) => {
            toastr.error(err.message);
        })
            .finally(function () {
            TodoHtmlElements_1.DisplayTodoModalButton.click(); // closes the modal when clicking on the button again
        });
    }
    OnClickDeleteTodo(id) {
        this._todosService
            .DeleteTodo(id)
            .then((response) => {
            sweetalert2_1.default.fire("Success", `Todo has been deleted`, "success");
            this.todos = this.todos.filter((c) => c.id != id);
        })
            .catch((err) => {
            toastr.error(err.message);
            console.log(err);
        })
            .finally(function () {
            TodoHtmlElements_1.todosBtn.click();
        });
    }
    //   OnUpdateCategory(id: number, category: ICategory) {
    //     this._categoryService
    //       .UpdateCategory(id, category)
    //       .then((response) => {
    //         toastr.success(
    //           `${response.data.name} category has been updated succesfully !`
    //         );
    //         this.todos.find((c) => c.id == id)!.name = response.data.name;
    //         categoriesBtn.click();
    //       })
    //       .catch((err) => {
    //         toastr.error(err.message);
    //       })
    //       .finally(function () {
    //         let closeButton = document.querySelector(
    //           "#closeUpdateCategoryModalButton"
    //         ) as HTMLButtonElement;
    //         closeButton.click();
    //       });
    //   }
    MapToTable() {
        tableBody.innerHTML = "";
        const resultData = this.todos
            .map((el, index) => {
            return ` <tr>
          <th scope="col">${++index}</th>
          <th scope="col">${el.task}</th>
          <th scope="col">${el.categoryName}</th>
          <th scope="col">${el.isCompleted == true ? "Completed" : "Pending"}</th>
          <th scope="col">
            <a data-bs-toggle="modal"
            data-bs-target="#editTodoModal" data-id="${el.id}" data-task="${el.task}" data-categoryName ="${el.categoryName}" data-description = "${el.description}" data-isCompleted = "${el.isCompleted}" class="btn btn-primary">Edit</a>
           
            <a  data-id="${el.id}" id="delete-todo" class="btn btn-danger delete">Delete</a>
          
          </th>
        </tr>`;
        })
            .join(" ");
        tableBody.innerHTML = resultData;
    }
}
exports.default = TodoPage;
function UpdateTable() {
    tableHead.innerHTML = TodoHtmlElements_1.todosTableHead;
    tableBody.innerHTML = "";
}
function SetPageHeader() {
    let page_header = document.querySelector("#page-header");
    page_header.innerHTML = "Todos Page";
}
