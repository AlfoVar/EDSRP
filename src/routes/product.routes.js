import {Router} from 'express';
import { getProducts, getProductById, addProduct, updateProductById, deleteProduct } from "../controller/products.controller.js";
import { authValidationToken } from "../middlewares/validateToken.js";

const router = Router();

router.get('/products', authValidationToken, getProducts);

router.get('/products/:id',authValidationToken, getProductById)

router.post('/products',authValidationToken, addProduct)

router.put('/products/:id',authValidationToken, updateProductById)

router.delete('/products:id',authValidationToken, deleteProduct);

export default router;