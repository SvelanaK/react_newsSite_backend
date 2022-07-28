const { Model } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      Users.hasMany(models.News, {
        foreignKey: 'userId',
        as: 'news',
      });
    }
  }
  Users.init({
    login: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    picture: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Users',
    hooks: {
      beforeCreate: (user) => {
        if (user.password) {
          const linkUser = user;
          linkUser.password = bcrypt.hashSync(
            user.password,
            bcrypt.genSaltSync(10),
            null,
          );
        }
      },
    },
  });
  Users.prototype.comparePassword = function compare(password) {
    return new Promise((res, rej) => {
      bcrypt.compare(password, this.password, (err, isMatch) => {
        if (err) {
          return rej(err);
        }
        return res(isMatch);
      });
    });
  };
  return Users;
};
