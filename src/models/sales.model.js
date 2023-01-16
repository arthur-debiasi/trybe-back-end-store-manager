const connection = require('./connection');

const registerSales = async (sales) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUE (NOW())',
  );
  const saleProducts = sales
    .map(({ productId, quantity }) => `(${insertId}, ${productId}, ${quantity})`)
    .join(', ');

  await connection.execute(
    `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES ${
      saleProducts
    }`,
  );
  return insertId;
};

module.exports = {
  registerSales,
};
