module.exports = function(sequelize, dataTypes) {
    
    let alias = "ProdSize"; 
    
    let cols = {  //cada columna es un objeto literal
        id_prod_size: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        type: {
            type: dataTypes.BOOLEAN
        },
        height: {
            type: dataTypes.DOUBLE                     
        },
        width: {
            type: dataTypes.DOUBLE                     
        },
        depth: {
            type: dataTypes.DOUBLE
        }    
    }
    
    let config = {
        tableName: "prod_size",
        timestamps: false
    }
    let ProdSize = sequelize.define(alias, cols, config);


    // ProdSize.associate = function(models) {
    //     ProdSize.belongsTo(models.Product, {
    //         as: "prod_size",
    //         foreignKey: "id_product"
    //     });

    // }
    return ProdSize;

}
