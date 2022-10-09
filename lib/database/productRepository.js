"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.add = add;
exports.getAll = getAll;
exports.getOne = getOne;
exports.remove = remove;
exports.update = update;

var _products = require("./products.json");

var _fs = _interopRequireDefault(require("fs"));

var _productService = require("../service/productService");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const PAGINATE_SIZE = 10;
/**
 *
 * @param {number} limit limit number of products to return
 * @param {string} sortType type of sort of products
 * @return {Array : products}
 */

function getAll({
  limit = PAGINATE_SIZE,
  sortType = 'desc'
} = {}) {
  let result = _products.data;

  if (sortType) {
    result = result.sort(sortHandle(sortType));
  }

  if (limit) {
    result = result.slice(0, limit);
  }

  return result;
}
/**
 *
 * @param {string} id id of product want to remove or delete
 * @return {Object : product}
 */


function remove(id) {
  const newProduct = _products.data.filter(product => product.id !== id);

  _fs.default.writeFileSync('./src/database/products.json', JSON.stringify({
    data: newProduct
  }));
}
/**
 * Currying
 * First class data type
 *
 * @param {String} typeSort type of sort
 * @return {any} Array sort by type
 */


function sortHandle(typeSort) {
  if (typeSort === "desc") {
    return (a, b) => new Date(b.createAt) - new Date(a.createAt);
  }

  return (a, b) => new Date(a.createAt) - new Date(b.createAt);
} // const sortHandle = (type) => {
//     if (typeSort === "desc") {
//         return (a, b) => new Date(b.createAt) - new Date(a.createAt)
//     }
//
//     return (a, b) => new Date(a.createAt) - new Date(b.createAt)
// }

/**
 *
 * @param {string} id id of product want to find
 * @param {string} fields fields need to render
 * @return {Object }
 */


function getOne({
  id,
  fields
} = {}) {
  const productFound = _products.data.find(product => product.id === id);

  if (fields) {
    const arrayFields = fields.split(',');
    return (0, _productService.pick)(productFound, arrayFields);
  }

  return productFound;
}
/**
 * create a new product
 * @param {Object} product product be created or add
 */


function add(product) {
  const updateProduct = [product, ..._products.data];

  _fs.default.writeFileSync('./src/database/products.json', JSON.stringify({
    data: updateProduct
  }));
}
/**
 * update a product
 * @param {String} id id of product want to update
 * @param {Object} updatedProduct product be updated
 */


function update({
  id,
  updateData: updatedProduct
} = {}) {
  const updateProducts = _products.data.map(product => {
    if (product.id === id) {
      return updatedProduct;
    }

    return product;
  });

  _fs.default.writeFileSync('./src/database/products.json', JSON.stringify({
    data: updateProducts
  }));
}
//# sourceMappingURL=productRepository.js.map