"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fetchDeclaretion_1 = require("./events/fetchDeclaretion");
function registerEvents(socket) {
    socket.on('fetchDeclaretion', fetchDeclaretion_1.fetchDeclaretion);
}
exports.default = registerEvents;
