const fs = require("fs");
const path = require("path");

const productsFilePath = path.join(__dirname, "../data/productos.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controlMain = {
  mostrar: function (req, res) {
    res.render("home", { products });
  },
  novedades: function () {},
  masVendidos: function () {},
};

module.exports = controlMain;
