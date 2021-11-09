const bcryptjs = require('bcryptjs');
const User = require('../models/Users')

const controlUsers = {

    register: function(req,res){
        res.render("register");
    },
    login: function(req,res){
        res.render('login');        
    },
    loginProcess: function(req, res){
        let userToLogin = User.findByField('email', req.body.email);
        
        if (userToLogin) {
            //let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.password)
            let isOkThePassword;
            if (req.body.password == userToLogin.password){
                isOkThePassword = true;
            }
            if (isOkThePassword) {
                delete userToLogin.password;
                req.session.userLogged = userToLogin //si todo esta bien, antes de redirigir a profile, quiero guardar el usuario en session
                return res.redirect('/users/profile');
            }
        }
        return res.render('login', {
            errors: {
                email: {
                    msg: 'Las credenciales son inválidas'
                }
            }
        })

    },
    profile: function(req, res){
        return res.render('userProfile',{
            user: req.session.userLogged
        });
    },    
    logout: function(req, res){
        req.session.destroy(); // Este método borra cualquier cosa que esté en session
        return res.redirect('/');
    }
};

module.exports = controlUsers;