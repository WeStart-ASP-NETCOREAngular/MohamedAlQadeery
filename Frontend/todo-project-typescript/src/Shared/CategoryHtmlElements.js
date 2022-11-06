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
