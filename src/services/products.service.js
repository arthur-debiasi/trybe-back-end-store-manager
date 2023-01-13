const schema = require('./validations/validationsInputValues');
const { productsModel } = require('../models');

const listProducts = async () => {
  const products = await productsModel.listProducts();
  return { type: null, message: products };
};

const listProductsById = async (productId) => {
  const product = await productsModel.listProductsById(productId);
  if (!product) {
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  }

  return { type: null, message: product };
};

const registerProduct = async (name) => {
    const error = schema.validateRegisterProduct(name);
  if (error.type) return error;
  
  const newProductId = await productsModel.registerProduct(name);
  const newProduct = await productsModel.listProductsById(newProductId);

  return { type: null, message: newProduct };
};

module.exports = {
  listProducts,
  listProductsById,
  registerProduct,
};
