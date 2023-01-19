const { salesModel, productsModel } = require('../models');
const {
  validateRegisterSale,
  validateSalesById,
  validateUpdateSales,
} = require('./validations/validationsInputValues');

const deleteSales = async (id) => {
  const salesList = await salesModel.listSales();
  const error = validateSalesById(salesList, id);
  if (error.type) return error;
  await salesModel.deleteSales(id);
  return {};
};

const listSales = async () => {
  const salesList = await salesModel.listSales();
  return { type: null, message: salesList };
};
const listSalesById = async (id) => {
  const salesList = await salesModel.listSales();
  const error = validateSalesById(salesList, id);
  if (error.type) return error;
  return { type: null, message: await salesModel.listSalesById(id) };
};

const registerSales = async (sales) => {
  const productsList = await productsModel.listProducts();
  const error = validateRegisterSale(sales, productsList);
  if (error.type) return error;
  const saleId = await salesModel.registerSales(sales);
  const newSale = {
    id: saleId,
    itemsSold: sales,
  };
  return { type: null, message: newSale };
};
const updateSales = async (saleIdToUpdate, sales) => {
  const productsList = await productsModel.listProducts();
  const salesList = await salesModel.listSales();
  const error = validateUpdateSales(
    sales,
    productsList,
    salesList,
    saleIdToUpdate,
  );
  if (error.type) return error;
  await salesModel.updateSales(saleIdToUpdate, sales);
  const newSale = {
    saleId: saleIdToUpdate,
    itemsUpdated: sales,
  };
  return { type: null, message: newSale };
};

module.exports = {
  deleteSales,
  listSales,
  listSalesById,
  registerSales,
  updateSales,
};
