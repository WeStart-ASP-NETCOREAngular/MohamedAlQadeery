"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const Config_1 = require("../Shared/Config");
class TodoService {
    constructor() { }
    GetAllTodos() {
        return axios_1.default.get(Config_1.BASEURL + "/api/todo");
    }
    AddTodo(todo) {
        return axios_1.default.post(Config_1.BASEURL + "/api/todo", todo);
    }
    DeleteTodo(id) {
        return axios_1.default.delete(Config_1.BASEURL + "/api/todo/" + id);
    }
    UpdateTodo(id, todo) {
        return axios_1.default.put(Config_1.BASEURL + "/api/todo/" + id, todo);
    }
}
exports.default = TodoService;
