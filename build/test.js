"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
let t = new index_1.default();
t.send({
    body: 'hello world',
    from: 'fastBeep',
    to: '+2347086967055'
});
