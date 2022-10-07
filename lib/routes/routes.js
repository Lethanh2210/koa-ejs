"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _koaRouter = _interopRequireDefault(require("koa-router"));

var _fakeProductsData = require("../handlers/fakeProductsData");

var _product = _interopRequireDefault(require("./products/product.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = new _koaRouter.default({
  prefix: '/api'
});
router.get('/fakeData', _fakeProductsData.fakeData);
router.use(_product.default.routes());
var _default = router;
exports.default = _default;
//# sourceMappingURL=routes.js.map