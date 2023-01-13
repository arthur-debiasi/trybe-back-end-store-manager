// const schema = require('./validations/validationsInputValues');
const { productsModel } = require('../models');

const listProducts = async () => {
  const products = await productsModel.listProducts();
  return { type: null, message: products };
};

const listProductsById = async (productId) => {
  // const error = schema.validateId(productId);
  // if (error.type) return error;

  const product = await productsModel.listProductsById(productId);
  if (!product) {
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  }

  return { type: null, message: product };
};

module.exports = {
  listProducts,
  listProductsById,
};
