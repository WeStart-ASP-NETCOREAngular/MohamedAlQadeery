import axios from "axios";
import ITodo from "../Interfaces/ITodo";
import { BASEURL } from "../Shared/Config";

export default class TodoService {
  constructor() {}

  GetAllTodos() {
    return axios.get<ITodo[]>(BASEURL + "/api/todo");
  }

  AddTodo(todo: ITodo) {
    return axios.post<ITodo>(BASEURL + "/api/todo", todo);
  }

  DeleteTodo(id: number) {
    return axios.delete(BASEURL + "/api/todo/" + id);
  }

  UpdateTodo(id: number, todo: ITodo) {
    return axios.put(BASEURL + "/api/todo/" + id, todo);
  }
}
