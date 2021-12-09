module.exports = (sequelize, dataTypes) => {

    let alias = "Product"; // es un apodo de como le voy a decir a sequelize que se llama la tabla.
    
    let cols = {
        id_product: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        description: {
            type: dataTypes.INTEGER
        },
        brand: {
            type: dataTypes.INTEGER            
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
    };

    let config = {
        tableName: "product",
        timestamps: false
    }

    let Product = sequelize.define(alias, cols, config);

    //Después del define, puedo escribir las asociaciones

    Product.associate = function(models) {
        Product.belongsTo(models.Color, {
            as: "color",
            foreignKey: "id_colors"
        });
        Product.belongsTo(models.ProdCategory, {
            as: "prod_category",
            foreignKey: "id_prod_category"
        });

    }

    return Product;

}
