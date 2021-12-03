module.exports = function(sequelize, dataTypes) {
    
    let alias = "Prod_category"; 
    
    let cols = {  //cada columna es un objeto literal
        id_prod_category: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        description: {
            type: dataTypes.STRING
        }  
    }
    
    let config = {
        tableName: "prod_category",
        timestamps: false
    }
    let Prod_category = sequelize.define(alias, cols, config);

    return Prod_category;

}
