const { productsService } = require('../services/index');
const { mapError } = require('../utils/errorMap');

const listProducts = async (_req, res) => {
  const { type, message } = await productsService.listProducts();

  if (type) return res.status(500).json(message);

  res.status(200).json(message);
};

const listProductsById = async (req, res) => {
  const { id } = req.params;
   const { type, message } = await productsService.listProductsById(id);

  if (type) return res.status(mapError(type)).json({ message });

   res.status(200).json(message);
};

module.exports = {
  listProducts,
  listProductsById,
};
