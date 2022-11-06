"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const Config_1 = require("../Shared/Config");
class CategoryService {
    constructor() {
        this.categories = [];
    }
    GetAllCategories() {
        return axios_1.default.get(Config_1.BASEURL + "/api/category");
    }
}
exports.default = CategoryService;
