//Objetivo: recuperar los datos de la cookie, en caso de existir, en variables locales

function recordarmeMiddleware (req, res, next) {
    if (req.cookies){
        if (req.cookies.recordarme != undefined && req.session.userLogged == undefined){
            // revisar la persistencia en la cookie, que datos sensibles tenemos. 
            // para un evolutivo ver de guardar los datos minimos y buscar info cada vez que sea necesario
            req.session.userLogged = req.cookies.recordarme;
        //
        }
    }
    next();

}

module.exports = recordarmeMiddleware;
