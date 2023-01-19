const { rightSaleBody } = require('../../__tests__/_dataMock');
const { salesModel, productsModel } = require('../models');
const {
  validateRegisterSale, validateSalesById,
} = require('./validations/validationsInputValues');

const deleteSales = async (id) => {
  const sales = await salesModel.listSales();
  const salesIdsList = sales.map(({ saleId }) => saleId);
  console.log(sales);
  if (!salesIdsList.includes(id)) {
    console.log('0ie');
    return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
  }
  await salesModel.deleteSales(id);
  return {};
};

const listSales = async () => {
  const sales = await salesModel.listSales();
  return { type: null, message: sales };
};
const listSalesById = async (id) => {
  const sales = await salesModel.listSales();
  validateSalesById(sales, id);
  return { type: null, message: await salesModel.listSalesById(id) };
};

const registerSales = async (sales) => {
  const error = validateRegisterSale(sales);
  if (error.type) return error;
  // const products = await productsModel.listProducts();
  // const productsIds = products.map(({ id }) => +id);
  // if (sales.some(({ productId }) => !productsIds.includes(productId))) {
  //   return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  // }
  const saleId = await salesModel.registerSales(sales);
  const newSale = {
    id: saleId,
    itemsSold: sales,
  };

  return { type: null, message: newSale };
};
registerSales(rightSaleBody).then((e) => console.log(e));
const updateSales = async (saleIdToUpdate, sales) => {
  const error = validateRegisterSale(sales);
  if (error.type) return error;
   const products = await productsModel.listProducts();
  const productsIds = products.map(({ id }) => +id);
  if (sales.some(({ productId }) => !productsIds.includes(productId))) {
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  }
  const salesList = await salesModel.listSales();
  const salesIdsList = salesList.map(({ saleId }) => saleId);
  if (!salesIdsList.includes(saleIdToUpdate)) {
    return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
  }
  await salesModel.updateSales(saleIdToUpdate, sales);
   const newSale = {
     id: saleIdToUpdate,
     itemsSold: sales,
   };

   return { type: null, message: newSale };
};

// updateSales(1, rightSaleBody).then((e) => console.log(e));

module.exports = {
  deleteSales,
  listSales,
  listSalesById,
  registerSales,
  updateSales,
};
