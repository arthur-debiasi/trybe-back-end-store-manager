const camelize = require('camelize');
const connection = require('./connection');

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

const updateProduct = async (name, productId) => {
  const [{ affectedRows }] = await connection.execute(
    `UPDATE StoreManager.products 
    SET 
    products.name = ?
    WHERE
    products.id = ?;`,
    [name, productId],
  );
  return affectedRows;
  };
  
updateProduct('manteiga', 2).then((e) => console.log(e));

module.exports = {
  listProducts,
  listProductsById,
  registerProduct,
  updateProduct,
};
