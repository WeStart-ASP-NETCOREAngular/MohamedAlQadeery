import axios from "axios";
import ICategory from "../Interfaces/ICategory";
import { BASEURL } from "../Shared/Config";

export default class CategoryService {
  constructor() {}

  GetAllCategories() {
    return axios.get<ICategory[]>(BASEURL + "/api/category");
  }

  AddCategory(category: ICategory) {
    return axios.post<ICategory>(BASEURL + "/api/category", category);
  }
}
