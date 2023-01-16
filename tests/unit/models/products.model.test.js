const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');
const { products, newProduct } = require('./mocks/products.model.mock');

describe('Testes de unidade do model de produtos', function () {
  it('Recuperando a lista de produtos', async function () {

    sinon.stub(connection, 'execute').resolves([products]);

    const result = await productsModel.listProducts();

    expect(result).to.be.deep.equal(products);
  });

  it('Recuperando uma produto a partir do seu id', async function () {

    sinon.stub(connection, 'execute').resolves([[products[0]]]);

    const result = await productsModel.listProductsById(1);

    expect(result).to.be.deep.equal(products[0]);
  });

  it('Cadastrando um novo produto de name "Manteiga"', async function () {
    sinon.stub(connection, 'execute').resolves([{insertId: 4}]);

        const result = await productsModel.registerProduct(newProduct);

        expect(result).to.be.deep.equal(4);
  })

  afterEach(function () {
    sinon.restore();
  });
});