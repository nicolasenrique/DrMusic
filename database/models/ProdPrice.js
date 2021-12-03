module.exports = function(sequelize, dataTypes) {
    
    let alias = "ProdPrice"; 
    
    let cols = {  //cada columna es un objeto literal
        id_prod_price: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        price: {
            type: dataTypes.DOUBLE
        },
        creation_date: {
            type: dataTypes.DATE                     
        },
        modif_date: {
            type: dataTypes.DATE                     
        },
        active: {
            type: dataTypes.BOOLEAN
        }    
    }
    
    let config = {
        tableName: "prod_price",
        timestamps: false
    }
    let ProdPrice = sequelize.define(alias, cols, config);

    ProdPrice.associate = function(models) {
        ProdPrice.belongsTo(models.Product, {
            as: "prod_price",
            foreignKey: "id_product"
        })
    }

    return ProdPrice;

}
