module.exports = function(sequelize, dataTypes) {
    
    let alias = "Prod_price"; 
    
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
    let Prod_price = sequelize.define(alias, cols, config);

    Prod_price.associate = function(models) {
        Prod_price.belongsTo(models.Products, {
            as: "prod_price",
            foreignKey: "id_products"
        })
    }

    return Prod_price;

}
