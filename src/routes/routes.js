import Router from 'koa-router';
import {fakeData} from "../handlers/fakeProductsData";
import productRouter from "./products/product.routes"

const router = new Router({
    prefix: '/api'
});

router.get('/fakeData', fakeData);
router.use(productRouter.routes());

export default router;