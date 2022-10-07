"use strict";

var _koa = _interopRequireDefault(require("koa"));

var _koaBody = _interopRequireDefault(require("koa-body"));

var _routes = _interopRequireDefault(require("./routes/routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = new _koa.default();

const render = require('@koa/ejs');

const path = require('path');

app.use((0, _koaBody.default)());
app.use(_routes.default.routes());
render(app, {
  root: path.join(__dirname, 'view'),
  layout: false,
  viewExt: 'ejs',
  cache: false,
  debug: true
});
app.listen(5000, () => {
  console.log("server is running");
});
//# sourceMappingURL=app.js.map