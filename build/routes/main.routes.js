"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _mainController = require("../controller/main.controller.js");
var router = (0, _express.Router)();
router.get('/main', _mainController.index);
router.get('/main/:id', _mainController.show);
router.post('/main', _mainController.store);
router.patch('/main/:id', _mainController.update);
router["delete"]('/main/:id', _mainController.destroy);
var _default = exports["default"] = router;