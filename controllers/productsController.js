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
     admin: function(req,res){
        res.render('product_admin');
    },
    store: function(req,res){
        let prodToCreate = {};
        let img = 'default-img.png';
        if (req.file != undefined){
          img = req.file.filename
        }; 
        prodToCreate.prodId = products[products.length-1].prodId + 1;
        prodToCreate.nombre = req.body.name;
        prodToCreate.descripcion = req.body.descripcion;
        prodToCreate.precio = req.body.precio;
        prodToCreate.imagen = img;
        prodToCreate.categoria = req.body.categoria;
        prodToCreate.medidas = req.body.medidas;
        prodToCreate.alto = req.body.alto;
        prodToCreate.ancho = req.body.ancho;
        prodToCreate.profundidad = req.body.profundidad;
        prodToCreate.color = req.body.color;
        prodToCreate.fechaCreacion = Date();
        prodToCreate.fechaModificacion = null;           
        products.push(prodToCreate);
        //console.log(prodToCreate);
        let productsJSON = JSON.stringify(products, null, 2);
        fs.writeFileSync(path.join(__dirname, '../data/productos.json'),productsJSON); 
        res.redirect('/products/admin');
      } 
}

module.exports = controlProducts;
