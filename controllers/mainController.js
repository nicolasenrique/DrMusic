const fs = require('fs');

let productosJson = fs.readFileSync("./public/js/productos.json", 'utf-8') ;
let productos = JSON.parse(productosJson);

const controlMain = {
    mostrar: function(req,res){
        res.render('home',{productos});
    },
    novedades: function(){},
    masVendidos: function(){},
};

module.exports = controlMain;