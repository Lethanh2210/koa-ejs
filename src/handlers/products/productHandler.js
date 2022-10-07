import {
    getAll as getAllProducts,
    add as createProduct,
    getOne as getOneProduct,
    remove as removeProduct,
    update
} from "../../database/productRepository.js";

/**
 *
 * @param ctx
 * @returns {Promise<void>}
 */
export async function getProducts(ctx) {
    try {
        const {sort: sortType, limit} = ctx.query;
        const products = getAllProducts({limit, sortType});
        ctx.body = {
            data: products
        };
        await ctx.render('productList', {products : products});
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

export async function getProduct(ctx) {
    try {
        const {id} = ctx.params;
        const {fields} = ctx.query;
        const product = getOneProduct({id, fields})
        if(product){
            return ctx.body = {
                data: product
            }
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
export async function addProduct(ctx) {
    try {
        const postData = ctx.request.body;
        createProduct(postData);
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
export async function deleteProduct(ctx) {
    try {
        const {id} = ctx.params;
        removeProduct(id);

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
export async function updateProduct(ctx) {
    try {
        const {id} = ctx.params;
        const updateData = ctx.request.body;
        update({id, updateData});
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

