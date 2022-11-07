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

  DeleteCategory(id: number) {
    return axios.delete(BASEURL + "/api/category/" + id);
  }

  UpdateCategory(id: number, category: ICategory) {
    return axios.put(BASEURL + "/api/category/" + id, category);
  }
}
