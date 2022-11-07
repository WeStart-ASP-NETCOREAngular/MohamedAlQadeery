"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CategoryHtmlElements_1 = require("./Shared/CategoryHtmlElements");
const CategoryPage_1 = __importDefault(require("./Pages/CategoryPage"));
const sweetalert2_1 = __importDefault(require("sweetalert2"));
const _categoryHtmlPage = new CategoryPage_1.default();
// Start of events
window.addEventListener("load", function (e) {
    e.preventDefault();
    _categoryHtmlPage.OnPageLoad();
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
// End of events
