module.exports = function(sequelize, dataTypes) {
    
    let alias = "User_category"; 
    
    let cols = {  //cada columna es un objeto literal
        id_user_category: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: dataTypes.STRING
        }    
    }
    
    let config = {
        tableName: "user_category",
        timestamps: false
    }
    let User_category = sequelize.define(alias, cols, config);

    return User_category;

}
