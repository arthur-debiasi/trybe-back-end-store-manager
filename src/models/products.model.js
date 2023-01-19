const camelize = require('camelize');
const connection = require('./connection');

const deleteProductById = async (productId) => {
  const { affectedRows } = await connection
  .execute('DELETE FROM StoreManager.products WHERE id = ?;', [productId]);
  return { affectedRows };
};
const listProducts = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  return camelize(result);
};

const listProductsById = async (productId) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [productId],
  );
  return camelize(product);
};

const registerProduct = async (name) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUE (?)',
    [name],
  );

  return insertId;
};

const searchProduct = async (searchTerm) => {
  const [result] = await connection.execute(
    `SELECT * FROM StoreManager.products
WHERE name LIKE ? ;`, [`%${searchTerm}%`],
  );
  return camelize(result);
};

const updateProduct = async (name, productId) => {
  const [result] = await connection.execute(
    `UPDATE StoreManager.products 
    SET 
    products.name = ?
    WHERE
    products.id = ?;`,
    [name, productId],
  );
  return result;
};

module.exports = {
  deleteProductById,
  listProducts,
  listProductsById,
  registerProduct,
  searchProduct,
  updateProduct,
};
