module.exports = function(sequelize, dataTypes) {
    
    let alias = "User_status"; 
    
    let cols = {  //cada columna es un objeto literal
        id_user_status: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: dataTypes.STRING
        }    
    }
    
    let config = {
        tableName: "user_status",
        timestamps: false
    }
    let User_status = sequelize.define(alias, cols, config);

    return User_status;

}
