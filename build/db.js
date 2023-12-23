"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pool = void 0;
var _promise = require("mysql2/promise");
var _config = require("./config.js");
var pool = exports.pool = (0, _promise.createPool)({
  host: _config.env.DB_HOST,
  user: _config.env.DB_USER,
  password: _config.env.DB_PASSWORD,
  port: _config.env.DB_PORT,
  database: _config.env.DB_DATABASE
});