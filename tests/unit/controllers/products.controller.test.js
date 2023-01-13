const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

const { expect } = chai;
chai.use(sinonChai);
const { productsController } = require("../../../src/controllers");
const { productsService } = require("../../../src/services");
const { products } = require("./mocks/products.controller.mock");

describe("Teste de unidade do passengerController", function () {
   afterEach(function () {
     sinon.restore();
   });
  
  describe("Listando os produtos", function () {
    it("Deve retornar o status 200 e a lista de produtos", async function () {

      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, "listProducts")
        .resolves({ type: null, message: products });

      await productsController.listProducts(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(products);
    });
  });

    describe("Buscando um produto por id", function () {
      it("deve responder com status 200 e os dados do produto quando existir", async function () {

        const res = {};
        const req = {
          params: { id: 1 },
        };

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon
          .stub(productsService, "listProductsById")
          .resolves({ type: null, message: products[0] });

        await productsController.listProductsById(req, res);

        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith(products[0]);
      });

      it("ao passar um id que não existe no banco deve retornar um erro", async function () {

        const res = {};
        const req = {
          params: { id: 9999 },
        };

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon
          .stub(productsService, "listProductsById")
          .resolves({
            type: "PRODUCT_NOT_FOUND",
            message: "Product not found",
          });

        await productsController.listProductsById(req, res);

        expect(res.status).to.have.been.calledWith(404);

        expect(res.json).to.have.been.calledWith({ message: "Product not found" });
      });
    });
});
