module.exports = function(sequelize, dataTypes) {
    
    let alias = "UserStatus"; 
    
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
    let UserStatus = sequelize.define(alias, cols, config);

    return UserStatus;

}
