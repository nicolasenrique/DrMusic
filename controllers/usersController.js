const fs = require("fs");
const path = require("path");
const bcryptjs = require("bcryptjs");
const User = require("../models/Users");
const usersFilePath = path.join(__dirname, "../data/usuarios.json");
const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));

// acceso a BD
let db = require("../database/models");
const Op = db.Sequelize.Op;

const controlUsers = {
  register: function (req, res) {

      let promUser = db.User.findAll();
      let promUserCat = db.UserCategory.findAll();
      let promUserSta = db.UserStatus.findAll();

      Promise.all([promUser, promUserCat, promUserSta])
        .then(([allUsers, allUserCats, allUserSta]) => {
          // return res.render(path.resolve(__dirname, "..", "views", "register"), {
          //   allUsers,
          //   allUserCats,
          //   allUserStas,
          // });
          res.send(allUserCats);
        })
        .catch((error) => res.send(error));

    // res.render("register");
    // res.render("register");
    // res.send('holaaaa');
  },
  store: function (req, res) {
    // const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
    let encryptedPass = bcryptjs.hashSync(req.body.password, 10);
    // let userToCreate = {};
    let img = "default-img.png";
    if (req.file !== undefined) {
      img = req.file.filename;
    }
    // data mapping
    // userToCreate.userId             = users[users.length - 1].userId + 1;
    // userToCreate.firstName          = req.body.name;
    // userToCreate.lastName           = req.body.lastName;
    // userToCreate.email              = req.body.email;
    // userToCreate.telCelular         = null;
    // userToCreate.telAlternativo     = null;
    // userToCreate.password           = encryptedPass;
    // userToCreate.rol                = 'user';
    // userToCreate.estado             = 'activo';
    // userToCreate.avatar             = img;
    // userToCreate.fechaCreacion      = Date();
    // userToCreate.fechaModificacion  = null;
    // userToCreate.fechaUltimoLogin   = null;
    //
    // users.push(userToCreate);
    // console.log(userToCreate);
    // let usersJSON = JSON.stringify(users, null, 2);
    // fs.writeFileSync(path.join(__dirname, "../data/usuarios.json"), usersJSON);
    // res.redirect("/users/login");
    //
    db.User.create({
      first_name: req.body.name,
      last_name: req.body.lastName,
      email: req.body.email,
      password: encryptedPass,
      phone_number: null,
      address: null,
      creation_date: null,
      last_login: null,
      id_user_category: 1,
      id_user_status: 1,
      avatar: img,
    })
      .then(() => {
        return res.redirect("/users/login");
      })
      .catch((error) => res.send(error));
  },
  login: function (req, res) {
    res.render("login");
  },
  loginProcess: function (req, res) {
    // let userToLogin = User.findByField("email", req.body.email);
    let userToLogin = User.findByFieldMin("email", req.body.email); //datos minimos necesarios
    console.log("userToLogin.rol->" + userToLogin.rol);

    if (userToLogin) {
      let isOkThePassword = bcryptjs.compareSync(
        req.body.password,
        userToLogin.password
      );

      if (isOkThePassword) {
        delete userToLogin.password;
        req.session.userLogged = userToLogin; //si todo esta bien, antes de redirigir a profile, quiero guardar el usuario en session

        if (req.body.recordarme != undefined) {
          // si el usuario tildó el checkbox 'recordarme' guarda en la cookie el valor del usuario
          res.cookie("recordarme", userToLogin, { maxAge: 60000 });
        }
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
