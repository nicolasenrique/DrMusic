module.exports = function(sequelize, dataTypes) {
    
    let alias = "Prod_images"; 
    
    let cols = {  //cada columna es un objeto literal
        id_prod_images: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: dataTypes.STRING
        },
        main: {
            type: dataTypes.BOOLEAN                     
        },
        order: {
            type: dataTypes.INTEGER
        }    
    }
    
    let config = {
        tableName: "prod_images",
        timestamps: false
    }
    let Prod_images = sequelize.define(alias, cols, config);

    Prod_images.associate = function(models) {
        Prod_images.belongsTo(models.Products, {
            as: "prod_images",
            foreignKey: "id_products"
        })
    }

    return Prod_images;

}
