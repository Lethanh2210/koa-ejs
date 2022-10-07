"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fakeData = fakeData;

var _fakeData = require("../database/fakeData.js");

function fakeData(ctx) {
  try {
    (0, _fakeData.createDatabase)();
    ctx.body = {
      success: "Create fake data successfully"
    };
  } catch (e) {
    ctx.status = 404;
    ctx.body = {
      success: false,
      data: [],
      error: e.message
    };
  }
}
//# sourceMappingURL=fakeProductsData.js.map