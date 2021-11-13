function authAdminMiddleware (req, res, next) {
    // console.log('req.session.userLogged.rol: ' +req.session.userLogged.rol);
    if (!req.session.userLogged) {
        return res.redirect('/users/login');
    } else if (req.session.userLogged.rol != 'admin')  {
        return res.redirect('/');
    }
    next();
}



module.exports = authAdminMiddleware;

//funciona en la ruta /user/profile (en nuestro caso lo podemos aplicar en todas las rutas que deseemos). Lo que hace este midd, verifica que si el usuario NO está logueado, te redirecciona al Login.