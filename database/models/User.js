module.exports = function (sequelize, dataTypes) {
  let alias = "User";

  let cols = {
    id_users: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: dataTypes.STRING,
    },
    last_name: {
      type: dataTypes.STRING,
    },
    email: {
      type: dataTypes.STRING,
    },
    password: {
      type: dataTypes.STRING,
    },
    phone_number: {
      type: dataTypes.STRING,
    },
    address: {
      type: dataTypes.STRING,
    },
    creation_date: {
      type: dataTypes.DATETIME,
    },
    last_login: {
      type: dataTypes.DATETIME,
    },
  };

  let config = {
    tableName: "users",
    timestamps: false,
  };

  let User = sequelize.define(alias, cols, config);

  User.associate = function (models) {
    User.belongsTo(models.User_category, {
      as: "category",
      foreignKey: "id_user_category",
    });

    User.belongsTo(models.User_status, {
      as: "status",
      foreignKey: "id_user_status",
    });
  };

  return User;
};
