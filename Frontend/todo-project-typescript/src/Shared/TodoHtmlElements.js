"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.todosTableHead = exports.categoriesSelectInput = exports.editTodoModal = exports.updateTodoButton = exports.addTodoButton = exports.DisplayTodoModalButton = exports.todosBtn = exports.BASEURL = void 0;
exports.BASEURL = "https://localhost:7098";
exports.todosBtn = document.querySelector("#todosBtn");
exports.DisplayTodoModalButton = document.querySelector("#DisplayTodoModalButton");
exports.addTodoButton = document.querySelector("#addTodoButton");
exports.updateTodoButton = document.querySelector("#updateTodoButton");
exports.editTodoModal = document.querySelector("#editTodoModal");
exports.categoriesSelectInput = document.querySelector("#CategoriesSelectInput");
exports.todosTableHead = ` <tr>
<th scope="col">#</th>
<th scope="col">Name</th>
<th scope="col">Category</th>
<th scope="col">Status</th>
<th scope="col">Action</th>
</tr>`;
