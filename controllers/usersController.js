const fs = require("fs");
const path = require("path");
const bcryptjs = require("bcryptjs");
const User = require("../models/Users");
const usersFilePath = path.join(__dirname, "../data/usuarios.json");
const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));

const controlUsers = {
  register: function (req, res) {
    res.render("register");
  },
  store: function (req, res) {
    const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
    let encryptedPass = bcryptjs.hashSync(req.body.password, 10);
    let userToCreate = {};
    let img = "default-img.png";
    if (req.file !== undefined) {
      img = req.file.filename;
    }

    userToCreate.userId = users[users.length - 1].userId + 1;
    userToCreate.firstName = req.body.name;
    userToCreate.lastName = req.body.lastName;
    userToCreate.imagen = img;
    userToCreate.email = req.body.email;
    userToCreate.password = encryptedPass;
    userToCreate.fechaCreacion = Date();
    userToCreate.fechaModificacion = null;
    users.push(userToCreate);
    console.log(userToCreate);
    let usersJSON = JSON.stringify(users, null, 2);
    fs.writeFileSync(path.join(__dirname, "../data/usuarios.json"), usersJSON);
    res.redirect("/users/login");
  },
  login: function (req, res) {
    res.render("login");
  },
  loginProcess: function (req, res) {
    let userToLogin = User.findByField("email", req.body.email);

    if (userToLogin) {
      //let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.password)
      let isOkThePassword;
      if (req.body.password == userToLogin.password) {
        isOkThePassword = true;
      }
      if (isOkThePassword) {
        delete userToLogin.password;
        req.session.userLogged = userToLogin; //si todo esta bien, antes de redirigir a profile, quiero guardar el usuario en session
        return res.redirect("/users/profile");
      }
    }
    return res.render("login", {
      errors: {
        email: {
          msg: "Las credenciales son inválidas",
        },
      },
    });
  },
  profile: function (req, res) {
    return res.render("userProfile", {
      user: req.session.userLogged,
    });
  },
  logout: function (req, res) {
    req.session.destroy(); // Este método borra cualquier cosa que esté en session
    return res.redirect("/");
  },
};

module.exports = controlUsers;
