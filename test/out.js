(function(modules) {function require(id) {const [fn, mapping] = modules[id];function localRequire(name) {return require(mapping[name]);}const module = { exports : {} };fn(localRequire, module, module.exports); return module.exports;}require(0);})({0: [function (require, module, exports) { "use strict";

var _log = require("./log");
(0, _log.greet)(); },{"./log":1},],1: [function (require, module, exports) { "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.greet = greet;
function greet() {
  console.log("Hello PLS!");
  console.log('greet');
} },{},],})