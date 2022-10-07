import {data as products} from "./products.json";
import fs from "fs";
import {pick} from "../service/productService";

const PAGINATE_SIZE = 10

/**
 *
 * @param {number} limit limit number of products to return
 * @param {string} sortType type of sort of products
 * @return {Array : products}
 */
export function getAll({limit = PAGINATE_SIZE, sortType = 'desc'} = {}) {
    let result = products;
    if (sortType) {
        result = result.sort(sortHandle(sortType))
    }
    if (limit) {
        result = result.slice(0,limit);
    }
    return result;
}

/**
 *
 * @param {string} id id of product want to remove or delete
 * @return {Object : product}
 */
export function remove(id) {
    const newProduct = products.filter(product => product.id !== id);
    fs.writeFileSync('./src/database/products.json', JSON.stringify({
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
        return (a, b) => new Date(b.createAt) - new Date(a.createAt)
    }

    return (a, b) => new Date(a.createAt) - new Date(b.createAt)
}

// const sortHandle = (type) => {
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
export function getOne({id, fields} = {}) {
    const arrayFields = fields.split(',');
    const productFound = products.find(product => product.id === id);
    return pick(productFound, arrayFields);

}

/**
 * create a new product
 * @param {Object} product product be created or add
 */
export function add(product){
    const updateProduct = [product, ...products];
    fs.writeFileSync('./src/database/products.json', JSON.stringify({
        data: updateProduct
    }));
}

/**
 * update a product
 * @param {String} id id of product want to update
 * @param {Object} updatedProduct product be updated
 */
export function update({id, updateData : updatedProduct} = {}){
    const updateProducts = products.map(product =>{
        if(product.id === id){
            return updatedProduct;
        }
        return product;
    })
    fs.writeFileSync('./src/database/products.json', JSON.stringify({
        data: updateProducts
    }));
}
