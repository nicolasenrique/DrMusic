function guestMiddleware (req, res, next) {
    if (req.session.userLogged) {
        return res.redirect('/')
    }
    next();
}

module.exports = guestMiddleware;

//Este es un midd de ruta que se usa en /user/register y user/login. Lo que hace esté midd, verifica si tenemos un usuario logueado o no. En caso de que ya estés logueado, no te permite acceder ni a Login ni a Register, en esos casos te redirecciona a profile.