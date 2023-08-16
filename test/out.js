(function(modules) {function require(id) {const [fn, mapping] = modules[id];function localRequire(name) {return require(mapping[name]);}const module = { exports : {} };fn(localRequire, module, module.exports); return module.exports;}require(0);})({0: [function (require, module, exports) { "use strict";

var _log = require("./log");
(0, _log.log)('1', '2', '3ihduewfl'); },{"./log":1},],1: [function (require, module, exports) { "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.log = log;
function log() {
  for (var _len = arguments.length, text = Array(_len), _key = 0; _key < _len; _key++) {
    text[_key] = arguments[_key];
  }
  console.log(text.join(' '));
} },{},],})