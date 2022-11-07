import Swal from "sweetalert2";
import ITodo from "../Interfaces/ITodo";
import CategoryService from "../Services/CategoryService";
import TodoService from "../Services/TodoService";
import toastr from "toastr";
import {
  categoriesSelectInput,
  DisplayTodoModalButton,
  todosBtn,
  todosTableHead,
} from "../Shared/TodoHtmlElements";

const tableHead = document.querySelector("#tableHead") as HTMLElement;
const tableBody = document.querySelector("#tableBody") as HTMLElement;
export default class TodoPage {
  public todos: ITodo[] = [];
  private _todosService: TodoService = new TodoService();
  private _categoriesService: CategoryService = new CategoryService();
  constructor() {}

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

  OnClickCreateTodo(todo: ITodo) {
    this._todosService
      .AddTodo(todo)
      .then((response) => {
        this.todos.push(response.data);
        toastr.success(`Task is added successfully!`);
        this.MapToTable();
        todosBtn.click();
      })
      .catch((err) => {
        toastr.error(err.message);
      })
      .finally(function () {
        DisplayTodoModalButton.click(); // closes the modal when clicking on the button again
      });
  }

  OnClickDeleteTodo(id: number) {
    this._todosService
      .DeleteTodo(id)
      .then((response) => {
        Swal.fire("Success", `Todo has been deleted`, "success");
        this.todos = this.todos.filter((c) => c.id != id);
      })
      .catch((err) => {
        toastr.error(err.message);
        console.log(err);
      })
      .finally(function () {
        todosBtn.click();
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
      .map((el: ITodo, index: number) => {
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
  }

  OnCreateTodoModalDisplay() {
    this._categoriesService
      .GetAllCategories()
      .then((response) => {
        const result = response.data.map(
          (el) => `<option value ="${el.id}">${el.name}</option>`
        );

        categoriesSelectInput.innerHTML = "" + result;
      })
      .catch((err) => toastr.error(err.message));
  }
}

function UpdateTable() {
  tableHead.innerHTML = todosTableHead;
  tableBody.innerHTML = "";
}

function SetPageHeader() {
  let page_header = document.querySelector("#page-header") as HTMLElement;
  page_header.innerHTML = "Todos Page";
}
