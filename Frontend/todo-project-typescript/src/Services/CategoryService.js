"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const Config_1 = require("../Shared/Config");
class CategoryService {
    constructor() { }
    GetAllCategories() {
        return axios_1.default.get(Config_1.BASEURL + "/api/category");
    }
    AddCategory(category) {
        return axios_1.default.post(Config_1.BASEURL + "/api/category", category);
    }
    DeleteCategory(id) {
        return axios_1.default.delete(Config_1.BASEURL + "/api/category/" + id);
    }
    UpdateCategory(id, category) {
        return axios_1.default.put(Config_1.BASEURL + "/api/category/" + id, category);
    }
}
exports.default = CategoryService;
