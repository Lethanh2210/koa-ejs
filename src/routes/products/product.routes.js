import Router from 'koa-router';
import * as productHandler from "../../handlers/products/productHandler.js"
import productInputMiddleware from "../../middleware/productInputMiddleware";


const router = new Router();

router.get('/products', productHandler.getProducts);
router.get('/products/:id', productHandler.getProduct);
router.post('/products',productInputMiddleware, productHandler.addProduct);
router.put('/products/:id',productInputMiddleware, productHandler.updateProduct);
router.delete('/products/:id', productHandler.deleteProduct);


export default router;