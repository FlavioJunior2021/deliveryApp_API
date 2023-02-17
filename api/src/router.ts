/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable indent */
/* eslint-disable semi */
import path from 'node:path';
import { Router } from 'express';
import multer from'multer';
import { createCategory } from './app/useCases/caterories/createCategory';
import { listCategories } from './app/useCases/caterories/listCaterogires';
import { createProduct } from './app/useCases/products/createProduct';
import { listProducts } from './app/useCases/products/listProducts';
import { listProductsByCategory } from './app/useCases/caterories/listProductsByCategory';
import { listOrders } from './app/useCases/orders/listOrders';
import { createOrder } from './app/useCases/orders/createOrder';
import { changeOrderStatus } from './app/useCases/orders/changeOrderStatus';
import { cancelOrder } from './app/useCases/orders/cancelOrder';

export const router = Router();
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb){
      cb(null, path.resolve(__dirname, '..', 'uploads'));
    },
    filename(req, file, cb){
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  })
});


// List categories
router.get('/categories', listCategories);
// Create caterory
router.post('/categories', createCategory);

// List products
router.get('/products', listProducts);

// Create products
router.post('/products',upload.single('image'),createProduct);

// Get products by category
router.get('/categories/:categoryId/products', listProductsByCategory);
// List orders
router.get('/orders', listOrders);

// Create orders
router.post('/orders', createOrder);

// Change order status
router.patch('/orders/:orderId', changeOrderStatus);

// Delete order
router.delete('/orders/:orderId', cancelOrder);
