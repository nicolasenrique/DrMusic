const fs = require("fs");
const path = require("path");
// acceso a BD
let   db = require('../database/models');
const Op = db.Sequelize.Op;

const productsFilePath = path.join(__dirname, "../data/productos.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");



function grabaRegistros (products) {
    let prdoctsJSON = JSON.stringify(products, null, 2);
    fs.writeFileSync(productsFilePath, prdoctsJSON);
}

// Show all products
const controlProducts = {  
  list: function (req, res) {
    const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
    res.render("productList", { products });
  },
  // Shows one product
detail: function (req, res) {
    const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
    let product;
    for (prod of products) {
        if (prod.prodId == req.params.id){                
            product = prod;
            break;
        }
    };
    res.render("productDescription", { selectedProduct : product });   
},

detail_db: function (req, res) {
//     db.Product.findByPk(req.params.id, {
//         include: [{association: "color" },{association: "prod_category"}]
//     })
//         .then(function(product){
//             res.render('productDescription', { selectedProduct : product  } );
//         });   

db.Product.findAll({
    include: [
        // {association: "color" }, 
        // {association: "prod_size" }, 
        // {association: "prod_category" }, 
        // {association: "prod_image" }, 
        {association: "prod_price" }
    ]
})
    .then((products) => { 
        // console.log(products); 
        for(i=0; i < products.length; i++){
            console.log('Id Producto: ' + products[i].id_product);
            console.log('Producto: ' + products[i].description);
            for(j=0; j < products[i].prod_price.length; j++) { 
                console.log('Precio Producto: ' + products[i].prod_price[j].price);
            }

        }
        res.send(products);

    });
},
create: function(req,res){
    res.render('product_create');
},
store: function(req,res){
    const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
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
    res.redirect('/products/list');
},
    //
    edit: (req, res) => {
        const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
        let product;
        for (prod of products) {
            if (prod.prodId == req.params.id){                
                product = prod;
                break;
            }
        }
        res.render('product_edit', {product : product});
    },
    //
    update: (req, res) => {		
        //
        const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
        let prodToUpadate = {};
        for (i=0; i < products.length; i++) {
            //
            if (products[i].prodId == req.body.prodId){

                prodToUpadate.prodId 			= req.body.prodId;
                prodToUpadate.nombre 		 	= req.body.nombre;
                prodToUpadate.descripcion 	    = req.body.descripcion;
                prodToUpadate.precio 			= req.body.precio;
                if (req.file) {
                    prodToUpadate.imagen =	req.file.filename;
                } else {
                    prodToUpadate.imagen = products[i].imagen;
                };            
                prodToUpadate.categoria		    = req.body.categoria;
                prodToUpadate.medidas		    = req.body.medidas;
                prodToUpadate.alto		        = req.body.alto;
                prodToUpadate.ancho		        = req.body.ancho;
                prodToUpadate.profundidad		= req.body.profundidad;
                prodToUpadate.color		        = req.body.color;
                prodToUpadate.fechaCreacion     = products[i].fechaCreacion;
                prodToUpadate.fechaModificacion	= new Date();
                products[i] = prodToUpadate;
                break;
            }
        };
        grabaRegistros(products);
        res.render('productDescription', {selectedProduct : prodToUpadate}); 
    },
    delete: (req, res) => {	
        //
        const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
        let id = req.params.id;
        let productsNew = products.filter(removeID);
        function removeID(prod) {
			return prod.prodId != id;
		};
        grabaRegistros(productsNew);
        // res.send('estamos en el detele!!');
        res.redirect('/products/list');
    
    },
    formDelete: (req, res) => {	
        //
        const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
        let product;
        for (prod of products) {
            if (prod.prodId == req.params.id){                
                product = prod;
                break;
            }
        };
        res.render("product_delete", { product : product }); 
    }
}

module.exports = controlProducts;
