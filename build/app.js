"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _mainRoutes = _interopRequireDefault(require("./routes/main.routes.js"));
var _indexRoutes = _interopRequireDefault(require("./routes/index.routes.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var app = (0, _express["default"])();
app.use(_express["default"].json());
app.use('/api', _indexRoutes["default"]);
app.use('/api', _mainRoutes["default"]);
app.use(function (req, res, next) {
  res.status(404).json({
    message: 'endpoint not found'
  });
});
var _default = exports["default"] = app;