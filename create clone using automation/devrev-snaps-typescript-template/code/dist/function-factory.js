"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.functionFactory = void 0;
const on_work_creation_1 = __importDefault(require("./functions/on_work_creation"));
exports.functionFactory = {
    // Add your functions here
    on_work_creation: on_work_creation_1.default,
};
