function authMiddleware (req, res, next) {
    if (!req.session.userLogged) {
        return res.redirect('/users/login');
    }
    next();
}

module.exports = authMiddleware;

//funciona en la ruta /user/profile (en nuestro caso lo podemos aplicar en todas las rutas que deseemos). Lo que hace este midd, verifica que si el usuario NO está logueado, te redirecciona al Login.