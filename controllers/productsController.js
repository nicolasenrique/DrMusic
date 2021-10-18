const controlProducts = {
    list: function(req,res){
        res.render('productList');        
    },
    detail: function(req,res){
        res.render('productDescription');        
    },
    admin: function(req,res){
        res.render('product_admin');
    } 
}

module.exports = controlProducts;