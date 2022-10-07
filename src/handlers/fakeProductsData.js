import {
    createDatabase as createProducts
} from "../database/fakeData.js";


export function fakeData(ctx){
    try {
        createProducts();
        ctx.body = {
            success: "Create fake data successfully",
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