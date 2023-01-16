const { salesModel, productsModel } = require('../models');
const { validateRegisterSale } = require('./validations/validationsInputValues');

const registerSales = async (sales) => {
  const error = validateRegisterSale(sales);
  if (error.type) return error;
  const products = await productsModel.listProducts();
  const productsIds = products.map(({ id }) => +id);
  if (sales.some(({ productId }) => !productsIds.includes(productId))) {
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  }
  const saleId = await salesModel.registerSales(sales);
  const newSale = {
    id: saleId,
    itemsSold: sales,
  };

  return { type: null, message: newSale };
};

module.exports = {
  registerSales,
};
