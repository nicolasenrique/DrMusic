module.exports = function(sequelize, dataTypes) {
    
    let alias = "Colors"; 
    
    let cols = {  //cada columna es un objeto literal
        id_prod_price: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: dataTypes.STRING
        }    
    }
    
    let config = {
        tableName: "colors",
        timestamps: false
    }
    let Colors = sequelize.define(alias, cols, config);

    return Colors;

}
