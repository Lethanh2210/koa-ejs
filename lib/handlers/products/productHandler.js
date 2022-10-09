"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addProduct = addProduct;
exports.deleteProduct = deleteProduct;
exports.getProduct = getProduct;
exports.getProducts = getProducts;
exports.updateProduct = updateProduct;

var _productRepository = require("../../database/productRepository.js");

/**
 *
 * @param ctx
 * @returns {Promise<void>}
 */
async function getProducts(ctx) {
  try {
    const {
      sort: sortType,
      limit
    } = ctx.query;
    const products = (0, _productRepository.getAll)({
      limit,
      sortType
    });
    ctx.body = {
      data: products
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
/**
 *
 * @param ctx
 * @returns {Promise<{data: Object} | {success: boolean, error: *}|{message: string, status: string}>}
 */


async function getProduct(ctx) {
  try {
    const {
      id
    } = ctx.params;
    const {
      fields
    } = ctx.query;
    const product = (0, _productRepository.getOne)({
      id,
      fields
    });

    if (product) {
      return ctx.body = {
        data: product
      };
    }

    ctx.status = 404;
    return ctx.body = {
      status: 'error!',
      message: 'Product Not Found with that id!'
    };
  } catch (e) {
    return ctx.body = {
      success: false,
      error: e.message
    };
  }
}
/**
 *
 * @param ctx
 * @returns {Promise<{success: boolean || String, error: *}|{success: boolean}>}
 */


async function addProduct(ctx) {
  try {
    const postData = ctx.request.body;
    (0, _productRepository.add)(postData);
    ctx.status = 200;
    return ctx.body = {
      success: "Create product successfully"
    };
  } catch (e) {
    ctx.status = 404;
    return ctx.body = {
      success: false,
      error: e.message
    };
  }
}
/**
 *
 * @param ctx
 * @returns {Promise<{success: boolean || String, error: *}|{success: boolean}>}
 */


async function deleteProduct(ctx) {
  try {
    const {
      id
    } = ctx.params;
    (0, _productRepository.remove)(id);
    ctx.status = 200;
    return ctx.body = {
      success: "Delete Product successfully"
    };
  } catch (e) {
    return ctx.body = {
      success: false,
      error: e.message
    };
  }
}
/**
 *
 * @param ctx
 * @returns {Promise<{success: boolean || String, error: *}|{success: boolean}>}
 */


async function updateProduct(ctx) {
  try {
    const {
      id
    } = ctx.params;
    const updateData = ctx.request.body;
    (0, _productRepository.update)({
      id,
      updateData
    });
    ctx.status = 200;
    return ctx.body = {
      success: "Update Product successfully"
    };
  } catch (e) {
    return ctx.body = {
      success: false,
      error: e.message
    };
  }
}
//# sourceMappingURL=productHandler.js.map