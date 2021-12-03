module.exports = function(sequelize, dataTypes) {
    
    let alias = "ProdImage"; 
    
    let cols = {  //cada columna es un objeto literal
        id_prod_image: {
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
        tableName: "prod_image",
        timestamps: false
    }
    let ProdImage = sequelize.define(alias, cols, config);

    ProdImage.associate = function(models) {
        ProdImage.belongsTo(models.Product, {
            as: "prod_image",
            foreignKey: "id_product"
        })
    }

    return ProdImage;

}
