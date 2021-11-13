//es una representación del archivo que tenemos en el json

// 1-Guardar al usuario en la DB
// 2-Buscar un usuario que se quiere loguear por su email
// 3-Buscar a un usuario por su id
// 4-Editar la información de un usuario
// 5-Elimina a un usuario de la DB
//CRUD!!!!

const fs = require('fs');

const User = {
    
    fileName: './data/usuarios.json',

    getData: function(){
        return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
    },
    generateId: function(){
        let allUsers = this.findAll();
        let lastUser = allUsers.pop();
        if (lastUser) {
            return lastUser.id + 1;
        }
        return 1;
    }, 
    findAll: function(){  //Es redundante pero hace mucho mas sentido por su nombre
        return this.getData();
    },
    findByPk: function(id){
        let allUsers = this.findAll();
        let userFound = allUsers.find(oneUser => oneUser.id === id);
        return userFound; 

    }, 
    findByField: function(field, text){
        let allUsers = this.findAll();
        let userFound = allUsers.find(oneUser => oneUser[field] === text);
        return userFound; 

    }, 
    findByFieldMin: function(field, text){
        let allUsers = this.findAll();
        let userFound = allUsers.find(oneUser => oneUser[field] === text);
        // datos irrelevantes, internos del sistema
        delete userFound.telCelular;
        delete userFound.telAlternativo;
        delete userFound.fechaCreacion;
        delete userFound.fechaModificacion;
        delete userFound.fechaUltimoLogin;
        delete userFound.telAlternativo;
        // Datos sensibles 
        delete userFound.userId;
        delete userFound.lastName;        
        return userFound;

    }, 
    create: function(userData){
        let allUsers = this.findAll();
        let newUser = {
            id: this.generateId(),
            ...userData // operador de propación
        }
        allUsers.push(newUser);
        fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null, ' '));
        return newUser;

        
    },
    delete: function(id){
        let allUsers = this.findAll();
        let finalUsers = allUsers.filter(oneUser => oneUser.id !== id);
        fs.writeFileSync(this.fileName, JSON.stringify(finalUsers, null, ' '));
        return true;

    }
}

module.exports = User;