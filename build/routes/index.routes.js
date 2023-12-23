"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _indexController = require("../controller/index.controller.js");
var router = (0, _express.Router)();
router.get('/ping', _indexController.ping);
var _default = exports["default"] = router;