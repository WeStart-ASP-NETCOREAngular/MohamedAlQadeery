import axios from "axios";
import ICategory from "../Interfaces/ICategory";
import { BASEURL } from "../Shared/Config";

export default class CategoryService {
  constructor() {}
  public categories: ICategory[] = [];

  GetAllCategories() {
    return axios.get<ICategory[]>(BASEURL + "/api/category");
  }
}
