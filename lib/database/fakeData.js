"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createDatabase = createDatabase;
exports.createRandomProduct = createRandomProduct;

var _faker = require("@faker-js/faker");

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createRandomProduct() {
  return {
    id: _faker.faker.datatype.uuid(),
    name: _faker.faker.commerce.productName(),
    price: _faker.faker.commerce.price(10000, 100000),
    description: _faker.faker.commerce.productDescription(),
    product: _faker.faker.commerce.productMaterial(),
    color: _faker.faker.commerce.color(),
    createAt: _faker.faker.date.past(),
    image: _faker.faker.image.imageUrl()
  };
}

function createDatabase() {
  const products = [] = Array.from({
    length: 100
  }).map(() => {
    return createRandomProduct();
  });

  _fs.default.writeFileSync('./src/database/products.json', JSON.stringify({
    data: products
  }));
}
//# sourceMappingURL=fakeData.js.map