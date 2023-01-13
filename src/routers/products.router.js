const express = require('express');
const { productsController } = require('../controllers');

const router = express.Router();

router.get('/', productsController.listProducts);

router.get('/:id', productsController.listProductsById);

router.post('/', productsController.registerProduct);

module.exports = router;