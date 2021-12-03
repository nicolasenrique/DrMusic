module.exports = (sequelize, dataTypes) => {

    let alias = "Product"; // es un apodo de como le voy a decir a sequelize que se llama la tabla.
    
    let cols = {
        id_products: {
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
        tableName: "products",
        timestamps: false
    }

    let Product = sequelize.define(alias, cols, config);

    //Después del define, puedo escribir las asociaciones

    Product.associate = function(models) {
        Product.belongsTo(models.Color, {
            as: "color",
            foreignKey: "id_color"
        });
        Product.belongsTo(models.Prod_Category, {
            as: "prod_category",
            foreignKey: "id_category"
        });

    }

    return Product;

}
