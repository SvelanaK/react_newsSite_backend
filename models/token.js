const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Tokens extends Model {
  }
  Tokens.init({
    refreshToken: DataTypes.STRING,
    userId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Tokens',
  });
  return Tokens;
};
