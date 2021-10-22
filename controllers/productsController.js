const fs = require("fs");
const path = require("path");

const productsFilePath = path.join(__dirname, "../data/productos.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

// Show all products
const controlProducts = {
  list: function (req, res) {
    res.render("productList", { products });
  },
  // Shows one product
  detail: function (req, res) {
    let idProducto = req.params.id - 1;
    let selectedProduct = products[idProducto];
    res.render("productDescription", { selectedProduct });
  },
  admin: function (req, res) {
    res.render("product_admin");
  },
};

module.exports = controlProducts;
