function authUserMiddleware (req, res, next) {
    if (!req.session.userLogged) {
        return res.redirect('/users/login');
    } else if (req.session.userLogged.rol != 'user')  {
        return res.redirect('/');
    }
    next();

}

module.exports = authUserMiddleware;

//funciona en la ruta /user/profile (en nuestro caso lo podemos aplicar en todas las rutas que deseemos). Lo que hace este midd, verifica que si el usuario NO está logueado, te redirecciona al Login.