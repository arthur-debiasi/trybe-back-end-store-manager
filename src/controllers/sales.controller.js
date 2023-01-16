const { salesService } = require('../services');
const { mapError } = require('../utils/errorMap');

const listSales = async (req, res) => {
  const { type, message } = await salesService.listSales();
  if (type) return res.status(mapError(type)).json({ message });
  console.log(message);
  return res.status(200).json(message);
};

const listSalesById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.listSalesById(Number(id));
  // console.log(type, message);
  if (type) return res.status(mapError(type)).json({ message });
  return res.status(200).json(message);
};

const registerSales = async (req, res) => {
  const { type, message } = await salesService.registerSales(req.body);
  if (type) return res.status(mapError(type)).json({ message });
  return res.status(201).json(message);
};

module.exports = {
  registerSales,
  listSales,
  listSalesById,
};