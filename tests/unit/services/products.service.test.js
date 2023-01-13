const { expect } = require('chai');
const sinon = require('sinon');

const { productsModel } = require('../../../src/models');
const { productsService } = require('../../../src/services');
const { products } = require('./mocks/products.service.mock');

describe("Verificando service de produtos", function () {
  describe("listagem de produtos", function () {
    it("retorna a lista completa de produtos", async function () {

      sinon.stub(productsModel, "listProducts").resolves(products);

      const result = await productsService.listProducts();

      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(products);
    });
  });

  describe("busca de produto por id", function () {

    it("retorna um erro caso o produto não exista", async function () {

      sinon.stub(productsModel, "listProductsById").resolves(undefined);

      const result = await productsService.listProductsById(12);

      expect(result.type).to.equal("PRODUCT_NOT_FOUND");
      expect(result.message).to.equal("Product not found");
    });

    it("retorna o produto caso o ID seja existente", async function () {

      sinon.stub(productsModel, "listProductsById").resolves(products[0]);

      const result = await productsService.listProductsById(1);

      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(products[0]);
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});