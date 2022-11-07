import ICategory from "./Interfaces/ICategory";
import CategoryService from "./Services/CategoryService";
import toastr from "toastr";
import {
  categoriesBtn,
  categoriesTableHead,
  createCategoryButton,
  DisplayCategoryModalButton,
} from "./Shared/CategoryHtmlElements";
import CategoryPage from "./Pages/CategoryPage";

const _categoryHtmlPage: CategoryPage = new CategoryPage();

// Start of events
window.addEventListener("load", function (e) {
  e.preventDefault();
  _categoryHtmlPage.OnPageLoad();
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

// End of events
