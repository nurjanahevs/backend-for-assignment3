const Product = require("../models/product");

class productController {

  static postProduct(req, res, next) {
    const { name, price, description, quantity, image } = req.body
    const product = new Product({
      name,
      price,
      image,
      description,
      quantity,
    });
    product
      .save()
      .then((result) => {
        res.status(201).json({ success: true, result });
      })
      .catch((e) => {
        next({ name: "VALID" });
      });
  }
  static async getProduct(req, res, next) {
    const { productId } = req.params;
    try {
      const product = await Product.findById(productId)
      res.status(200).json({ success: true, product });
    } catch (e) {
      next({ name: "PRODUCTNOTFOUND" });
    }
  }
  static async listProduct(req, res, next) {
    try {
      const product = await Product.find();
      res.status(200).json({ success: true, product });
    } catch (e) {
      next({ name: "PRODUCTNOTFOUND" });
    }
  }
  static async updateProduct(req, res, next) {
    const { productId } = req.params;
    const { name, price, description, quantity } = req.body;
    try {
      const newProduct = { name, price, description, quantity };
      for (let key in newProduct) if (!newProduct[key]) delete newProduct[key];
      const product = await Product.findByIdAndUpdate(productId, newProduct, { new: true });
      res.status(200).json({ result: true, product });
    } catch (e) {
      next({ name: "PRODUCTNOTFOUND" });
    }
  }
  static async deleteProduct(req, res, next) {
    const { productId } = req.params;
    try {
      await Product.findByIdAndDelete(productId);
      res.status(200).json({ success: true, message: "delete success" });
    } catch (e) {
      next({ name: "PRODUCTNOTFOUND" });
    }
  }
}

module.exports = productController;
