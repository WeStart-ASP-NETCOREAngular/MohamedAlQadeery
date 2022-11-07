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
import Swal from "sweetalert2";

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
  }
});
// End of events
