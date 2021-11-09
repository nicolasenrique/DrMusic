function userLoggedMiddleware (req, res, next){
    //quiero mostrar una parte de la barra de navegacion dependiendo si esta alguien en sesion;
    res.locals.isLogged = false;

    if (req.session && req.session.userLogged) {
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged; //estoy pasando lo que tengo en sesion a una variable local
    //puedo agregar del mismo modo el avatar chiquito al header min 01:35:00 del video
    }
    next();
}

module.exports = userLoggedMiddleware;