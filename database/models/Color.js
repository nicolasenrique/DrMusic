module.exports = function(sequelize, dataTypes) {
    
    let alias = "Color"; 
    
    let cols = {  //cada columna es un objeto literal
        id_color: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: dataTypes.STRING
        }    
    }
    
    let config = {
        tableName: "color",
        timestamps: false
    }
    let Color = sequelize.define(alias, cols, config);

    return Color;

}
